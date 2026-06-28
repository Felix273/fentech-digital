import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (clean(body.website, 200)) {
      return NextResponse.json({ success: true });
    }

    const firstName = clean(body.firstName, 80);
    const lastName = clean(body.lastName, 80);
    const email = clean(body.email, 160).toLowerCase();
    const company = clean(body.company, 160);
    const phone = clean(body.phone, 80);
    const serviceRequired = clean(body.serviceRequired || body.service, 160) || "General enquiry";
    const message = clean(body.message, 4000);

    if (firstName.length < 2 || lastName.length < 2) {
      return NextResponse.json({ error: "Please provide your first and last name." }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Please share a little more context about your enquiry." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        company: company || null,
        phone: phone || null,
        service_required: serviceRequired,
        message,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "fentechgroup@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "FenTech Website <onboarding@resend.dev>";

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: notificationEmail,
        replyTo: email,
        subject: `New FenTech enquiry — ${serviceRequired}`,
        html: `
          <h2>New FenTech website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          <p><strong>Service:</strong> ${escapeHtml(serviceRequired)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submission ID: ${submission.id}</small></p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. We received your enquiry and will respond shortly.",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Unable to send your enquiry. Please try again." }, { status: 500 });
  }
}
