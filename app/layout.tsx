import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bibek Ghimire | Cybersecurity & Digital Forensics",
  description: "An evidence-first cybersecurity portfolio by Bibek Ghimire: digital forensics, pfSense network defense, Tailscale VPN, Linux firewall testing, and Bash automation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
