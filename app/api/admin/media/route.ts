import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

function cleanPath(path: string) {
  return path.replace(/^\/+/, "").replace(/\.\./g, "").replace(/\/{2,}/g, "/");
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");
    const rawPath = String(formData.get("path") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File is too large. Maximum size is 8MB." }, { status: 400 });
    }

    const path = cleanPath(rawPath || `uploads/${Date.now()}-${file.name}`);
    if (!path) {
      return NextResponse.json({ error: "Provide a valid upload path." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const bucket = process.env.SUPABASE_MEDIA_BUCKET || "site-media";
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({ success: true, path, publicUrl: data.publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to upload media.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
