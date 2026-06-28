import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function GET() {
  try {
    await requireAdminSession();
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, first_name, last_name, email, company, phone, service_required, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load submissions.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
