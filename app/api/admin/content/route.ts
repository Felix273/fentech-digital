import { NextResponse } from "next/server";
import { cmsDefaults, cmsSections } from "@/lib/admin/cms";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

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
    await requireAdminSession();
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

    return NextResponse.json({ success: true, row: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
