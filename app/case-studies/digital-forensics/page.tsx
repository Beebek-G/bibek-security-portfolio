import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Digital Forensics Investigation Series | Bibek Ghimire",
  description:
    "A case study of Bibek Ghimire's 10 digital forensics investigations completed in MAC 257 at LaGuardia Community College, CUNY.",
};

const labs = [
  ["01", "Daubert Standard & Forensic Evidence", "Autopsy", "Lab1_Daubert_Standard_Forensic_Evidence.pdf"],
  ["02", "Steganography in Forensic Evidence", "Steghide", "Lab2_Steganography_Forensic_Evidence.pdf"],
  ["03", "Deleted & Damaged File Recovery", "Autopsy", "Lab3_Recovering_Deleted_Damaged_Files.pdf"],
  ["04", "Incident Response Investigation", "Wireshark · Event Viewer", "Lab4_Incident_Response_Investigation.pdf"],
  ["05", "Windows System Forensics", "Autopsy · FTK", "Lab5_Windows_Forensics.pdf"],
  ["06", "Linux System Forensics", "Autopsy", "Lab6_Linux_Forensics.pdf"],
  ["07", "Email & Chat Log Forensics", "Paraben P2 Commander", "Lab7_Email_Chat_Log_Forensics.pdf"],
  ["08", "Mobile Device Forensics", "Paraben P2 Commander", "Lab8_Mobile_Device_Forensics.pdf"],
  ["09", "Network Infrastructure Forensics", "Wireshark · Nmap", "Lab9_Network_Infrastructure_Forensics.pdf"],
  ["10", "System Memory Forensics", "Autopsy", "Lab10_System_Memory_Forensics.pdf"],
];

const repoBase = "https://github.com/Beebek-G/Digital-Forensics-Labs/blob/main";

export default function DigitalForensicsCaseStudy() {
  return (
    <main className="case-study" id="top">
      <Nav />

      <section className="case-hero container">
        <a className="back-link" href="/#work">← Selected work</a>
        <div className="case-hero-grid">
          <div>
            <p className="eyebrow">CASE STUDY 001 / DIGITAL FORENSICS</p>
            <h1 className="case-title">Ten investigations. One evidence trail.</h1>
            <p className="case-lead">
              A documented series of digital forensics labs completed in MAC 257 at LaGuardia Community College, CUNY. The work spans evidence evaluation, incident response, host forensics, mobile forensics, network forensics, memory forensics, steganography, and file recovery.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="https://github.com/Beebek-G/Digital-Forensics-Labs" target="_blank" rel="noreferrer">View GitHub repository <span>↗</span></a>
              <a className="button secondary" href="#reports">Browse reports <span>↓</span></a>
            </div>
          </div>

          <aside className="case-facts" aria-label="Case study facts">
            <div><span>COURSE</span><strong>MAC 257 — Digital Forensics</strong></div>
            <div><span>INSTITUTION</span><strong>LaGuardia Community College, CUNY</strong></div>
            <div><span>TERM</span><strong>Spring 2026</strong></div>
            <div><span>ARTIFACTS</span><strong>10 investigation reports</strong></div>
            <div><span>STATUS</span><strong className="case-accent">Completed coursework</strong></div>
          </aside>
        </div>
      </section>

      <section className="case-section container">
        <div className="case-section-label">01 / WHY THIS MATTERS</div>
        <div className="case-two-col">
          <h2>Not a skill list. A set of artifacts that can be inspected.</h2>
          <div className="case-prose">
            <p>
              The portfolio value of this series is the documentation itself. Each lab report is preserved in the public repository so the work can be reviewed beyond a résumé bullet or tool name.
            </p>
            <p>
              Across the series, the documented topics include evidence admissibility, steganography, recovery of deleted or damaged files, incident response, Windows and Linux systems, email and chat records, mobile devices, network infrastructure, and system memory.
            </p>
          </div>
        </div>
      </section>

      <section className="case-section container">
        <div className="case-section-label">02 / INVESTIGATION SURFACE</div>
        <div className="coverage-grid">
          <article><span>HOST</span><strong>Windows + Linux</strong><p>System-focused forensic investigation across two operating-system environments.</p></article>
          <article><span>NETWORK</span><strong>Traffic + Infrastructure</strong><p>Packet and network evidence using Wireshark and Nmap.</p></article>
          <article><span>DATA</span><strong>Recovery + Steganography</strong><p>Deleted/damaged files and hidden-data analysis.</p></article>
          <article><span>ENDPOINT</span><strong>Mobile + Memory</strong><p>Mobile-device and system-memory forensic investigation.</p></article>
          <article><span>COMMUNICATION</span><strong>Email + Chat Logs</strong><p>Communication artifacts examined with forensic tooling.</p></article>
          <article><span>PROCESS</span><strong>Evidence + Reporting</strong><p>Daubert Standard, chain of custody, methodology, and formal reporting.</p></article>
        </div>
      </section>

      <section className="case-section container spotlight-section">
        <div className="case-section-label">03 / INVESTIGATION SPOTLIGHT</div>
        <div className="spotlight-grid">
          <div>
            <p className="spotlight-index">LAB 04</p>
            <h2>Incident response: from suspicious logon to indicators of compromise.</h2>
            <p className="case-lead compact">
              One investigation focused on a suspicious logon event. The work included examining network and host context, decoding FTP protocol sessions, and identifying indicators of compromise across Windows and Linux systems.
            </p>
            <a className="text-link" href={`${repoBase}/Lab4_Incident_Response_Investigation.pdf`} target="_blank" rel="noreferrer">Open original Lab 04 report ↗</a>
          </div>
          <div className="spotlight-steps">
            <div><span>01</span><p><strong>Trigger</strong><br />Suspicious logon event requiring investigation.</p></div>
            <div><span>02</span><p><strong>Evidence</strong><br />Host and network artifacts examined in context.</p></div>
            <div><span>03</span><p><strong>Protocol analysis</strong><br />FTP session data decoded during the investigation.</p></div>
            <div><span>04</span><p><strong>Outcome</strong><br />Indicators of compromise identified and documented.</p></div>
          </div>
        </div>
      </section>

      <section className="case-section container" id="reports">
        <div className="case-section-label">04 / ORIGINAL EVIDENCE</div>
        <div className="case-header-row">
          <h2>All 10 reports, preserved.</h2>
          <p>Open any original PDF directly from the GitHub repository.</p>
        </div>
        <div className="report-list">
          {labs.map(([number, title, tools, file]) => (
            <a className="report-row" key={number} href={`${repoBase}/${file}`} target="_blank" rel="noreferrer">
              <span className="report-number">{number}</span>
              <span className="report-title">{title}</span>
              <span className="report-tools">{tools}</span>
              <span className="report-open">PDF ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="case-section container">
        <div className="case-section-label">05 / TOOLING + EVIDENCE</div>
        <div className="tool-evidence-grid">
          <div className="tool-panel">
            <p className="mini-label">FORENSIC ANALYSIS</p>
            <h3>Autopsy · FTK · Paraben P2 Commander</h3>
          </div>
          <div className="tool-panel">
            <p className="mini-label">NETWORK ANALYSIS</p>
            <h3>Wireshark · Nmap</h3>
          </div>
          <div className="tool-panel">
            <p className="mini-label">EVIDENCE / DATA</p>
            <h3>Steghide · Windows Event Viewer</h3>
          </div>
        </div>
        <div className="skills-proof">
          <div><span>01</span><p>Digital forensics methodology and evidence handling</p></div>
          <div><span>02</span><p>Daubert Standard application and chain-of-custody documentation</p></div>
          <div><span>03</span><p>Deleted, damaged, and encrypted file recovery</p></div>
          <div><span>04</span><p>Incident response investigation and IOC identification</p></div>
          <div><span>05</span><p>Windows, Linux, mobile, network, and memory forensics</p></div>
          <div><span>06</span><p>Formal evidentiary report writing</p></div>
        </div>
      </section>

      <section className="case-section container academic-note">
        <div>
          <p className="eyebrow">06 / ACADEMIC CONTEXT</p>
          <h2>Coursework, presented transparently.</h2>
        </div>
        <div className="case-prose">
          <p>
            These investigations were completed as part of the A.A.S. Cybersecurity program at LaGuardia Community College, CUNY. They are presented as academic work—not professional incident-response engagements—and retained here as evidence of hands-on practice and technical reporting.
          </p>
          <p>
            The next step is to build additional independent projects that extend this foundation into repeatable home-lab investigations, automation, detection, and deeper security-engineering work.
          </p>
        </div>
      </section>

      <section className="case-next container">
        <p className="eyebrow">NEXT / BUILDING THE EVIDENCE GRAPH</p>
        <h2>Next case study: network security.</h2>
        <p>The portfolio will connect this forensic evidence to network-security labs, home-lab work, CTF experience, and future security projects.</p>
        <div className="hero-actions">
          <a className="button primary" href="/#work">Back to selected work <span>↗</span></a>
          <a className="button secondary" href="https://github.com/Beebek-G" target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a>
        </div>
      </section>

      <footer className="footer container">
        <p><span>//</span> Bibek Ghimire · evidence over claims.</p>
        <p>Digital Forensics · Case Study 001</p>
      </footer>
    </main>
  );
}
