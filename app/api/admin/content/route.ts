import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { cmsDefaults, cmsSections } from "@/lib/admin/cms";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { PUBLIC_CMS_CACHE_TAG } from "@/lib/cms-content";
import { getClientAddress, rateLimit, rateLimitHeaders, sameOrigin } from "@/lib/security/rate-limit";

const sectionIds = cmsSections.map((section) => section.id);

function fallbackContent() {
  return Object.fromEntries(sectionIds.map((id) => [id, cmsDefaults[id] ?? {}]));
}

function shouldUseDefaultForEmptyCollection(id: string, value: unknown) {
  const fallback = cmsDefaults[id];
  return Array.isArray(value) && value.length === 0 && Array.isArray(fallback) && fallback.length > 0;
}

export async function GET() {
  try {
    await requireAdminSession();
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("site_content")
      .select("id, content, updated_at")
      .in("id", sectionIds);

    if (error) throw error;

    const content = fallbackContent();
    for (const row of data || []) {
      if (shouldUseDefaultForEmptyCollection(row.id, row.content)) continue;
      content[row.id] = row.content;
    }

    return NextResponse.json({ sections: cmsSections, defaults: cmsDefaults, content, rows: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load content.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    if (!sameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
    await requireAdminSession();
    const limit = rateLimit(`cms-write:${getClientAddress(request)}`, { limit: 120, windowMs: 60 * 60 * 1000 });
    if (!limit.allowed) {
      return NextResponse.json({ error: "Publishing limit reached. Try again later." }, { status: 429, headers: rateLimitHeaders(limit) });
    }
    const { id, content } = await request.json();

    if (!sectionIds.includes(id)) {
      return NextResponse.json({ error: "Unknown CMS section." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .upsert({ id, content }, { onConflict: "id" })
      .select("id, content, updated_at")
      .single();

    if (error) throw error;

    revalidateTag(PUBLIC_CMS_CACHE_TAG, "max");

    return NextResponse.json({ success: true, row: data }, { headers: rateLimitHeaders(limit) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
