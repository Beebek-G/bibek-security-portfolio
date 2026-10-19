import Nav from "@/components/Nav";

const controls = [
  ["SERVER-SIDE SECRETS", "Email-service credentials stay in deployment environment variables. They are never exposed to browser JavaScript."],
  ["PUBLIC-DATA ASSISTANT", "The portfolio assistant is deliberately limited to curated public portfolio evidence. Private networking notes, applications, personal records, and CRM data are outside its knowledge base."],
  ["GROUNDING BEFORE GENERATION", "Version 7 uses a local evidence index first. If an external language model is added later, retrieved portfolio evidence remains the source context and unsupported claims should be rejected."],
  ["CONTACT VALIDATION", "The connection endpoint validates required fields, limits input lengths, escapes HTML before sending notifications, and includes a honeypot field for low-friction bot filtering."],
  ["NO CLIENT API KEYS", "The browser calls internal Next.js API routes. External service credentials belong only on the server."],
  ["PRIVACY BY DESIGN", "Old credential scans containing unnecessary identifiers are not published. The public site displays the achievement while avoiding exposure of student IDs or old residential information."],
];

export default function SecurityPage() {
  return (
    <main>
      <Nav />
      <section className="security-hero container">
        <p className="section-number">SECURITY / V7</p>
        <h1>SECURING THE<br /><em>PORTFOLIO ITSELF.</em></h1>
        <p>This page documents the current security architecture and the controls being built into the portfolio assistant. It is intentionally specific about what is implemented now versus what belongs to the deployment-hardening roadmap.</p>
      </section>

      <section className="security-architecture container">
        <div className="architecture-line">
          <div><span>01</span><strong>VISITOR</strong><small>Browser / mobile</small></div><i>→</i>
          <div><span>02</span><strong>NEXT.JS UI</strong><small>3D portfolio + assistant</small></div><i>→</i>
          <div><span>03</span><strong>SERVER API</strong><small>Grounding + validation</small></div><i>→</i>
          <div><span>04</span><strong>NOTIFICATION</strong><small>Optional Resend email</small></div>
        </div>
      </section>

      <section className="security-controls container">
        <div className="section-head"><p className="section-number">IMPLEMENTED / DESIGNED</p><p className="section-side">EVIDENCE-FIRST / MINIMUM DATA / SERVER-SIDE SECRETS</p></div>
        <div className="security-grid">
          {controls.map(([title, body], idx) => <article key={title}><span>{String(idx + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{body}</p></article>)}
        </div>
      </section>

      <section className="security-roadmap container">
        <p className="section-number">DEPLOYMENT HARDENING</p>
        <div>
          <h2>Before public launch,<br />the network gets another layer.</h2>
          <ul>
            <li>Content Security Policy and strict security headers</li>
            <li>Rate limiting on assistant and contact endpoints</li>
            <li>Cloudflare Turnstile or equivalent if spam becomes a problem</li>
            <li>Dependency and secret scanning in CI</li>
            <li>Minimal structured logging without storing private chat transcripts by default</li>
            <li>Accessibility, reduced-motion behavior, and performance budgets</li>
          </ul>
        </div>
      </section>

      <footer className="footer container"><p>© 2026 BIBEK GHIMIRE</p><a href="/">RETURN TO THE NETWORK ↗</a></footer>
    </main>
  );
}
