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
    <header className="w-full bg-[#fdfdfd] pt-8 pb-4">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#111]">
          VotePath<span className="align-super text-xs font-medium">®</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide transition-colors ${
                  active ? "text-[#111] underline underline-offset-4" : "text-[#555] hover:text-[#111]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

