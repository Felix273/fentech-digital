import { NextResponse } from "next/server";
import { cmsDefaults, cmsSections } from "@/lib/admin/cms";
import { createSupabaseAdminClient } from "@/lib/supabase";

const sectionIds = cmsSections.map((section) => section.id);

function shouldUseDefaultForEmptyCollection(id: string, value: unknown) {
  const fallback = cmsDefaults[id];
  return Array.isArray(value) && value.length === 0 && Array.isArray(fallback) && fallback.length > 0;
}

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("id, content")
      .in("id", sectionIds);

    if (error) throw error;

    const content = Object.fromEntries(sectionIds.map((id) => [id, cmsDefaults[id] ?? {}]));
    for (const row of data || []) {
      if (shouldUseDefaultForEmptyCollection(row.id, row.content)) continue;
      content[row.id] = row.content;
    }

    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({
      content: Object.fromEntries(sectionIds.map((id) => [id, cmsDefaults[id] ?? {}])),
      fallback: true,
    });
  }
}
