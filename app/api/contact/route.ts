import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { escapeHtml, validateContactPayload } from "@/lib/contact";
import { getClientAddress, rateLimit, rateLimitHeaders, sameOrigin } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 16 * 1024) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    const limit = rateLimit(`contact:${getClientAddress(request)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many enquiries from this address. Try again later." },
        { status: 429, headers: rateLimitHeaders(limit) },
      );
    }
    const body = await request.json();

    if (typeof body === "object" && body && typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true }, { headers: rateLimitHeaders(limit) });
    }
    const parsed = validateContactPayload(body);
    if (parsed.success === false) {
      return NextResponse.json({ error: Object.values(parsed.errors)[0] || "Invalid enquiry." }, { status: 400 });
    }
    const { data } = parsed;

    const supabase = createSupabaseAdminClient();
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        service_required: data.serviceRequired,
        priority: data.priority || "medium",
        message: data.message,
        status: "new",
        user_agent: request.headers.get("user-agent"),
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "fentechgroup@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "FenTech Website <onboarding@resend.dev>";

    if (resendKey) {
      const resend = new Resend(resendKey);
      try {
        await resend.emails.send({
        from: fromEmail,
        to: notificationEmail,
        replyTo: data.email,
        subject: `New FenTech enquiry — ${data.serviceRequired}`,
        html: `
          <h2>New FenTech website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
          ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
          <p><strong>Service:</strong> ${escapeHtml(data.serviceRequired)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submission ID: ${submission.id}</small></p>
        `,
        });
      } catch (notificationError) {
        console.error("Contact notification failed", { submissionId: submission.id, notificationError });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. We received your enquiry and will respond shortly.",
      submissionId: submission.id,
    }, { headers: rateLimitHeaders(limit) });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Unable to send your enquiry. Please try again." }, { status: 500 });
  }
}
