import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import styles from "./ctf.module.css";

export const metadata: Metadata = {
  title: "Kean University CTF | Bibek Ghimire",
  description: "A cybersecurity competition case study: practical web security and digital forensics challenges, tools, lessons, and available evidence.",
};

const completed = [
  {
    category: "WEB SECURITY", title: "Cookie Monster", points: "50 PTS",
    detail: "Inspected an authentication cookie with Burp Suite. Changed the Base64-encoded isAuthed value from false to true to solve the controlled challenge.",
    takeaway: "Authentication must be verified on the server; a client-side cookie alone is not a trust boundary.",
  },
  {
    category: "WEB SECURITY", title: "Login Injections", points: "50 PTS",
    detail: "Tested a deliberately vulnerable login form with SQL injection payloads and bypassed its authentication check.",
    takeaway: "Parameterize database queries and enforce authorization server-side.",
  },
  {
    category: "DIGITAL FORENSICS", title: "Password Cracking", points: "50 PTS",
    detail: "Extracted a ZIP password hash with zip2john and recovered the challenge password with John the Ripper and the rockyou.txt wordlist. Inspected an archived PDF mislabeled as a .txt file and found a Unicode ligature clue.",
    takeaway: "Weak passwords are vulnerable to wordlists, and file names and visually similar characters can be misleading.",
  },
  {
    category: "DIGITAL FORENSICS", title: "Hidden Layers", points: "50 PTS",
    detail: "Used exiftool to examine JPEG metadata and found the challenge flag in the Lens Model EXIF field.",
    takeaway: "Metadata can reveal information that is not visible in the image itself.",
  },
] as const;

const evidence = [
  { src: "/evidence/kean-ctf-web-challenges.webp", alt: "Kean CTF web hacking challenge dashboard with Cookie Monster and Login Injections shown in green with completion check marks", caption: "Web hacking dashboard — two visibly completed challenges (100 points)." },
  { src: "/evidence/kean-ctf-forensics-overview.webp", alt: "Kean CTF dashboard listing forensic and reverse engineering challenge options without completion check marks", caption: "Forensics and reverse engineering challenge overview; this screenshot does not establish completions." },
  { src: "/evidence/kean-ctf-cryptography-overview.webp", alt: "Kean CTF challenge dashboard listing reverse engineering and cryptography challenge options", caption: "Cryptography and reverse engineering overview; no completions claimed from this screenshot." },
] as const;

export default function KeanCtfPage() {
  return (
    <main className={styles.page} id="top">
      <Nav />
      <div className="container">
        <section className={styles.hero}>
          <a className="back-link" href="/#ctf-hackathons">← BACK TO COMPETITIONS</a>
          <p className={styles.kicker}>COMPETITION CASE STUDY / KEAN UNIVERSITY / 2026</p>
          <h1 className={styles.heading}>A challenge is a hypothesis to test.</h1>
          <p className={styles.intro}>I participated in a collegiate Capture the Flag event as part of a three-member team and independently solved challenges in web application security and digital forensics. My notes preserve the techniques, findings, and lessons from four completed challenges.</p>
          <div className={styles.metrics}>
            <div><strong>04</strong><span>SELF-REPORTED SOLVES</span></div>
            <div><strong>200</strong><span>CHALLENGE POINTS FROM NOTES</span></div>
            <div><strong>02</strong><span>COMPLETIONS VISIBLE IN SCREENSHOTS</span></div>
          </div>
          <p className={styles.disclosure}>Evidence note: the accessible screenshots directly show two completed web challenges. The other two completions and 200-point total are reconstructed from my own contemporaneous notes, not independently verified scoreboard records. No final team rank is claimed.</p>
        </section>

        <section className={styles.section} aria-labelledby="solves-title">
          <div className={styles.sectionTitle}><span>01 / CHALLENGE NOTES</span><h2 id="solves-title">Four completed investigations.</h2></div>
          <div className={styles.challengeGrid}>
            {completed.map((challenge, i) => (
              <article className={styles.challenge} key={challenge.title}>
                <div className={styles.challengeTop}><span>{String(i + 1).padStart(2, "0")} / {challenge.category}</span><span>{challenge.points}</span></div>
                <h3>{challenge.title}</h3>
                <p>{challenge.detail}</p>
                <div className={styles.lesson}><strong>SECURITY TAKEAWAY</strong><p>{challenge.takeaway}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="work-title">
          <div className={styles.sectionTitle}><span>02 / EXPLORATION</span><h2 id="work-title">Work in progress, not claimed as solved.</h2></div>
          <div className={styles.notebook}>
            <p><strong>Beneath the Cover — Forensics:</strong> Opened a DOCX as a ZIP archive and identified an image asset that was not referenced by the visible document. The challenge was unfinished.</p>
            <p><strong>Tracking Down People — OSINT:</strong> Examined photo metadata for an attribution clue. The challenge remained in progress. Personal identifiers are intentionally omitted.</p>
            <p><strong>Other categories:</strong> Explored cryptography and reverse-engineering material. Challenge listings in the screenshots should not be interpreted as completion evidence.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-title">
          <div className={styles.sectionTitle}><span>03 / ORIGINAL EVIDENCE</span><h2 id="evidence-title">Competition dashboard captures.</h2></div>
          <p className={styles.evidenceIntro}>Cropped images preserve the CTF platform identity and original challenge states. Green cards with check marks identify the two screenshot-verified solves; blue cards represent available challenges.</p>
          <div className={styles.evidenceGrid}>
            {evidence.map((item) => (
              <figure key={item.src} className={styles.figure}>
                <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open full screenshot: ${item.caption}`}>
                  <Image src={item.src} width={1040} height={720} sizes="(max-width: 780px) 94vw, 900px" alt={item.alt} />
                </a>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="tools-title">
          <div className={styles.sectionTitle}><span>04 / METHODS</span><h2 id="tools-title">Tools used and explored.</h2></div>
          <p className={styles.evidenceIntro}><strong>Documented challenge work:</strong> Burp Suite, John the Ripper, zip2john, rockyou.txt, and exiftool.</p>
          <p className={styles.evidenceIntro}><strong>Additional tools studied:</strong> CyberChef, zsteg, binwalk, strings, xxd, and Python for binary analysis. These are not all claimed as tools used in the four completed solves.</p>
        </section>
        <div className={styles.end}><a href="/#ctf-hackathons">← ALL COMPETITIONS</a><a href="/#work">SELECTED WORK ↗</a></div>
      </div>
      <footer className="footer container"><p>© 2026 BIBEK GHIMIRE</p><p>EDUCATIONAL CTF / EVIDENCE-FIRST WRITE-UP</p></footer>
    </main>
  );
}
