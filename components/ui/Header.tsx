import Link from "next/link";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aipolicydesk.com";

export default function Header() {
  return (
    <header className="h-12 bg-bg/80 backdrop-blur-xl border-b border-hairline px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-40">
      <Link href={BASE} className="text-sm font-semibold text-ink tracking-wide">
        AI Policy Desk
      </Link>
      <nav className="flex items-center gap-5 text-xs text-muted">
        <Link href={`${BASE}/blog`} className="hover:text-ink transition-colors">
          Blog
        </Link>
        <Link href={`${BASE}/regulations`} className="hover:text-ink transition-colors">
          Regulations
        </Link>
        <Link href="/" className="text-accent hover:text-ink transition-colors">
          Global Tracker
        </Link>
        <Link href="/bills" className="hover:text-ink transition-colors">
          Bills
        </Link>
        <Link href="/politicians" className="hover:text-ink transition-colors">
          Legislators
        </Link>
        <Link href={`${BASE}/pricing`} className="hover:text-ink transition-colors hidden md:inline">
          Pricing
        </Link>
      </nav>
    </header>
  );
}
