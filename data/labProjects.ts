export type LabProject = {
  slug: string;
  number: string;
  domain: string;
  title: string;
  subtitle: string;
  timeframe: string;
  environment: string[];
  challenge: string;
  implementation: string[];
  validation: string[];
  tradeoffs: string[];
  takeaway: string;
  evidence: { path: string; alt: string; caption: string }[];
  techniques: string[];
  references?: { label: string; href: string }[];
};

export const labProjects: LabProject[] = [
  {
    slug: "network-lab", number: "002", domain: "NETWORK ENGINEERING / VIRTUALIZATION",
    title: "Designing a virtual perimeter.",
    subtitle: "A pfSense gateway on Hyper-V, segmented interfaces, client addressing, and connectivity checks.",
    timeframe: "LAB / JUNE 2026", environment: ["Hyper-V", "pfSense CE 2.8.1", "FreeBSD", "Ubuntu client", "Virtual NICs"],
    challenge: "Build an inspectable lab gateway with separated WAN, LAN, and additional network interfaces. Validate that clients can reach their gateway and a permitted destination without implying that the topology is production-ready.",
    implementation: [
      "Installed pfSense Community Edition 2.8.1 inside a Hyper-V virtual machine, then completed the post-install interface assignment.",
      "Assigned hn0 as WAN (observed DHCP address 192.168.1.178/24), hn1 as LAN (192.168.0.1/24), and hn2 as an optional interface (10.168.153.1/24).",
      "Added a static 192.168.0.10/24 address and a default route via 192.168.0.1 on the Ubuntu test client.",
      "Enabled and labeled the optional interface in the pfSense web UI, then reviewed the corresponding interface firewall rules."
    ],
    validation: [
      "Ubuntu client ping to 192.168.0.1 returned 4/4 packets with 0% loss.",
      "A second ping to 8.8.8.8 returned 4/4 packets with 0% loss from the configured lab client.",
      "An additional ping to 10.168.153.10 returned 5/5 packets with 0% loss, supporting connectivity across the optional test network.",
      "pfSense screens show the interface addresses and successfully applied firewall-rule changes."
    ],
    tradeoffs: [
      "Several rules shown in the original exercises are permissive; the next iteration should define minimum necessary sources, protocols and destinations.",
      "ICMP success confirms reachability to the specific test endpoints, not full segmentation or all application-layer behavior.",
      "Interface assignments and screenshots are available, but a scrubbed full configuration export was not supplied."
    ],
    takeaway: "I learned to validate network changes from both the gateway and the client, not only by whether a configuration page says the change was saved.",
    evidence: [{path:"/evidence/pfsense-wan-rules.webp",alt:"pfSense WAN rules page with a successful apply message and lab firewall rules",caption:"pfSense rule review from a related lab configuration. Broad allow entries are explicitly treated as lab settings, not a hardened production policy."}],
    techniques:["Interface assignment","IPv4 addressing","Subnet boundaries","Firewall policy","Client-side validation","Hypervisor networks"]
  },
  {
    slug: "tailscale-pfsense", number: "003", domain: "VPN / PRIVATE ACCESS",
    title: "A route into the private lab.",
    subtitle: "Joining a pfSense firewall and mobile device through Tailscale, then advertising an internal LAN subnet.",
    timeframe: "LAB / DECEMBER 2025", environment: ["pfSense CE", "Tailscale", "Mobile peer", "WireGuard transport", "192.168.1.0/24 test LAN"],
    challenge: "Explore remote private-network access using a mesh VPN without exposing lab services directly on the public Internet.",
    implementation: [
      "Installed the pfSense Tailscale package through Package Manager and confirmed it appeared in Installed Packages.",
      "Authenticated the firewall to a Tailscale network and inspected its online status and peer list.",
      "Configured Tailscale's UDP listen port at 41641 and applied a WAN firewall rule for that port.",
      "Configured advertisement of the 192.168.1.0/24 subnet, kept accept-subnet-routes enabled, then approved the advertised route in the Tailscale administration console."
    ],
    validation: [
      "The pfSense interface reported that Tailscale was online.",
      "The Tailscale status view listed two connected devices: a FreeBSD firewall node and an iOS mobile peer.",
      "The admin console showed 192.168.1.0/24 in the approved subnets for the firewall node.",
      "The firewall diagnostics command returned the same two peers in the Tailscale status output."
    ],
    tradeoffs: [
      "Peer connection and route approval are not by themselves a documented end-to-end application test from the phone to an internal host.",
      "Authentication-key fields are deliberately omitted from the public portfolio; rotate or revoke any credentials included in private lab captures.",
      "Production designs require explicit authorization policies, ACL verification, route lifecycle management and least-privilege firewall rules."
    ],
    takeaway: "A tunnel being online is only the first checkpoint. Route advertisement, approval, firewall access, and destination reachability need to be validated separately.",
    evidence: [
      {path:"/evidence/pfsense-subnet-routing.webp",alt:"pfSense Tailscale routing settings showing an advertised subnet",caption:"Subnet route advertisement in the pfSense Tailscale settings."},
      {path:"/evidence/pfsense-vpn-settings.webp",alt:"pfSense Tailscale settings showing service enabled and online",caption:"Tailscale service enabled, online, and configured with its UDP listen port; sensitive authentication fields excluded."}
    ],
    techniques:["Mesh VPN","WireGuard-based overlay","Subnet routes","Route approval","WAN rules","Administrative verification"]
  },
  {
    slug: "linux-firewall", number: "004", domain: "HOST DEFENSE / LINUX",
    title: "Rules, services and packet evidence.",
    subtitle: "Investigating iptables behavior while running SSH and Apache on an Ubuntu virtual machine.",
    timeframe: "LAB / MARCH 2026", environment: ["Ubuntu", "iptables", "OpenSSH", "Apache2", "Netcat", "dmesg"],
    challenge: "Observe how host firewall policies influence TCP service reachability, with changes measured by concrete probes instead of assumed outcomes.",
    implementation: [
      "Inspected the INPUT chain and its counters using `iptables -L -n -v`.",
      "Started OpenSSH and Apache2 and checked service state with `systemctl status`.",
      "Flushed and reconfigured rules in a disposable VM, including INPUT default DROP, loopback ACCEPT, and targeted TCP port allowances.",
      "Used Netcat `nc -zv` checks against TCP/80, compared ACCEPT and REJECT behavior, and added a LOG rule with a prefix for kernel diagnostics."
    ],
    validation: [
      "`systemctl` outputs show SSH and Apache2 active (running).",
      "The Apache default page loaded locally in Firefox, confirming the local HTTP service responded.",
      "Netcat probes to port 80 succeeded while an ACCEPT rule allowed the traffic and later produced a refused connection in the documented REJECT test.",
      "Kernel output displayed packets annotated by the custom `IPTables-Dropped:` log prefix."
    ],
    tradeoffs: [
      "These commands were executed in a disposable exercise VM; flush/reset actions could lock out users on a remote server.",
      "One screenshot also shows UFW disabled and the INPUT policy temporarily set to ACCEPT; it is not evidence of a final hardened rule set.",
      "The tested remote address and kernel messages are not sufficient to characterize all inbound paths."
    ],
    takeaway: "The operational lesson was to compare service state, firewall policy and observable traffic behavior—and to avoid confusing application errors with dropped packets.",
    evidence: [
      {path:"/evidence/linux-service-commands.webp",alt:"Ubuntu terminal showing iptables policy edits and TCP port probes",caption:"Annotated lab console with INPUT policy changes, ACCEPT/REJECT experimentation, and Netcat verification."},
      {path:"/evidence/apache-localhost.webp",alt:"Apache2 Ubuntu default web page served on localhost",caption:"Local browser confirms Apache2 delivered its default test page."}
    ],
    techniques:["iptables chains","TCP probes","Service management","Port 22/80","Kernel logging","Troubleshooting"]
  },
  {
    slug: "bash-job-database", number: "005", domain: "SHELL ENGINEERING / DATA HANDLING",
    title: "Six scripts. One searchable flat file.",
    subtitle: "A menu-driven command-line jobs database with duplicate protection and CRUD-style workflows.",
    timeframe: "COURSE PROJECT / DECEMBER 2025", environment: ["Fedora", "Bash", "AWK", "GNU coreutils", "Colon-delimited flat file"],
    challenge: "Deliver a small maintainable records system without a relational database, handling additions, search, readable listing, duplicate IDs and deletion.",
    implementation: [
      "Organized the MAC232 final project into `scripts/`, `docs/`, and `data/`, with jobs in `data/jobs.txt` and pseudocode in `docs/pseudocode.txt`.",
      "Built `menu.sh` to dispatch add, search, formatted print, delete, flat-file print and exit actions.",
      "Implemented case-insensitive duplicate JobID detection using AWK field four, then appended nine-field colon-separated records for unique IDs.",
      "Used AWK to render a labeled individual record and a formatted report; deletion filtered the requested JobID to a replacement file."
    ],
    validation: [
      "The terminal rejected insertion of an existing ID and printed the matching preexisting record.",
      "A new ID was accepted, and a subsequent search returned the entered record in labeled fields.",
      "A formatted report showed records; deleting the new ID then removed it from the raw flat-file output.",
      "Executable permissions and the final 4-directories / 8-files project tree were visible."
    ],
    tradeoffs: [
      "The first version uses a colon delimiter without documented escaping; user-provided colons could corrupt the nine-field schema.",
      "Fixed `/tmp` output filenames and unguarded replacement of the data file are fragile under concurrency and unexpected errors; use `mktemp`, traps, validation and atomic replacement.",
      "The screenshots provide source views, but the original `.sh` text files were not uploaded as independently executable artifacts."
    ],
    takeaway: "A simple shell application still needs deliberate choices about data integrity, edge cases and visible success criteria.",
    evidence:[], techniques:["Bash dispatch","AWK field matching","Flat-file CRUD","Duplicate detection","CLI formatting","Project structure"],
  },
  {
    slug: "ftp-service", number: "006", domain: "LINUX ADMINISTRATION / TRANSFER",
    title: "Configuring a controlled FTP exercise.",
    subtitle: "A Fedora vsftpd service, local-user permissions, host firewall allowances, and transfer verification.",
    timeframe: "LAB / NOVEMBER 2025", environment: ["Fedora", "vsftpd 3.0.5", "systemd", "firewalld", "SELinux", "FTP CLI"],
    challenge: "Practice provisioning and validating a network service from installation through authenticated file transfers.",
    implementation: [
      "Confirmed the installed vsftpd package, started and enabled the service, and verified `active (running)` with `systemctl status`.",
      "Configured `anonymous_enable=NO`, `local_enable=YES`, `write_enable=YES`, and a 022 local umask.",
      "Checked firewalld FTP service allowance, reloaded policy, and set the lab SELinux `ftpd_full_access` boolean to on.",
      "Prepared sample text files, connected to the server with `ftp localhost`, and exercised `put` plus prompted `mput` operations."
    ],
    validation: [
      "Service status showed vsftpd active and enabled on Fedora.",
      "Local FTP authentication returned `230 Login successful`.",
      "A one-file upload and two files transferred via `mput` each returned `226 Transfer complete`.",
      "A later `get` showed `550 Failed to open file`, so the exercise includes a failure observation as well as successful uploads."
    ],
    tradeoffs: [
      "Conventional FTP is not encrypted; for sensitive real-world transfers, prefer SFTP or another protected protocol.",
      "The broad SELinux `ftpd_full_access` permission was lab-specific, not a least-privilege production recommendation.",
      "The reported success is on `localhost`; no outside-host transfer or hardened FTPS setup is demonstrated."
    ],
    takeaway: "Service health, policy, authentication and transfer completion are separate checks, and a successful upload does not guarantee every download path works.",
    evidence:[], techniques:["systemd","vsftpd.conf","Local authentication","firewalld","SELinux booleans","FTP CLI"],
  }
];

export function getLabProject(slug: string) { return labProjects.find((project) => project.slug === slug); }
