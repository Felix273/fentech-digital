import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, serviceRequired, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase database
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: company || null,
          phone: phone || null,
          service_required: serviceRequired || null,
          message: message,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    // 2. Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'Fentech Contact Form <onboarding@resend.dev>', // Resend verified sender
        to: 'fentechgroup@gmail.com', // Your email - change this to your actual email
        replyTo: email,
        subject: `New Contact Form Submission - ${serviceRequired || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${serviceRequired ? `<p><strong>Service Required:</strong> ${serviceRequired}</p>` : ''}
            </div>
            <div style="margin: 20px 0;">
              <strong>Message:</strong>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #64748b; font-size: 12px;">
              Submission ID: ${submission.id}<br>
              Submitted: ${new Date().toLocaleString()}
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails - submission is already saved
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!',
        submissionId: submission.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
