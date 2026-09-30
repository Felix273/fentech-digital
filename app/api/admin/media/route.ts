import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { getClientAddress, rateLimit, rateLimitHeaders, sameOrigin } from "@/lib/security/rate-limit";
import { buildMediaObjectKey, UploadValidationError, validateMediaFile } from "@/lib/security/upload";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
    await requireAdminSession();
    const limit = rateLimit(`media-upload:${getClientAddress(request)}`, { limit: 30, windowMs: 60 * 60 * 1000 });
    if (!limit.allowed) {
      return NextResponse.json({ error: "Upload limit reached. Try again later." }, { status: 429, headers: rateLimitHeaders(limit) });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }

    const metadata = await validateMediaFile(file);
    const folder = String(formData.get("folder") || "uploads");
    const path = buildMediaObjectKey(metadata.extension, folder);

    const supabase = createSupabaseAdminClient();
    const bucket = process.env.SUPABASE_MEDIA_BUCKET || "site-media";
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: metadata.mime,
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({ success: true, path, publicUrl: data.publicUrl }, { headers: rateLimitHeaders(limit) });
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unable to upload media.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
