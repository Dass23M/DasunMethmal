import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Hardened Server-Side Contact API Route
 * - Primary: Resend REST API (server-side only, 3,000 free emails/month)
 * - Optional Fallback: Gmail / SMTP via Nodemailer
 * - Security: Same-origin verification, bounded IP sliding-window rate limiting,
 *   16 KB payload cap, strict field validation, CRLF header stripping, and HTML escaping.
 */

const MAX_BODY_BYTES = 16_384; // 16 KB max request payload
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 1000;

const DEFAULT_RECEIVER_EMAIL = 'dasunmethmal23@gmail.com';
const DEFAULT_RESEND_FROM = 'Dasun Methmal Portfolio <onboarding@resend.dev>';

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
  if (!origin) return true;

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

function cleanEnv(value?: string): string {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

function isPlaceholder(value: string): boolean {
  return !value || /your_|YOUR_|example|placeholder|xxxx/i.test(value) || value.length < 10;
}

function buildEmailHtml(
  safeName: string,
  safeEmail: string,
  safeSubject: string,
  safeMessage: string
): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #ffffff; border: 1px solid #222222; padding: 28px;">
      <div style="border-bottom: 1px dashed #2a2a2a; padding-bottom: 16px; margin-bottom: 20px;">
        <span style="display: inline-block; background: #9CFF00; color: #000000; font-family: monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; padding: 4px 10px; text-transform: uppercase;">
          NEW PORTFOLIO INQUIRY
        </span>
        <h2 style="margin: 14px 0 0; font-size: 22px; font-weight: 600; color: #ffffff;">
          ${safeSubject}
        </h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #9ca3af; width: 90px; font-family: monospace; font-size: 12px;">FROM</td>
          <td style="padding: 6px 0; color: #ffffff; font-weight: 500;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #9ca3af; font-family: monospace; font-size: 12px;">EMAIL</td>
          <td style="padding: 6px 0;">
            <a href="mailto:${safeEmail}" style="color: #9CFF00; text-decoration: none;">${safeEmail}</a>
          </td>
        </tr>
      </table>

      <div style="background: #111111; border: 1px solid #262626; padding: 18px;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.14em; color: #9ca3af; margin-bottom: 10px; text-transform: uppercase;">
          MESSAGE
        </div>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.65; color: #e4e4e7; font-size: 14px;">${safeMessage}</p>
      </div>

      <p style="margin: 20px 0 0; font-family: monospace; font-size: 11px; color: #71717a;">
        Sent via dasunmethmal.com contact form · Reply directly to respond to ${safeName}.
      </p>
    </div>
  `;
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

    // 3. Honeypot spam check (silent 200 without revealing bot trap)
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

    const emailSubject = rawSubject || `New Portfolio Message from ${rawName}`;
    const htmlBody = buildEmailHtml(
      escapeHtml(rawName),
      escapeHtml(rawEmail),
      escapeHtml(emailSubject),
      escapeHtml(rawMessage)
    );
    const textBody = `Name: ${rawName}\nEmail: ${rawEmail}\nSubject: ${emailSubject}\n\nMessage:\n${rawMessage}`;

    const recipientEmail =
      cleanEnv(process.env.CONTACT_RECEIVER_EMAIL) ||
      cleanEnv(process.env.SMTP_USER) ||
      DEFAULT_RECEIVER_EMAIL;

    // 6. Primary Provider: Resend REST API (100% Server-Side)
    const resendKey = cleanEnv(process.env.RESEND_API_KEY);
    if (!isPlaceholder(resendKey)) {
      try {
        const fromAddress = cleanEnv(process.env.RESEND_FROM_EMAIL) || DEFAULT_RESEND_FROM;
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [recipientEmail],
            reply_to: rawEmail,
            subject: emailSubject,
            text: textBody,
            html: htmlBody,
          }),
          signal: AbortSignal.timeout(10_000),
        });

        if (res.ok) {
          return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
        }

        const errData = (await res.json().catch(() => ({}))) as { message?: string };
        console.error(`Resend API error (${res.status}): ${errData.message || 'Delivery rejected'}`);
      } catch (err) {
        console.error(
          'Resend network error:',
          err instanceof Error ? err.message : 'Unknown error'
        );
      }
    }

    // 7. Optional Fallback: Gmail / SMTP (Nodemailer with file & URL access disabled)
    const smtpUser = cleanEnv(process.env.SMTP_USER || process.env.GMAIL_USER);
    const smtpPass = cleanEnv(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD);
    if (smtpUser && smtpPass && !isPlaceholder(smtpPass)) {
      try {
        const smtpPort = Number(process.env.SMTP_PORT) || 465;
        const transporter = nodemailer.createTransport({
          host: cleanEnv(process.env.SMTP_HOST) || 'smtp.gmail.com',
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${smtpUser}>`,
          replyTo: rawEmail,
          to: recipientEmail,
          subject: emailSubject,
          disableFileAccess: true,
          disableUrlAccess: true,
          text: textBody,
          html: htmlBody,
        });

        return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
      } catch (err) {
        console.error('SMTP delivery failed:', err instanceof Error ? err.message : 'Unknown error');
      }
    }

    // 8. Honest error response if no email provider delivered
    return NextResponse.json(
      {
        ok: false,
        message:
          'Message delivery is temporarily unavailable. Please email dasunmethmal23@gmail.com directly.',
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
