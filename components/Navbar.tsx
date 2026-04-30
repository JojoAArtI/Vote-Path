"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline", label: "Timeline" },
  { href: "/map", label: "Map" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-black/8 bg-paper-100/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-ink-900 text-[11px] font-bold tracking-[0.3em] text-paper-50 shadow-soft transition duration-300 group-hover:scale-[1.03]">
            VP
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.74rem] font-semibold uppercase tracking-[0.36em] text-ink-500">VotePath</span>
            <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.35em] text-ink-400">neutral civic flow</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition ${
                  active
                    ? "bg-ink-900 text-paper-50 shadow-soft"
                    : "text-ink-500 hover:bg-white/70 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/assistant"
          className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-ink-900 shadow-soft transition hover:-translate-y-0.5 hover:border-ember-300 hover:bg-ember-50"
        >
          Start path
        </Link>
      </div>
    </header>
  );
}
