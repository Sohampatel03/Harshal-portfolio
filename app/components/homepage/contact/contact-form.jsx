"use client";

import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const initial = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [fields, setFields] = useState(initial);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const update = (event) => setFields((current) => ({ ...current, [event.target.name]: event.target.value }));
  async function submit(event) {
    event.preventDefault();
    setState("sending"); setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, website }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Could not send your message.");
      setState("success"); setFeedback("Thanks for reaching out. Your message has been sent."); setFields(initial);
    } catch (error) {
      setState("error"); setFeedback(error.message || "Something went wrong. Please try again.");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name<input name="name" value={fields.name} onChange={update} maxLength={100} autoComplete="name" required /></label><label>Email<input type="email" name="email" value={fields.email} onChange={update} maxLength={254} autoComplete="email" required /></label></div>
    <label>Subject<input name="subject" value={fields.subject} onChange={update} maxLength={150} required /></label>
    <label>Message<textarea name="message" value={fields.message} onChange={update} maxLength={3000} rows={5} required /></label>
    <input className="honeypot" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="form-submit-row"><button className="button button-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"} <FiArrowUpRight /></button><span className={`form-feedback ${state}` } aria-live="polite">{feedback}</span></div>
  </form>;
}
