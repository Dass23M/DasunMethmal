import { NextResponse } from 'next/server';

/**
 * Contact form API route handler.
 * Validates inputs and returns a simulated success response.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    console.log('Contact form received:', { name, email, message });

    return NextResponse.json({ ok: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
