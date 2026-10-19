import { NextRequest, NextResponse } from "next/server";
import { assistantKnowledge } from "@/data/portfolio";

const STOP = new Set(["the","a","an","is","are","was","were","do","does","did","of","to","for","with","and","or","in","on","at","about","what","who","how","can","could","would","bibek","his","he","me","i","you"]);

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function scoreItem(query: string, item: (typeof assistantKnowledge)[number]) {
  const q = query.toLowerCase();
  const qt = tokens(query);
  let score = item.weight ?? 1;

  for (const tag of item.tags) {
    if (q.includes(tag.toLowerCase())) score += 8;
    for (const token of qt) if (tag.toLowerCase().includes(token)) score += 2;
  }
  const body = `${item.title} ${item.body}`.toLowerCase();
  for (const token of qt) {
    const count = body.split(token).length - 1;
    score += Math.min(count, 3) * 1.2;
  }
  return score;
}

function buildAnswer(query: string) {
  const lower = query.toLowerCase();
  const ranked = assistantKnowledge
    .map((item) => ({ item, score: scoreItem(query, item) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];
  const contactIntent = /contact|connect|email|reach|talk|meet|message|linkedin/.test(lower);
  const hiringIntent = /hire|hiring|recruiter|internship|role|job|fit|candidate/.test(lower);

  if (contactIntent) {
    const connect = assistantKnowledge.find((x) => x.id === "connect")!;
    return {
      answer: connect.body,
      sources: [{ title: connect.title, href: connect.href, cta: connect.cta }],
      contactIntent: true,
      confidence: "high",
    };
  }

  if (hiringIntent) {
    const roles = assistantKnowledge.find((x) => x.id === "roles")!;
    const forensics = assistantKnowledge.find((x) => x.id === "forensics")!;
    return {
      answer: `${roles.body} ${forensics.body}`,
      sources: [
        { title: roles.title, href: roles.href, cta: roles.cta },
        { title: forensics.title, href: forensics.href, cta: forensics.cta },
      ],
      contactIntent: false,
      confidence: "high",
    };
  }

  if (top.score < 6) {
    return {
      answer: "I’m Bibek’s portfolio assistant, not Bibek. I only answer from his public portfolio evidence. I don’t have enough evidence to answer that confidently yet. I can help with his projects, education, digital forensics work, CTF experience, network-security labs, Python evidence, current role fit, career direction, or how to contact him.",
      sources: [],
      contactIntent: false,
      confidence: "low",
    };
  }

  const includeSecond = second && second.score > Math.max(8, top.score * 0.72) && second.item.id !== top.item.id;
  const answer = includeSecond
    ? `${top.item.body} Related evidence: ${second.item.body}`
    : top.item.body;

  return {
    answer,
    sources: [top.item, ...(includeSecond ? [second.item] : [])].map((x) => ({ title: x.title, href: x.href, cta: x.cta })),
    contactIntent: false,
    confidence: top.score > 15 ? "high" : "medium",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = String(body?.message ?? "").trim().slice(0, 900);
    if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

    return NextResponse.json(buildAnswer(message), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Unable to process the message." }, { status: 400 });
  }
}
