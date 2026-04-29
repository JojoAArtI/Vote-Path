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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-civic-600 to-civicGreen-500 text-lg font-bold text-white shadow-glow">
            V
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-slate-900">VotePath</span>
            <span className="block text-xs text-slate-500">Election day copilot</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-civic-50 text-civic-800 ring-1 ring-civic-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/assistant"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Start Assistant
        </Link>
      </div>
    </header>
  );
}

