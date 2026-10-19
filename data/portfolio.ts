export const profile = {
  name: "Bibek Ghimire",
  email: "bibekghimire.contact@gmail.com",
  github: "https://github.com/Beebek-G",
  linkedin: "https://linkedin.com/in/bibekghimire33",
  location: "New York City",
  headline: "Cybersecurity · Digital Forensics · Network Defense",
  school: "John Jay College of Criminal Justice, CUNY",
  priorSchool: "LaGuardia Community College, CUNY",
  degree: "Computer Science and Information Security (currently enrolled)",
  associate: "A.A.S. Cybersecurity",
  gpa: "3.53",
};

export const cases = [
  { n: "001", id: "forensics", eyebrow: "DIGITAL FORENSICS", title: "Evidence before assumptions.", body: "Ten academic investigations across disk images, incident response, file recovery, communications, mobile and memory forensics.", signal: "10 LAB REPORTS", meta: "AUTOPSY · WIRESHARK · EVIDENCE HANDLING", href: "/case-studies/digital-forensics", live: true },
  { n: "002", id: "network-security", eyebrow: "NETWORK ENGINEERING", title: "Segment. Route. Verify.", body: "Installed pfSense 2.8.1 on Hyper-V, assigned WAN / LAN / optional interfaces, built rules and verified connectivity from Ubuntu clients.", signal: "HYPER-V LAB", meta: "PFSENSE · HYPER-V · IPV4 · RULES", href: "/case-studies/network-lab", live: true },
  { n: "003", id: "tailscale-pfsense", eyebrow: "SECURE CONNECTIVITY", title: "A private path to the lab.", body: "Connected pfSense and a mobile device through Tailscale; configured an advertised LAN subnet route and reviewed firewall access.", signal: "VPN + ROUTING", meta: "TAILSCALE · SUBNET ROUTING · PFSENSE", href: "/case-studies/tailscale-pfsense", live: true },
  { n: "004", id: "linux-security", eyebrow: "HOST DEFENSE", title: "From policy to packet.", body: "Examined SSH and Apache services, applied iptables INPUT policy changes, and used Netcat and kernel logs to validate traffic decisions.", signal: "COMMAND-LEVEL PROOF", meta: "UBUNTU · IPTABLES · SSH · APACHE", href: "/case-studies/linux-firewall", live: true },
  { n: "005", id: "bash-automation", eyebrow: "SECURITY + AUTOMATION", title: "Build tools. Test edge cases.", body: "Designed a menu-driven Bash flat-file job database with case-insensitive duplicate detection, search, formatted reports and deletion.", signal: "6 BASH SCRIPTS", meta: "BASH · AWK · FILE HANDLING", href: "/case-studies/bash-job-database", live: true },
  { n: "006", id: "ftp-admin", eyebrow: "LINUX SYSTEMS", title: "Harden, start, transfer, inspect.", body: "Configured vsftpd local access, firewalld and SELinux policy, then tested one-file and multi-file transfers through the FTP CLI.", signal: "TESTED LOCALHOST", meta: "FEDORA · VSFTPD · FIREWALLD", href: "/case-studies/ftp-service", live: true },
];

export const timeline = [
  ["2020", "FOUNDATION", "Hardware + Networking", "DIT Solution · Kathmandu", "Computer hardware, Windows installation, partitions, networking, setup, and client-server fundamentals."],
  ["2020", "CODE", "C++ + Python", "DIT Solution · Kathmandu", "Programming fundamentals, flow control, functions, OOP, MySQL connectivity, and project work."],
  ["2021—22", "BUILD", "Web + Graphic Design", "DIT Solution · Kathmandu", "Design, Photoshop, Bootstrap, Dreamweaver, full-stack concepts, Java, MySQL, CorelDraw, and Illustrator."],
  ["2022", "SECURITY SIGNAL", "Forensics: Hiding Data in Unsuspected Files", "ThriveDX × RISE", "Attended a forensics webinar issued under the ThriveDX / RISE Hackathon Certificate program."],
  ["2024—26", "CYBERSECURITY", "A.A.S. Cybersecurity", "LaGuardia Community College, CUNY", "Digital forensics, advanced network security, systems security, cryptography, Linux, Windows Server, databases, and Python."],
  ["2026", "PRESSURE TEST", "Kean University CTF", "Collegiate competition", "Cryptography, web security, digital forensics, reverse engineering, and OSINT in a timed environment."],
  ["2026—Present", "CURRENTLY ENROLLED", "Computer Science and Information Security", "John Jay College of Criminal Justice, CUNY", "Currently enrolled at John Jay College of Criminal Justice, CUNY."],
] as const;

export const securityEvents: ReadonlyArray<{ year: string; type: string; title: string; org: string; body: string; tags: readonly string[]; href: string | null; action: string }> = [
  {
    year: "2026",
    type: "COLLEGIATE CTF",
    title: "Kean University CTF",
    org: "Kean University / LaGuardia Cybersecurity Program",
    body: "Independently completed four web security and digital forensics CTF challenges during a three-member team competition. Two completed web challenges are visible in archived screenshots; additional solves are documented in personal challenge notes.",
    tags: ["WEB SECURITY", "DIGITAL FORENSICS", "BURP SUITE", "JOHN THE RIPPER", "EXIFTOOL"],
    href: "/case-studies/kean-ctf",
    action: "VIEW CTF CASE STUDY ↗",
  },
  {
    year: "2022",
    type: "HACKATHON-BRANDED FORENSICS EVENT",
    title: "Forensics: Hiding Data in Unsuspected Files",
    org: "ThriveDX × RISE",
    body: "Attended a forensics webinar documented by a ThriveDX / RISE Hackathon Certificate. The portfolio keeps the credential branding visible while describing the actual activity as webinar attendance—not as a hackathon win or competition result.",
    tags: ["FORENSICS", "DATA HIDING", "STEGANOGRAPHY", "EARLY SECURITY SIGNAL"],
    href: "/credentials/thrivedx-rise-forensics.pdf",
    action: "VIEW CREDENTIAL ↗",
  },
] as const;

export const credentials = [
  ["2020", "A+ Hardware & Networking", "DIT Solution", "FOUNDATION", "VERIFIED"],
  ["2020", "C++ & Python", "DIT Solution", "PROGRAMMING", "VERIFIED"],
  ["2022", "Web Designing & Graphic Designing", "DIT Solution", "BUILD", "VERIFIED"],
  ["2022", "Forensics: Hiding Data in Unsuspected Files", "ThriveDX × RISE", "FORENSICS", "VIEW", "/credentials/thrivedx-rise-forensics.pdf"],
  ["2025", "Complete Python Bootcamp", "CodeWithHarry", "PYTHON", "VIEW", "/credentials/python-bootcamp-2025.pdf"],
  ["2025", "Student Cyber Security Awareness", "CUNY / LaGuardia", "AWARENESS", "VIEW", "/credentials/cuny-cyber-awareness.pdf"],
] as const;

export type KnowledgeItem = {
  id: string;
  title: string;
  tags: string[];
  body: string;
  href?: string;
  cta?: string;
  weight?: number;
};

export const assistantKnowledge: KnowledgeItem[] = [
  {
    id: "overview",
    title: "Professional overview",
    tags: ["bibek", "about", "overview", "background", "who", "student", "cybersecurity", "profile"],
    body: "Bibek Ghimire completed an A.A.S. in Cybersecurity at LaGuardia Community College with a 3.53 GPA and is currently enrolled at John Jay College of Criminal Justice, CUNY, studying Computer Science and Information Security. His strongest public evidence currently centers on digital forensics, with additional experience in network security labs, CTF competition, IT support, web design, and a personal security lab.",
    href: "#trajectory",
    cta: "View trajectory",
    weight: 4,
  },
  {
    id: "forensics",
    title: "Digital Forensics Investigation Series",
    tags: ["forensics", "digital", "autopsy", "wireshark", "ftk", "memory", "mobile", "windows", "linux", "incident", "evidence", "investigation", "strongest", "best", "project"],
    body: "Bibek's strongest documented cybersecurity work is the Digital Forensics Investigation Series: 10 investigations covering the Daubert Standard, steganography, deleted and damaged file recovery, incident response, Windows, Linux, email/chat logs, mobile devices, network infrastructure, and system memory. The repository includes the original reports and documents tools such as Autopsy, Wireshark, Nmap, FTK, Steghide, Paraben P2 Commander, and Windows Event Viewer.",
    href: "/case-studies/digital-forensics",
    cta: "Open forensic case study",
    weight: 8,
  },
  {
    id: "incident-response",
    title: "Incident-response evidence",
    tags: ["incident", "response", "ioc", "logon", "ftp", "soc", "security operations", "investigation"],
    body: "Bibek has academic incident-response evidence from his digital-forensics coursework. One investigation involved a suspicious logon event, analysis of FTP protocol sessions, and identification of indicators of compromise across Windows and Linux systems. This is coursework evidence, not production SOC experience.",
    href: "/case-studies/digital-forensics#lab-04",
    cta: "View incident-response spotlight",
    weight: 7,
  },
  {
    id: "network-security",
    title: "Network security",
    tags: ["network", "networking", "cisco", "acl", "vpn", "vlan", "firewall", "routing", "switching", "nmap", "metasploit", "wireshark"],
    body: "Bibek's network-security coursework includes firewalls, ACLs, VPNs, VLANs, routing and switching, packet analysis, and offensive testing in lab environments. He has used Kali Linux, Nmap, Metasploit, and Wireshark. New case studies document specific pfSense, Hyper-V, VPN, Linux firewall, and FTP lab experiments, but public source repositories are not yet linked.",
    href: "/case-studies/network-lab",
    cta: "View pfSense lab",
    weight: 6,
  },
  {
    id: "ctf",
    title: "CTF & hackathon-related security events",
    tags: ["ctf", "kean", "competition", "hackathon", "thrivedx", "rise", "crypto", "cryptography", "web", "osint", "reverse engineering", "forensics"],
    body: "Bibek participated in the Kean University CTF during 2026 as part of a three-member team. He reports independently completing Cookie Monster (Base64 authentication cookie manipulation using Burp Suite), Login Injections (SQL injection), Password Cracking (zip2john and John the Ripper against a protected ZIP), and Hidden Layers (exiftool metadata inspection): four 50-point solves. Screenshots visibly confirm Cookie Monster and Login Injections; other completions are documented in personal notes. Beneath the Cover and Tracking Down People were unfinished. No final ranking is claimed.",
    href: "#ctf-hackathons",
    cta: "View CTF & event evidence",
    weight: 7,
  },
  {
    id: "thrivedx",
    title: "ThriveDX / RISE forensics webinar",
    tags: ["thrivedx", "rise", "hackathon", "webinar", "hiding data", "steganography", "certificate"],
    body: "Bibek attended the ThriveDX / RISE webinar 'Forensics: Hiding Data in Unsuspected Files' in August 2022. The credential is branded as a Hackathon Certificate, but the documented activity is webinar attendance, so the portfolio presents it that way rather than implying a hackathon win or competition result.",
    href: "/credentials/thrivedx-rise-forensics.pdf",
    cta: "View credential",
    weight: 5,
  },
  {
    id: "python",
    title: "Python evidence",
    tags: ["python", "programming", "code", "coding", "bootcamp", "development"],
    body: "Bibek has Python coursework and training, including programming study at DIT Solution, Python coursework in his cybersecurity program, and a 2025 Python Bootcamp certificate. His public portfolio currently has stronger evidence for digital forensics than for Python software development, so a dedicated security-automation project would strengthen this claim.",
    href: "/credentials/python-bootcamp-2025.pdf",
    cta: "View Python credential",
    weight: 5,
  },
  {
    id: "tailscale-lab", title: "pfSense and Tailscale VPN lab",
    tags: ["tailscale", "vpn", "wireguard", "subnet", "remote", "pfsense", "phone"],
    body: "An academic lab connected pfSense and a mobile device using Tailscale. Screenshots document an online pfSense node, a second mobile node, UDP 41641 firewall rules, and advertisement and approval of 192.168.1.0/24. The images do not independently demonstrate unrestricted end-to-end application reachability.",
    href: "/case-studies/tailscale-pfsense", cta: "Read VPN case study", weight: 6,
  },
  {
    id: "bash-tools", title: "Bash automation projects",
    tags: ["bash", "awk", "shell", "job", "job database", "records", "script", "automation", "linux"],
    body: "Screenshots show a six-script Bash job database with add, search, formatted listing, delete, flat-file print, and quit. Duplicate JobIDs are rejected case-insensitively. Separate Bash user-administration examples handle bulk creation and password reset; these are classroom exercises and their hard-coded default passwords should never be reused.",
    href: "/case-studies/bash-job-database", cta: "View automation case", weight: 6,
  },
  {
    id: "ftp-lab", title: "Fedora FTP service lab",
    tags: ["ftp", "vsftpd", "fedora", "selinux", "file transfer", "firewalld"],
    body: "Lab screenshots show vsftpd installed and active, firewalld permitting FTP, local users enabled, anonymous FTP disabled, and successful local uploads of individual and multiple text files. A separate download failed after deletion of the local sample; the screenshots do not verify remote Internet exposure.",
    href: "/case-studies/ftp-service", cta: "Read FTP case", weight: 5,
  },
  {
    id: "linux-firewall", title: "Ubuntu iptables and service testing",
    tags: ["iptables", "ubuntu", "ssh", "apache", "netcat", "firewall", "packet", "host defense"],
    body: "An Ubuntu lab shows SSH and Apache active, INPUT default DROP and rule-level allow/reject changes, netcat TCP/80 probes, localhost policy experiments, and inspection of kernel log output. Results are lab observations, not proof of an external penetration test.",
    href: "/case-studies/linux-firewall", cta: "Read firewall case", weight: 7,
  },
  {
    id: "education",
    title: "Education",
    tags: ["education", "college", "school", "john jay", "laguardia", "cuny", "gpa", "degree", "major", "associate", "bachelor"],
    body: "Bibek completed an A.A.S. in Cybersecurity at LaGuardia Community College, CUNY with a 3.53 GPA. He is currently enrolled at John Jay College of Criminal Justice, CUNY, studying Computer Science and Information Security.",
    href: "#trajectory",
    cta: "View academic trajectory",
    weight: 7,
  },
  {
    id: "work",
    title: "Work experience",
    tags: ["work", "experience", "job", "dit", "web designer", "it support", "dunkin", "employment"],
    body: "Before and during his cybersecurity studies, Bibek built professional experience in web design and IT support at DIT Solution in Kathmandu, Nepal, and has also worked while studying in New York. The portfolio emphasizes transferable evidence such as client-facing delivery, troubleshooting, networking support, web development, consistency, and time management without presenting non-security work as security employment.",
    href: "#trajectory",
    cta: "View trajectory",
    weight: 5,
  },
  {
    id: "home-lab",
    title: "Personal security lab",
    tags: ["home lab", "lab", "kali", "ubuntu", "utm", "virtualbox", "tryhackme", "hack the box", "htb"],
    body: "Bibek maintains a virtualization-based home lab on Apple Silicon using UTM and VirtualBox with Kali Linux and Ubuntu for offensive and defensive practice. His resume also documents TryHackMe work and active Hack The Box practice. A dedicated public home-lab repository is still a future evidence upgrade.",
    href: "#work",
    cta: "See current evidence",
    weight: 5,
  },
  {
    id: "roles",
    title: "Current role fit",
    tags: ["role", "roles", "job", "internship", "soc", "analyst", "security analyst", "fit", "hire", "hiring", "recruiter"],
    body: "Based on the evidence currently documented, internships or early-career opportunities in SOC/security operations, digital forensics, incident response support, network security, and broader cybersecurity analysis are the clearest fit. His portfolio still needs stronger public evidence in SIEM/detection engineering, cloud security, and production-scale security work before those should be treated as strengths.",
    href: "#work",
    cta: "Review evidence",
    weight: 8,
  },
  {
    id: "goals",
    title: "Career and graduate-school direction",
    tags: ["goal", "goals", "masters", "graduate", "grad school", "ivy", "research", "career", "future", "networking"],
    body: "Bibek's long-term strategy is to compound technical evidence, research exposure, work experience, and professional relationships. He is interested in strong cybersecurity/computer-security graduate programs and relevant security employment, with networking as a top priority. The portfolio is designed to become a career operating system rather than a static resume site.",
    href: "#network",
    cta: "View network strategy",
    weight: 6,
  },
  {
    id: "connect",
    title: "Connect with Bibek",
    tags: ["connect", "contact", "email", "linkedin", "message", "reach", "talk", "meet", "network"],
    body: "Visitors can connect with Bibek for networking, internship opportunities, research conversations, collaboration, or feedback. His professional email is bibekghimire.contact@gmail.com and his LinkedIn is linkedin.com/in/bibekghimire33.",
    href: "#connect",
    cta: "Send a note",
    weight: 9,
  },
];

export const networkNodes = [
  { id: "bibek", label: "BIBEK", kind: "core", position: [0, 0, 0] as [number, number, number], href: "#top", knowledgeId: "overview" },
  { id: "forensics", label: "FORENSICS", kind: "evidence", position: [-3.5, 1.4, 0.8] as [number, number, number], href: "/case-studies/digital-forensics", knowledgeId: "forensics" },
  { id: "network", label: "NETWORK SECURITY", kind: "evidence", position: [3.9, 1.2, -0.5] as [number, number, number], href: "/case-studies/network-lab", knowledgeId: "network-security" },
  { id: "ctf", label: "CTF + HACKATHONS", kind: "signal", position: [-4.2, -1.7, -1.1] as [number, number, number], href: "#ctf-hackathons", knowledgeId: "ctf" },
  { id: "python", label: "PYTHON", kind: "skill", position: [3.6, -2.2, 0.9] as [number, number, number], href: "/case-studies/bash-job-database", knowledgeId: "python" },
  { id: "johnjay", label: "JOHN JAY", kind: "trajectory", position: [0.8, 3.3, -1.4] as [number, number, number], href: "#trajectory", knowledgeId: "education" },
  { id: "research", label: "RESEARCH", kind: "future", position: [0.4, -3.5, -1.4] as [number, number, number], href: "#network", knowledgeId: "goals" },
  { id: "home", label: "HOME LAB", kind: "skill", position: [5.2, 0.0, -2.6] as [number, number, number], href: "#work", knowledgeId: "home-lab" },
  { id: "ask", label: "ASK THE NETWORK", kind: "assistant", position: [-1.2, -2.2, 2.9] as [number, number, number], href: "#ask", knowledgeId: "connect" },
];

export const networkEdges: [string, string][] = [
  ["bibek", "forensics"], ["bibek", "network"], ["bibek", "ctf"], ["bibek", "python"], ["bibek", "johnjay"], ["bibek", "research"], ["bibek", "home"], ["bibek", "ask"],
  ["forensics", "ctf"], ["forensics", "network"], ["network", "home"], ["johnjay", "research"], ["python", "home"], ["research", "ask"],
];
