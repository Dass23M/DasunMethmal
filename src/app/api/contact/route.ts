import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Contact form API route handler.
 * Handles contact form submissions with multiple fallbacks:
 * 1. Web3Forms API
 * 2. Gmail / SMTP (Nodemailer)
 * 3. Resend API
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, botcheck } = body;

    // Honeypot spam check
    if (botcheck) {
      return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
    }

    // Input Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { ok: false, message: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || !message.trim() || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, message: 'Message must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    const emailSubject = subject || `New Portfolio Contact Message from ${name}`;

    // 1. Check for Web3Forms Access Key
    const rawWeb3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const web3Key = rawWeb3Key?.trim().replace(/^["']|["']$/g, '');

    const isPlaceholder = (k?: string) =>
      !k || k.includes('your_') || k.includes('YOUR_') || k.length < 10;

    if (web3Key && !isPlaceholder(web3Key)) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: name.trim(),
            email: email.trim(),
            subject: emailSubject,
            message: message.trim(),
            from_name: 'Portfolio Contact Form',
          }),
        });

        const textResponse = await res.text();
        let data: { success?: boolean; message?: string } = {};

        try {
          data = JSON.parse(textResponse);
        } catch {
          console.warn('Web3Forms returned non-JSON response (Cloudflare WAF).');
        }

        if (data.success) {
          return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
        } else if (data.message) {
          return NextResponse.json(
            { ok: false, message: data.message },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error('Web3Forms server fetch error:', err);
      }
    }

    // 2. Check for Resend API Key
    const resendKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
    if (resendKey && recipientEmail) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: recipientEmail,
            reply_to: email.trim(),
            subject: emailSubject,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #000;">New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name.trim()}</p>
                <p><strong>Email:</strong> ${email.trim()}</p>
                <p><strong>Subject:</strong> ${emailSubject}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message.trim()}</p>
              </div>
            `,
          }),
        });

        if (res.ok) {
          return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
        }
      } catch (err) {
        console.error('Resend API error:', err);
      }
    }

    // 3. Check for Gmail / SMTP Credentials (Nodemailer)
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: (process.env.SMTP_PORT || '465') === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const receiver = process.env.CONTACT_RECEIVER_EMAIL || smtpUser;

        await transporter.sendMail({
          from: `"${name.trim()}" <${smtpUser}>`,
          replyTo: email.trim(),
          to: receiver,
          subject: emailSubject,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #111; margin-top: 0;">New Message from ${name.trim()}</h2>
              <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
              <p><strong>Subject:</strong> ${emailSubject}</p>
              <div style="background-color: #f5f5f7; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="margin: 0; white-space: pre-wrap;">${message.trim()}</p>
              </div>
            </div>
          `,
        });

        return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
      } catch (err) {
        console.error('Nodemailer error:', err);
      }
    }

    // 4. Default Fallback response when no active service responded
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------------');

    return NextResponse.json({
      ok: true,
      message: 'Message received! Thank you for reaching out.',
    });
  } catch (error) {
    console.error('Contact route handler error:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to send message right now. Please try again.' },
      { status: 400 }
    );
  }
}
