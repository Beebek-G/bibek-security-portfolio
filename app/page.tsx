"use client";

import Nav from "@/components/Nav";
import NetworkScene from "@/components/NetworkScene";
import AskNetwork from "@/components/AskNetwork";
import { cases, credentials, profile, securityEvents, timeline } from "@/data/portfolio";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <AskNetwork />

      <section className="hero-v6">
        <div className="hero-v6-scene"><NetworkScene /></div>
        <div className="hero-v6-overlay container">
          <div className="hero-v6-topline"><span>SECURITY PORTFOLIO / 2026</span><span>NEW YORK CITY / HANDS-ON LAB EVIDENCE</span></div>
          <div className="hero-v6-copy">
            <p className="micro-label">{profile.headline.toUpperCase()}</p>
            <h1>SECURITY
              <span>MADE TANGIBLE.</span>
            </h1>
            <p className="hero-v6-deck">I investigate digital evidence, engineer network defenses, and build useful security tools. These are the labs, decisions and test results behind the work.</p>
            <div className="hero-v6-actions">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-network-assistant"))}>ASK THE NETWORK <span>◎</span></button>
              <a href="/case-studies/digital-forensics">EXPLORE FORENSICS <span>↗</span></a>
              <a href="/Bibek_Ghimire_Project_Portfolio.pdf" target="_blank" rel="noreferrer">PORTFOLIO PDF <span>↗</span></a>
            </div>
          </div>
          <div className="hero-v6-proof">
            <span><b>10</b> FORENSIC INVESTIGATIONS</span>
            <span><b>05</b> TECHNICAL LAB TRACKS</span>
            <span><b>{profile.gpa}</b> A.A.S. GPA</span>
          </div>
          <a className="hero-v6-scroll" href="#field" aria-label="Scroll to explore the portfolio">
            <span>SCROLL TO EXPLORE</span><i aria-hidden="true">↓</i>
          </a>
        </div>
      </section>
      <section className="signal-strip container" aria-label="Current signal">
        <div><span>OPPORTUNITIES</span><strong><i className="dot-live" /> SOC / FORENSICS / NETWORK SECURITY</strong></div>
        <div><span>EDUCATION</span><strong>LAGUARDIA A.A.S. / JOHN JAY STUDENT</strong></div>
        <div><span>STRONGEST EVIDENCE</span><strong>DIGITAL FORENSICS</strong></div>
        <div><span>DOCUMENTATION</span><strong>METHODS + VALIDATION</strong></div>
      </section>

      <section className="manifesto container" id="field">
        <p className="section-number">01 / FIELD</p>
        <div className="manifesto-grid">
          <h2>NOT A LIST OF SKILLS.<br /><span>A FIELD OF EVIDENCE.</span></h2>
          <div>
            <p>Every case starts with a concrete lab objective and ends with observable results. I distinguish completed tests from proposed improvements and show the decisions behind each setup.</p>
            <div className="field-metrics">
              <div><strong>10</strong><span>FORENSIC INVESTIGATIONS</span></div>
              <div><strong>05</strong><span>LAB TRACKS FEATURED</span></div>
              <div><strong>{profile.gpa}</strong><span>A.A.S. GPA</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-field container" id="work">
        <div className="section-head">
          <p className="section-number">02 / EVIDENCE</p>
          <p className="section-side">CASE FILES / ORIGINAL ARTIFACTS / TECHNICAL NARRATIVE</p>
        </div>
        <div className="case-grid-v4">
          {cases.map((item, i) => (
            <a className={`case-tile ${i === 0 ? "featured" : ""}`} href={item.href} key={item.n} id={item.id}>
              <div className="case-top"><span>{item.n}</span><span>{item.signal}</span></div>
              <div className="case-orbit" aria-hidden="true"><i /><i /></div>
              <div className="case-copy">
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <span className="case-body">{item.body}</span>
              </div>
              <div className="case-footer"><span>{item.meta}</span><span>{item.live ? "OPEN CASE ↗" : "EVIDENCE PATH →"}</span></div>
            </a>
          ))}
        </div>

        <div className="event-branch" id="ctf-hackathons">
          <div className="event-branch-head">
            <p className="section-number">EVENT BRANCH / CTF + HACKATHONS</p>
            <p>Competition work and webinar training are described separately; the titles should never imply achievements that the evidence does not show.</p>
          </div>
          <div className="event-branch-grid">
            {securityEvents.map((event, index) => (
              <article className="event-card" key={`${event.year}-${event.title}`}>
                <div className="event-card-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{event.year}</strong>
                </div>
                <p className="event-type">{event.type}</p>
                <h3>{event.title}</h3>
                <strong className="event-org">{event.org}</strong>
                <p className="event-body">{event.body}</p>
                <div className="event-tags">{event.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {event.href ? <a className="event-link" href={event.href} target="_blank" rel="noreferrer">{event.action}</a> : <span className="event-link muted">{event.action}</span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="assistant-feature container" id="ask">
        <div className="assistant-feature-grid">
          <div>
            <p className="section-number">03 / PORTFOLIO INTELLIGENCE</p>
            <h2>THE SITE CAN<br /><em>EXPLAIN ITSELF.</em></h2>
          </div>
          <div className="assistant-feature-copy">
            <p><strong>Ask the Network</strong> is a grounded portfolio concierge. It answers from Bibek&apos;s public evidence, distinguishes academic work from professional experience, and refuses to invent proof that does not exist.</p>
            <button onClick={() => { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("open-network-assistant")); }}>OPEN PORTFOLIO ASSISTANT →</button>
          </div>
        </div>
        <div className="assistant-feature-samples">
          <span>“What is Bibek&apos;s strongest project?”</span>
          <span>“Would he fit a SOC internship?”</span>
          <span>“Show incident-response evidence.”</span>
          <span>“How do I connect with him?”</span>
        </div>
      </section>

      <section className="trajectory container" id="trajectory">
        <div className="section-head">
          <p className="section-number">04 / TRAJECTORY</p>
          <p className="section-side">NEPAL → NEW YORK / BUILD → DEFEND → CONNECT</p>
        </div>
        <div className="trajectory-intro">
          <h2>A technical path that keeps changing shape.</h2>
          <p>Early hardware, networking, programming, and web work became the base layer for cybersecurity. The point of the timeline is not nostalgia—it shows how the next capability keeps building on the previous one.</p>
        </div>
        <div className="timeline-v4">
          {timeline.map(([year, mode, title, org, body], idx) => (
            <article key={`${year}-${title}`}>
              <div className="timeline-year">{year}</div>
              <div className="timeline-axis"><i /><span>{String(idx + 1).padStart(2, "0")}</span></div>
              <div className="timeline-event">
                <p>{mode}</p>
                <h3>{title}</h3>
                <strong>{org}</strong>
                <span>{body}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="archive container" id="archive">
        <div className="section-head">
          <p className="section-number">05 / EVIDENCE ARCHIVE</p>
          <p className="section-side">SELECTIVE / VERIFIED / RELEVANCE-FIRST</p>
        </div>
        <div className="archive-lead">
          <h2>Credentials support the story.<br />They do not replace the work.</h2>
          <p>Only credentials that strengthen the technical narrative are surfaced here. Older DIT scans are intentionally not published as raw images because they contain personal identifiers; the achievement remains documented without leaking unnecessary personal information.</p>
        </div>
        <div className="archive-list">
          {credentials.map(([year, title, org, domain, action, href]) => {
            const content = <><span className="archive-year">{year}</span><span className="archive-title">{title}<small>{org}</small></span><span className="archive-domain">{domain}</span><span className="archive-action">{action}{action === "VIEW" ? " ↗" : ""}</span></>;
            return href ? <a className="archive-row" href={href} target="_blank" rel="noreferrer" key={`${year}-${title}`}>{content}</a> : <div className="archive-row" key={`${year}-${title}`}>{content}</div>;
          })}
        </div>
      </section>

      <section className="network-strategy container" id="network">
        <div className="network-strategy-card">
          <p className="section-number">06 / NETWORK</p>
          <div className="network-strategy-grid">
            <div>
              <p className="micro-label">WORKING PRINCIPLE</p>
              <h2>DOCUMENT THE TEST.<br />EXPLAIN THE TRADEOFF.</h2>
            </div>
            <div className="network-copy">
              <p>From virtual network topology to packet traces and shell scripts, the question is the same: what changed, what evidence proves it, and what would I improve next? I am seeking opportunities to apply that approach within a professional security team.</p>
              <div className="network-modules">
                <span>ALUMNI GRAPH</span><span>COMPANY ECOSYSTEM</span><span>MARKET MATCH</span><span>INTERVIEW ARENA</span><span>GRAD SCHOOL MAP</span><span>RESEARCH SIGNAL</span>
              </div>
            </div>
          </div>
          <div className="network-band">
            <span>LEARN</span><i /> <span>BUILD</span><i /> <span>PROVE</span><i /> <span>SHARE</span><i /> <span>CONNECT</span><i /> <span>COMPOUND</span>
          </div>
        </div>
      </section>

      <section className="closing container" id="connect">
        <div className="closing-copy">
          <p className="micro-label">OPEN TO CYBERSECURITY OPPORTUNITIES / RESEARCH / CONVERSATIONS</p>
          <h2>If the work connects,<br /><em>the network grows.</em></h2>
          <button className="closing-ask" onClick={() => { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("open-network-assistant")); }}>START WITH THE PORTFOLIO ASSISTANT →</button>
        </div>
        <div className="closing-links">
          <a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email} ↗</strong></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>bibekghimire33 ↗</strong></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><strong>Beebek-G ↗</strong></a>
          <a href="/security"><span>Security</span><strong>How this site is protected ↗</strong></a>
        </div>
      </section>

      <footer className="footer container"><p>© 2026 BIBEK GHIMIRE</p><p>EVIDENCE-LED SECURITY PORTFOLIO / V7.0</p></footer>
    </main>
  );
}
