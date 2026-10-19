# Bibek Ghimire | Cybersecurity portfolio v7.0

An evidence-led Next.js portfolio expanded from Bibek's existing v6.2 website. The application retains the original interactive Three.js network and grounded portfolio assistant, while adding five additional case studies based on provided screenshots and lab files.

## Local development

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build: `npm run build` · Start: `npm run start`. A lockfile is not supplied; commit a generated lockfile when dependencies are installed. `next lint` is not available in Next.js 15; validate with `npx tsc --noEmit` and `npm run build`.

## Key pages

- `/` - project-led homepage and portfolio assistant
- `/case-studies/digital-forensics` - original in-depth ten-lab forensics case
- `/case-studies/network-lab` - Hyper-V / pfSense routing and segmentation
- `/case-studies/tailscale-pfsense` - Tailscale subnet routing
- `/case-studies/linux-firewall` - SSH, Apache and iptables testing
- `/case-studies/bash-job-database` - Bash/AWK flat-file CRUD project
- `/case-studies/ftp-service` - Fedora vsftpd administration
- `/security` - site implementation, privacy and hardening roadmap

## Content and evidence policy

Each project is explicitly labeled as an educational lab unless there is independent evidence for a production deployment. Screenshots are selectively cropped; the Tailscale authentication-key screen and job-database personal records are excluded. No unpublished source repositories are claimed. Lab capture materials remain local; `public/evidence` contains only reviewed subsets.

**IMPORTANT:** A Tailscale auth key was visible in material originally submitted. Rotate/revoke that key and check audit logs before publishing any original screenshot. Never reuse or publish the hard-coded classroom account passwords shown in Bash scripts. Review all posted assets for identifiers before deployment.

## Confirm before public deployment

1. Verify current John Jay enrollment wording: resume says *transferring Fall 2026* while v6.2 said *currently enrolled*. The v7 text conservatively labels this a transfer pathway.
2. Verify preferred contact address. v7 uses `bibekghimire.contact@gmail.com` as shown on the supplied resume (v6.2 used a separate contact address). Optional email target can be set with `CONTACT_TO`.
3. Replace `public/Bibek_Ghimire_Resume.pdf` if academic status/contact details have changed.
4. Confirm that all evidence descriptions faithfully match original source files; do not upload unredacted screenshots.
5. Add rate limiting, CSP, dependency scans and verified email-domain configuration before production rollout.

## Contact endpoint

Without `RESEND_API_KEY`, contact intent falls back to a prefilled mailto link. Server-side notification requires environment variables. Never put server keys in client code or commit `.env` files. Use `RESEND_API_KEY`, `CONTACT_TO`, and a verified sender domain where appropriate.

## Evidence registry

See `EVIDENCE_INDEX.md` and `RELEASE_CHECKLIST.md` for source references, caveats, and publishing review.
