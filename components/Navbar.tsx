"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline",  label: "Timeline"  },
  { href: "/map",       label: "Map"        },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-void/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-ember text-[10px] font-bold tracking-widest text-black transition duration-200 group-hover:bg-ember-400">
            VP
          </span>
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.32em] text-fog-100 transition group-hover:text-ember">
            VotePath
          </span>
        </Link>

        {/* Center nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] transition ${
                  active
                    ? "bg-white/10 text-fog-50"
                    : "text-fog-400 hover:text-fog-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/assistant"
          className="inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
        >
          Start path →
        </Link>
      </div>
    </header>
  );
}
