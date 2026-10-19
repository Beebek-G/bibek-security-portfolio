import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getLabProject, labProjects } from "@/data/labProjects";

export function generateStaticParams() { return labProjects.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params;
  const project=getLabProject(slug);
  return {title:project?`${project.title} | Bibek Ghimire`:'Case not found', description:project?.subtitle};
}

function Section({number,title,items}:{number:string;title:string;items:string[]}){
  return <section className="lab-section"><div className="lab-section-index">{number} / {title.toUpperCase()}</div><div className="lab-section-content"><h2>{title}</h2><ol>{items.map((item,i)=><li key={i}>{item}</li>)}</ol></div></section>;
}

export default async function LabCaseStudy({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const p=getLabProject(slug);
  if(!p) notFound();
  return <main className="lab-page" id="top">
    <Nav/>
    <div className="container">
      <section className="lab-hero">
        <a className="back-link" href="/#work">← BACK TO SELECTED WORK</a>
        <p className="section-number">CASE FILE {p.number} / {p.domain}</p>
        <h1>{p.title}</h1>
        <p className="lab-subtitle">{p.subtitle}</p>
        <div className="lab-metadata"><span>{p.timeframe}</span><span>EDUCATIONAL LAB / DOCUMENTED EVIDENCE</span><span>CASE {p.number}</span></div>
      </section>
      <section className="lab-summary">
        <div className="lab-summary-lead"><span className="section-number">PROBLEM / 00</span><h2>What was the objective?</h2><p>{p.challenge}</p></div>
        <aside><p className="section-number">TOOLS / ENVIRONMENT</p><div className="lab-tags">{p.environment.map(t=><span key={t}>{t}</span>)}</div><p className="lab-note">Scope: academic / personal testing only. Observed results are described separately from proposed hardening.</p></aside>
      </section>
      <Section number="01" title="What I configured" items={p.implementation}/>
      {p.evidence.length>0&&<section className="lab-evidence"><div className="section-head"><p className="section-number">VISUAL EVIDENCE</p><p className="section-side">SELECTED / CROPPED / NO AUTHENTICATION KEYS</p></div><div className="lab-evidence-grid">{p.evidence.map((e)=><figure key={e.path}><div className="lab-image"><Image src={e.path} alt={e.alt} width={1150} height={720} sizes="(max-width: 900px) 100vw, 720px"/></div><figcaption>{e.caption}</figcaption></figure>)}</div></section>}
      <Section number="02" title="What the tests showed" items={p.validation}/>
      <Section number="03" title="Limits & security considerations" items={p.tradeoffs}/>
      <section className="lab-takeaway"><p className="section-number">04 / TAKEAWAY</p><blockquote>“{p.takeaway}”</blockquote><div className="lab-tags">{p.techniques.map(t=><span key={t}>{t}</span>)}</div></section>
      <section className="lab-end"><a href="/#work">← ALL CASE STUDIES</a><a href="/Bibek_Ghimire_Resume.pdf">VIEW RESUME ↗</a></section>
    </div>
    <footer className="footer container"><p>© 2026 BIBEK GHIMIRE</p><p>ACADEMIC LAB EVIDENCE / CASE {p.number}</p></footer>
  </main>;
}
