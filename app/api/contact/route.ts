import { NextRequest, NextResponse } from "next/server";

const CONTACT_TO = process.env.CONTACT_TO || "bibekghimire.contact@gmail.com";

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;",
  }[char] || char));
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const name = clean(data.name, 100);
    const email = clean(data.email, 160);
    const organization = clean(data.organization, 140);
    const reason = clean(data.reason, 80);
    const message = clean(data.message, 1800);
    const summary = clean(data.summary, 1200);
    const honeypot = clean(data.website, 120);

    if (honeypot) return NextResponse.json({ ok: true });
    if (!name || !email || !message || !email.includes("@")) {
      return NextResponse.json({ error: "Name, valid email, and message are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      const subject = encodeURIComponent(`Portfolio connection: ${name}${organization ? ` — ${organization}` : ""}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "—"}\nReason: ${reason || "Networking"}\n\nMessage:\n${message}\n\nConversation summary:\n${summary || "—"}`);
      return NextResponse.json({
        ok: false,
        setupRequired: true,
        mailto: `mailto:${CONTACT_TO}?subject=${subject}&body=${body}`,
        message: "Automatic notification is not connected yet. Use the email fallback for now.",
      });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111">
        <p style="font-size:12px;letter-spacing:.12em;color:#777">NEW PORTFOLIO CONNECTION</p>
        <h1 style="font-size:24px;margin:0 0 24px">${escapeHtml(name)}${organization ? ` · ${escapeHtml(organization)}` : ""}</h1>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:8px 0;color:#777">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#777">Reason</td><td>${escapeHtml(reason || "Networking")}</td></tr>
          <tr><td style="padding:8px 0;color:#777">Organization</td><td>${escapeHtml(organization || "—")}</td></tr>
        </table>
        <h2 style="font-size:15px;margin-top:28px">Message</h2>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
        <h2 style="font-size:15px;margin-top:28px">Portfolio conversation summary</h2>
        <p style="white-space:pre-wrap;line-height:1.6;color:#444">${escapeHtml(summary || "No assistant context supplied.")}</p>
        <p style="font-size:12px;color:#888;margin-top:30px">Sent from Bibek Ghimire's portfolio connection form.</p>
      </div>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Bibek Portfolio <onboarding@resend.dev>",
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Portfolio connection: ${name}${organization ? ` — ${organization}` : ""}`,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error", response.status, detail);
      return NextResponse.json({ error: "Notification service is temporarily unavailable." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: "Message sent to Bibek." });
  } catch {
    return NextResponse.json({ error: "Unable to send the message." }, { status: 400 });
  }
}
