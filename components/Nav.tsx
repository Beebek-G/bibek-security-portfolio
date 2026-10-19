"use client";

import { useState } from "react";

const links = [
  ["Projects", "/#work"],
  ["About", "/#trajectory"],
  ["Training", "/#archive"],
  ["Contact", "/#connect"],
  ["Portfolio PDF ↗", "/Bibek_Ghimire_Project_Portfolio.pdf"],
  ["Resume ↗", "/Bibek_Ghimire_Resume.pdf"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-shell">
      <nav className="nav container" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Bibek Ghimire home">
          <span className="brand-orbit" aria-hidden="true"><i /></span>
          <span>BIBEK / GHIMIRE</span>
        </a>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <button className="nav-ask" onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent("open-network-assistant")); }}>Ask the Network <span>◎</span></button>
        </div>
      </nav>
    </header>
  );
}
