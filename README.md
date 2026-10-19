# Bibek Ghimire | Cybersecurity Portfolio v7.0

**An evidence-led portfolio of cybersecurity, digital forensics, network defense, and systems administration work.**

**Live website:** [bibek-security-portfolio.vercel.app](https://bibek-security-portfolio.vercel.app)  
**GitHub:** [@Beebek-G](https://github.com/Beebek-G)  
**LinkedIn:** [bibekghimire33](https://www.linkedin.com/in/bibekghimire33/)

I am studying Computer Science and Information Security at John Jay College of Criminal Justice, CUNY, after completing an A.A.S. in Cybersecurity at LaGuardia Community College. This Next.js portfolio brings together documented academic investigations, practical lab exercises, and a collegiate Capture the Flag (CTF) case study.

## Featured work

| Project | Focus | Case study |
| --- | --- | --- |
| Digital Forensics Investigation Series | Ten academic investigations covering evidence handling, recovery, incident response, and disk, network, mobile, and memory forensics | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/digital-forensics) |
| Kean University CTF | Web security and digital forensics challenges, including authentication cookies, SQL injection, ZIP password recovery, and image metadata | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/kean-ctf) |
| pfSense Network Lab | Hyper-V network segmentation, interface configuration, firewall rules, and connectivity testing | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/network-lab) |
| Tailscale + pfSense | VPN connectivity and subnet-routing lab documentation | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/tailscale-pfsense) |
| Linux Firewall & Services | Ubuntu iptables, SSH, Apache, Netcat, and traffic validation | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/linux-firewall) |
| Bash Job Database | Menu-driven Bash/AWK coursework project with search, duplicate detection, and record management | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/bash-job-database) |
| Fedora FTP Service | vsftpd configuration, local authentication, firewalld/SELinux settings, and transfer tests | [Explore](https://bibek-security-portfolio.vercel.app/case-studies/ftp-service) |

**Evidence note:** These are educational labs and exercises, not claims of production security deployments. In the Kean CTF case study, four challenge completions are documented from personal notes; two are directly visible as completed in the available screenshots. No competition rank is claimed. Some cases are supported by screenshots and written observations rather than independently published source-code repositories.

## Website features

- Interactive Three.js network visualization using React Three Fiber.
- **Ask the Network:** a server-side portfolio assistant that answers from curated public portfolio material; it does not call an external AI model.
- Case studies with methods, observations, limitations, and selected evidence.
- Responsive layouts, downloadable resume and project portfolio PDFs, and a [site security overview](https://bibek-security-portfolio.vercel.app/security).
- Contact flow with a prefilled email fallback. Automated email notifications are **not enabled** unless Resend is configured.

## Tech stack

- **Framework:** Next.js 15 App Router, React 19, TypeScript
- **3D:** Three.js and React Three Fiber
- **Hosting:** Vercel, connected to this GitHub repository's `main` branch
- **Optional email service:** Resend (server-side only)

## Run locally

Requires a compatible Node.js installation and npm.

```bash
git clone https://github.com/Beebek-G/bibek-security-portfolio.git
cd bibek-security-portfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Check types and build the production application:

```bash
npm run typecheck
npm run build
```

The repository includes `package-lock.json` for reproducible dependency installation.

## Environment variables

See [`.env.example`](.env.example) for optional configuration:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Optional server-side email API key. If absent, the contact flow offers a prefilled `mailto:` link. |
| `CONTACT_TO` | Destination email for contact messages or the fallback link. |
| `NEXT_PUBLIC_SITE_URL` | Optional site URL; use the actual deployment URL in production rather than localhost. |

Do not commit API keys, private `.env` files, or unredacted private lab artifacts.

## Security and evidence boundaries

The site includes server-side input checks, an anti-spam honeypot in the contact flow, HTML escaping for email content, and several response security headers. Additional hardening—such as endpoint rate limiting, a Content Security Policy, and automated security checks—remains future work; this portfolio should not be treated as a fully hardened production security service.

Published screenshots are selected subsets of classroom or competition material. Sensitive screenshots and raw personal records are intentionally excluded. See [Evidence Index](EVIDENCE_INDEX.md) and [Release Checklist](RELEASE_CHECKLIST.md) for source notes, limitations, and remaining review items.

## Contact

- **Portfolio:** [bibek-security-portfolio.vercel.app](https://bibek-security-portfolio.vercel.app)
- **LinkedIn:** [linkedin.com/in/bibekghimire33](https://www.linkedin.com/in/bibekghimire33/)
- **Email:** [bibekghimire.contact@gmail.com](mailto:bibekghimire.contact@gmail.com)

---

Built and maintained by Bibek Ghimire.
