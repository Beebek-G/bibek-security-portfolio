# Evidence provenance / case-study notes

This index documents how the new case studies were assembled from the materials shared with the portfolio project. **Screenshots are educational lab artifacts, not production deployment proof.**

| Case | Grounding and visible results | Publicly used image | Limitations |
|---|---|---|---|
| pfSense / Hyper-V | Hyper-V pfSense 2.8.1 WAN/LAN/OPT1 assignment; 192.168.0.1/24 LAN, 10.168.153.1/24 OPT1 and Ubuntu ping success on test networks | Selected pfSense network screenshots only | No full config export or route table supplied |
| Tailscale | Package installation, online status, mobile peer, 192.168.1.0/24 subnet advertisement/approval, WAN UDP 41641 rule | Settings / firewall pages with authentication screen excluded | Does not prove a particular application was reachable from mobile end-to-end |
| Linux firewall | SSH/Apache active, iptables DROP/ACCEPT/REJECT changes, Netcat :80 probes, kernel log evidence | Cropped command and local Apache pages | Logs include unrelated traffic; screenshots do not prove external perimeter deployment |
| Bash database | Bash menu, create/search/list/delete/flat-file output, duplicate ID handling in coursework | No raw terminal data screenshots published | Original source files not provided separately, only screenshot views; cannot claim code review |
| Fedora FTP | vsftpd active, anonymous disabled, local write enabled, firewalld and SELinux setting, successful local uploads | No raw terminal data screenshots published | FTP without TLS is unsuitable for sensitive internet-facing transfer; local tests only |
| Forensics | Existing v6.2 ten-lab GitHub evidence case; Autopsy metadata screens and tagged results | No new images needed; preserve existing reports and citations | Lab materials require separate independent permission review for public distribution |

**Withheld:** Tailscale pre-authentication key screenshot; terminal records with names, phone numbers and emails; unverified original source repositories.
