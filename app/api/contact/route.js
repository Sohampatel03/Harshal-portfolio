import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimits = new Map();

function limited(ip) {
  const now = Date.now();
  const item = rateLimits.get(ip);
  if (!item || now - item.start > 10 * 60 * 1000) {
    rateLimits.set(ip, { start: now, count: 1 });
    return false;
  }
  item.count += 1;
  return item.count > 5;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export async function POST(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });

  try {
    const payload = await request.json();
    if (payload.website) return NextResponse.json({ success: true });
    const { name, email, subject, message } = payload;
    if (![name, email, subject, message].every((value) => typeof value === "string")) {
      return NextResponse.json({ success: false, message: "Please complete all fields." }, { status: 400 });
    }
    const values = { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() };
    if (!values.name || !values.email || !values.subject || !values.message || values.name.length > 100 || values.email.length > 254 || values.subject.length > 150 || values.message.length > 3000 || !emailPattern.test(values.email)) {
      return NextResponse.json({ success: false, message: "Check the required fields and make sure your email address is valid." }, { status: 400 });
    }

    const { EMAIL_ADDRESS, GMAIL_PASSKEY, CLIENT_EMAIL } = process.env;
    if (!EMAIL_ADDRESS || !GMAIL_PASSKEY || !CLIENT_EMAIL) {
      return NextResponse.json({ success: false, message: "Contact email is not configured yet. Please use the email link instead." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL_ADDRESS, pass: GMAIL_PASSKEY } });
    const safe = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, escapeHtml(value)]));
    await transporter.sendMail({
      from: `Harshal Gunjal Portfolio <${EMAIL_ADDRESS}>`,
      to: CLIENT_EMAIL,
      replyTo: values.email,
      subject: `Portfolio contact: ${values.subject}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#182638;line-height:1.6"><h2>New portfolio message</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Subject:</strong> ${safe.subject}</p><p><strong>Message:</strong></p><p>${safe.message.replace(/\n/g, "<br>")}</p></div>`,
    });
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    return NextResponse.json({ success: false, message: "Unable to send your message right now. Please try again later." }, { status: 500 });
  }
}
