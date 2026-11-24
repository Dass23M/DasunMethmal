import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Hardened Contact Form API Route
 * - Origin verification & sliding-window IP rate limiting
 * - Strict payload size & field length validation
 * - HTML entity escaping & CRLF header-injection stripping
 * - Server-only delivery via Web3Forms, Resend, or Nodemailer SMTP
 */

const MAX_BODY_BYTES = 16_384; // 16 KB max request payload
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 1000;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

// Bounded in-memory sliding-window rate limiter per IP
const ipRequestLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Prune old entries if map grows large
  if (ipRequestLog.size >= MAX_TRACKED_IPS && !ipRequestLog.has(ip)) {
    ipRequestLog.forEach((timestamps, key) => {
      const fresh = timestamps.filter((ts) => ts > windowStart);
      if (fresh.length === 0) ipRequestLog.delete(key);
      else ipRequestLog.set(key, fresh);
    });
  }

  const timestamps = (ipRequestLog.get(ip) || []).filter((ts) => ts > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    ipRequestLog.set(ip, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Non-browser / same-origin requests without Origin header

  const host = request.headers.get('host');
  try {
    const originUrl = new URL(origin);
    if (host && originUrl.host === host) return true;

    const configuredSite = process.env.NEXT_PUBLIC_SITE_URL;
    if (configuredSite) {
      const configuredHost = new URL(configuredSite).host;
      if (originUrl.host === configuredHost) return true;
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1')
    ) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

function stripHeaderControls(value: string): string {
  return value.replace(/[\r\n\0]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    // 1. Same-origin check
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { ok: false, message: 'Forbidden request origin.' },
        { status: 403 }
      );
    }

    // 2. Payload size guard
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: 'Request payload is too large.' },
        { status: 413 }
      );
    }

    const rawText = await request.text();
    if (Buffer.byteLength(rawText, 'utf8') > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: 'Request payload is too large.' },
        { status: 413 }
      );
    }

    let body: Record<string, unknown>;
    try {
      const parsed = JSON.parse(rawText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return NextResponse.json(
          { ok: false, message: 'Invalid JSON payload.' },
          { status: 400 }
        );
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { ok: false, message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    // 3. Honeypot spam check (return silent 200 without revealing detection)
    if (typeof body.botcheck === 'string' && body.botcheck.trim().length > 0) {
      return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
    }

    // 4. Sliding-window IP rate limit
    const clientIp = getClientIp(request);
    const rate = checkRateLimit(clientIp);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Too many messages sent recently. Please try again in a few minutes.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.retryAfterSec) },
        }
      );
    }

    // 5. Strict type, length, and header-injection validation
    const rawName = typeof body.name === 'string' ? stripHeaderControls(body.name) : '';
    const rawEmail = typeof body.email === 'string' ? stripHeaderControls(body.email) : '';
    const rawSubject = typeof body.subject === 'string' ? stripHeaderControls(body.subject) : '';
    const rawMessage = typeof body.message === 'string' ? body.message.replace(/\0/g, '').trim() : '';

    if (!rawName || rawName.length < 2 || rawName.length > 100) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid name (2–100 characters).' },
        { status: 400 }
      );
    }

    if (!rawEmail || rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (rawSubject.length > 150) {
      return NextResponse.json(
        { ok: false, message: 'Subject must be 150 characters or fewer.' },
        { status: 400 }
      );
    }

    if (!rawMessage || rawMessage.length < 5 || rawMessage.length > 5000) {
      return NextResponse.json(
        { ok: false, message: 'Message must be between 5 and 5,000 characters.' },
        { status: 400 }
      );
    }

    const emailSubject = rawSubject || `New Portfolio Contact Message from ${rawName}`;
    const safeNameHtml = escapeHtml(rawName);
    const safeEmailHtml = escapeHtml(rawEmail);
    const safeSubjectHtml = escapeHtml(emailSubject);
    const safeMessageHtml = escapeHtml(rawMessage);

    // 6. Delivery Provider 1: Web3Forms (server-side only)
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
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: rawName,
            email: rawEmail,
            subject: emailSubject,
            message: rawMessage,
            from_name: 'Portfolio Contact Form',
          }),
          signal: AbortSignal.timeout(10_000),
        });

        const textResponse = await res.text();
        let data: { success?: boolean; message?: string } = {};
        try {
          data = JSON.parse(textResponse);
        } catch {
          console.warn('Web3Forms returned a non-JSON response.');
        }

        if (data.success) {
          return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
        }
      } catch (err) {
        console.error('Web3Forms delivery failed:', err instanceof Error ? err.message : 'Unknown error');
      }
    }

    // 7. Delivery Provider 2: Resend API
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
            reply_to: rawEmail,
            subject: emailSubject,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #000;">New Contact Form Message</h2>
                <p><strong>Name:</strong> ${safeNameHtml}</p>
                <p><strong>Email:</strong> ${safeEmailHtml}</p>
                <p><strong>Subject:</strong> ${safeSubjectHtml}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${safeMessageHtml}</p>
              </div>
            `,
          }),
          signal: AbortSignal.timeout(10_000),
        });

        if (res.ok) {
          return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
        }
      } catch (err) {
        console.error('Resend delivery failed:', err instanceof Error ? err.message : 'Unknown error');
      }
    }

    // 8. Delivery Provider 3: Gmail / SMTP (Nodemailer with file/URL access disabled)
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
          from: `"Portfolio Contact" <${smtpUser}>`,
          replyTo: rawEmail,
          to: receiver,
          subject: emailSubject,
          disableFileAccess: true,
          disableUrlAccess: true,
          text: `Name: ${rawName}\nEmail: ${rawEmail}\nSubject: ${emailSubject}\n\nMessage:\n${rawMessage}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #111; margin-top: 0;">New Message from ${safeNameHtml}</h2>
              <p><strong>Email:</strong> <a href="mailto:${safeEmailHtml}">${safeEmailHtml}</a></p>
              <p><strong>Subject:</strong> ${safeSubjectHtml}</p>
              <div style="background-color: #f5f5f7; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="margin: 0; white-space: pre-wrap;">${safeMessageHtml}</p>
              </div>
            </div>
          `,
        });

        return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
      } catch (err) {
        console.error('SMTP delivery failed:', err instanceof Error ? err.message : 'Unknown error');
      }
    }

    // 9. Honest error response if no provider delivered (never silently drop leads or log PII)
    return NextResponse.json(
      {
        ok: false,
        message:
          'Message delivery is temporarily unavailable. Please email methmal.liyanage23@gmail.com directly.',
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Unable to send message right now. Please try again.' },
      { status: 500 }
    );
  }
}
