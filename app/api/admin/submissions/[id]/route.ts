import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { sameOrigin } from "@/lib/security/rate-limit";

const allowedStatuses = new Set(["new", "contacted", "qualified", "won", "lost", "archived"]);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
    await requireAdminSession();
    const { id } = await params;
    const { status } = await request.json();

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid submission status." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, submission: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update submission.";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
