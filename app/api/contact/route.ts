import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Check if we're in build time
const isBuildTime = !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Only initialize if not in build time
const resend = isBuildTime ? null : new Resend(process.env.RESEND_API_KEY);

// Lazy import supabase only when needed
async function getSupabase() {
  const { supabase } = await import('@/lib/supabase');
  return supabase;
}

export async function POST(request: Request) {
  if (isBuildTime) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { firstName, lastName, email, serviceRequired, message, company, phone, priority } = body;

    // Save to Supabase
    const supabase = await getSupabase();
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          service_required: serviceRequired,
          message,
          company: company || null,
          phone: phone || null,
          priority: priority || 'medium',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Fentech Contact Form <onboarding@resend.dev>',
          to: 'fentechgroup@gmail.com',
          subject: `New Contact Form Submission - ${serviceRequired}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Service:</strong> ${serviceRequired}</p>
            ${priority ? `<p><strong>Priority:</strong> ${priority}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Submission ID: ${submission.id}</small></p>
          `,
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      submissionId: submission.id 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
