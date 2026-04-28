import { NextResponse } from "next/server";
import type { NewsItem } from "@/types";

interface BackendPost {
  slug: string;
  title: string;
  description: string | null;
  publishedAt: string | null;
  tags: string[];
  category: string | null;
}

export interface AiPolicyDeskNewsItem {
  item: NewsItem;
  entityId: string;
}

// Map text patterns → entity IDs (checked against title + description + tags).
// Order matters — first match wins.
const ENTITY_PATTERNS: Array<{ re: RegExp; entityId: string }> = [
  { re: /\beu ai act\b|\beuropean union\b|\beu regulation\b|\beuropean commission\b|\beurope\b/i, entityId: "eu-bloc" },
  { re: /\bgdpr\b|\bdigital markets act\b|\bdma\b|\bdsa\b/i, entityId: "eu-bloc" },
  { re: /\bgermany\b|\bbundes/i, entityId: "germany" },
  { re: /\bfrance\b|\bfrench\b/i, entityId: "france" },
  { re: /\bunited kingdom\b|\buk\b|\bbritain\b|\bengland\b|\bofcom\b|\bico\b/i, entityId: "united-kingdom" },
  { re: /\bchina\b|\bchinese\b|\bbeijing\b|\bcybersecurity law\b/i, entityId: "china" },
  { re: /\bjapan\b|\bjapanese\b/i, entityId: "japan" },
  { re: /\bsouth korea\b|\bkorean\b/i, entityId: "south-korea" },
  { re: /\baustralia\b|\baustralian\b/i, entityId: "australia" },
  { re: /\bcanada\b|\bcanadian\b/i, entityId: "canada-federal" },
  { re: /\bcalifornia\b|\bsb\s*1047\b|\bab\s*2013\b/i, entityId: "california" },
  { re: /\btexas\b/i, entityId: "texas" },
  { re: /\bnew york\b/i, entityId: "new-york" },
  { re: /\billinois\b/i, entityId: "illinois" },
  { re: /\bcolorado\b/i, entityId: "colorado" },
  { re: /\bvirginia\b/i, entityId: "virginia" },
  { re: /\bwashington\b(?!\s+d\.?c\.?)/i, entityId: "washington" },
  { re: /\bflorida\b/i, entityId: "florida" },
];

function inferEntityId(post: BackendPost): string {
  const haystack = [
    post.title,
    post.description ?? "",
    ...(post.tags ?? []),
  ].join(" ");

  for (const { re, entityId } of ENTITY_PATTERNS) {
    if (re.test(haystack)) return entityId;
  }
  return "us-federal";
}

const BACKEND_URL =
  process.env.CONTENT_BACKEND_URL || "http://backend:8000";

const SITE_URL =
  process.env.AIPOLICYDESK_URL || "https://www.aipolicydesk.com";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/posts?limit=60`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ items: [] });
    }

    const posts: BackendPost[] = await res.json();

    const items: AiPolicyDeskNewsItem[] = posts.map((post) => ({
      entityId: inferEntityId(post),
      item: {
        id: `aipd-${post.slug}`,
        headline: post.title,
        source: "AI Policy Desk",
        date: post.publishedAt?.slice(0, 10) ?? "",
        url: `${SITE_URL}/blog/${post.slug}`,
        summary: post.description ?? undefined,
        summarySource: "article" as const,
      },
    }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
