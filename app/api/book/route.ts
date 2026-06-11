import { Resend } from "resend";

type BookingPayload = {
  name?: string;
  contact?: string;
  service?: string;
  stylist?: string;
  date?: string;
  time?: string;
  notes?: string;
  company?: string; // honeypot
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 16px 6px 0;color:#6b6557;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#1e1c18;font-size:14px;">${esc(value)}</td></tr>`;
}

type Email = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

async function sendViaBrevo(apiKey: string, email: Email): Promise<void> {
  const fromEmail = process.env.BOOKING_FROM_EMAIL ?? email.to;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "InStyle Bookings", email: fromEmail },
      to: [{ email: email.to }],
      subject: email.subject,
      htmlContent: email.html,
      textContent: email.text,
      ...(email.replyTo ? { replyTo: { email: email.replyTo } } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

async function sendViaResend(apiKey: string, email: Email): Promise<void> {
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.BOOKING_FROM ?? "InStyle Bookings <onboarding@resend.dev>",
    to: email.to,
    subject: email.subject,
    html: email.html,
    text: email.text,
    ...(email.replyTo ? { replyTo: email.replyTo } : {}),
  });
  if (error) throw new Error(`Resend: ${JSON.stringify(error)}`);
}

export async function POST(request: Request) {
  let data: BookingPayload;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in => silently accept and drop (bot)
  if (data.company) {
    return Response.json({ ok: true });
  }

  const name = data.name?.trim() ?? "";
  const contact = data.contact?.trim() ?? "";
  const service = data.service?.trim() ?? "";
  const date = data.date?.trim() ?? "";
  const time = data.time?.trim() ?? "";
  const stylist = data.stylist?.trim() ?? "No preference";
  const notes = data.notes?.trim() ?? "";

  if (!name || !contact || !service || !date || !time) {
    return Response.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 }
    );
  }
  if ([name, contact, service, date, time, stylist].some((v) => v.length > 200) || notes.length > 2000) {
    return Response.json({ ok: false, error: "Input too long." }, { status: 400 });
  }

  const to = process.env.BOOKING_EMAIL;
  const brevoKey = process.env.BREVO_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!to || (!brevoKey && !resendKey)) {
    console.error("Booking email not configured: need BOOKING_EMAIL plus BREVO_API_KEY or RESEND_API_KEY");
    return Response.json(
      { ok: false, error: "Booking is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e8e4dc;">
    <div style="background:#1e1c18;padding:20px 28px;">
      <p style="margin:0;color:#b49a68;font-size:12px;letter-spacing:3px;">IN STYLE HAIR SALON</p>
      <p style="margin:6px 0 0;color:#faf8f4;font-size:20px;">New booking request</p>
    </div>
    <div style="padding:24px 28px;background:#faf8f4;">
      <table style="border-collapse:collapse;">
        ${row("Name", name)}
        ${row("Contact", contact)}
        ${row("Service", service)}
        ${row("Stylist", stylist)}
        ${row("Date", date)}
        ${row("Time", time)}
        ${notes ? row("Notes", notes) : ""}
      </table>
      <p style="margin:20px 0 0;color:#6b6557;font-size:12px;">Reply to the client to confirm the appointment.</p>
    </div>
  </div>`;

  const email: Email = {
    to,
    subject: `New booking — ${name} · ${service} · ${date} ${time}`,
    html,
    text: `New booking request\n\nName: ${name}\nContact: ${contact}\nService: ${service}\nStylist: ${stylist}\nDate: ${date}\nTime: ${time}\nNotes: ${notes || "—"}`,
    ...(isEmail ? { replyTo: contact } : {}),
  };

  try {
    if (brevoKey) {
      await sendViaBrevo(brevoKey, email);
    } else {
      await sendViaResend(resendKey!, email);
    }
  } catch (err) {
    console.error("Booking send failed:", err);
    return Response.json(
      { ok: false, error: "We couldn't send your request. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
