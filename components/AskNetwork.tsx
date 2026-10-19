"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Source = { title: string; href?: string; cta?: string };
type ChatMessage = {
  role: "assistant" | "user";
  text: string;
  sources?: Source[];
  confidence?: "high" | "medium" | "low";
};

const prompts = [
  "What is Bibek's strongest cybersecurity work?",
  "Would Bibek fit a SOC internship?",
  "What evidence does he have for incident response?",
  "What does he know about network security?",
  "How can I connect with Bibek?",
];

function summarizeConversation(messages: ChatMessage[]) {
  return messages
    .slice(-6)
    .map((m) => `${m.role === "user" ? "Visitor" : "Portfolio assistant"}: ${m.text}`)
    .join("\n")
    .slice(0, 1100);
}

export default function AskNetwork() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "I’m Bibek’s portfolio assistant—not Bibek. I answer from his public portfolio evidence and I’ll say when something is not yet supported. Ask about projects, education, role fit, CTF work, digital forensics, network security, or how to connect.",
      confidence: "high",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-network-assistant", handler);
    return () => window.removeEventListener("open-network-assistant", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, contactOpen]);

  const summary = useMemo(() => summarizeConversation(messages), [messages]);

  async function ask(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: value }]);
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.answer,
          sources: data.sources,
          confidence: data.confidence,
        },
      ]);
      if (data.contactIntent) setContactOpen(true);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "I couldn’t query the portfolio index just now. You can still contact Bibek directly at bibekghimire.contact@gmail.com.", confidence: "low" }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent("Sending…");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"), email: form.get("email"), organization: form.get("organization"),
      reason: form.get("reason"), message: form.get("message"), website: form.get("website"), summary,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.setupRequired && data.mailto) {
        setSent("Automatic notification is not connected yet. Opening your email app as the free fallback…");
        window.location.href = data.mailto;
        return;
      }
      if (!res.ok) throw new Error(data?.error || "Send failed");
      setSent("Sent. Bibek will receive the message at his professional inbox.");
      event.currentTarget.reset();
    } catch {
      setSent("Couldn’t send automatically. Email Bibek directly at bibekghimire.contact@gmail.com.");
    }
  }

  return (
    <>
      <button className="ask-network-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="ask-pulse" /> ASK THE NETWORK
      </button>

      {open && (
        <div className="assistant-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <section className="assistant-panel" role="dialog" aria-modal="true" aria-label="Ask the Network portfolio assistant">
            <header className="assistant-header">
              <div>
                <span className="assistant-kicker">PORTFOLIO INTELLIGENCE / PUBLIC DATA ONLY</span>
                <h2>ASK THE NETWORK</h2>
              </div>
              <button className="assistant-close" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
            </header>

            <div className="assistant-grid">
              <aside className="assistant-sidebar">
                <p>GROUND RULES</p>
                <ul>
                  <li>Evidence before claims.</li>
                  <li>Academic work is labeled academic.</li>
                  <li>No private CRM or personal notes.</li>
                  <li>Unproven areas are described as developing.</li>
                </ul>
                <div className="assistant-status"><i /> GROUNDED IN PORTFOLIO V7</div>
                <button className="assistant-connect-button" onClick={() => setContactOpen((v) => !v)}>CONNECT WITH BIBEK →</button>
              </aside>

              <div className="assistant-main">
                <div className="assistant-thread" ref={scrollRef}>
                  {messages.map((message, idx) => (
                    <article className={`chat-message ${message.role}`} key={idx}>
                      <div className="chat-meta">
                        <span>{message.role === "assistant" ? "NETWORK" : "VISITOR"}</span>
                        {message.role === "assistant" && message.confidence && <span>CONFIDENCE / {message.confidence.toUpperCase()}</span>}
                      </div>
                      <p>{message.text}</p>
                      {!!message.sources?.length && (
                        <div className="chat-sources">
                          {message.sources.map((source) => source.href ? (
                            <a key={`${source.title}-${source.href}`} href={source.href} onClick={() => setOpen(false)}>{source.cta || source.title} ↗</a>
                          ) : <span key={source.title}>{source.title}</span>)}
                        </div>
                      )}
                    </article>
                  ))}
                  {busy && <article className="chat-message assistant"><div className="chat-meta"><span>NETWORK</span><span>SEARCHING EVIDENCE</span></div><div className="typing"><i /><i /><i /></div></article>}

                  {messages.length <= 2 && (
                    <div className="assistant-prompts">
                      <span>TRY ASKING</span>
                      {prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}
                    </div>
                  )}

                  {contactOpen && (
                    <form className="contact-module" onSubmit={submitContact} id="network-contact">
                      <div className="contact-module-head"><span>HANDOFF / HUMAN CONNECTION</span><button type="button" onClick={() => setContactOpen(false)}>HIDE</button></div>
                      <div className="contact-fields two"><label>Name<input name="name" required maxLength={100} /></label><label>Email<input name="email" type="email" required maxLength={160} /></label></div>
                      <div className="contact-fields two"><label>Organization<input name="organization" maxLength={140} /></label><label>Reason<select name="reason" defaultValue="Networking"><option>Networking</option><option>Internship / Hiring</option><option>Research / Academia</option><option>Collaboration</option><option>Portfolio Feedback</option></select></label></div>
                      <label>Message<textarea name="message" required rows={5} maxLength={1800} placeholder="Tell Bibek why you’d like to connect." /></label>
                      <label className="honeypot">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                      <p className="contact-privacy">Your contact details are sent to Bibek only when you submit this form. The form includes a short summary of this portfolio conversation so he understands the context.</p>
                      <button className="contact-submit" type="submit">SEND TO BIBEK →</button>
                      {sent && <p className="contact-status">{sent}</p>}
                    </form>
                  )}
                </div>

                <form className="assistant-composer" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
                  <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={900} placeholder="Ask about Bibek’s evidence, role fit, projects, education…" aria-label="Ask the portfolio assistant" />
                  <button type="submit" disabled={busy || !input.trim()}>SEND ↗</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
