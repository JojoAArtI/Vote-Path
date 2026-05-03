"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline",  label: "Timeline"  },
  { href: "/map",       label: "Map"        },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Determine if we're on the homepage where the transparent hero effect matters
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "border-b border-brutal-black/20 bg-brutal-white" 
          : "border-b border-brutal-black/5 bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)} className="group inline-flex items-center gap-3">
          <img src="/logo.png" alt="VotePath Logo" className="h-14 w-14 object-contain transition duration-200 group-hover:scale-105" />
          <span className={`font-mono text-lg font-bold uppercase tracking-widest ${isScrolled || !isHomePage ? "text-brutal-black" : "text-brutal-black drop-shadow-[2px_2px_0_rgba(255,255,255,1)]"}`}>
            VotePath
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Right nav - Desktop */}
          <nav aria-label="Primary" className="hidden items-center gap-4 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 border-2 border-brutal-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest transition shadow-brutal ${
                    active
                      ? "bg-brutal-blue text-brutal-white"
                      : "bg-brutal-white text-brutal-black hover:bg-brutal-gray hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  }`}
                >
                  {active && <span className="block h-2 w-2 bg-brutal-white"></span>}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden flex h-10 w-10 items-center justify-center border-2 border-brutal-black bg-brutal-white text-brutal-black shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-brutal-black bg-brutal-white px-4 py-6 shadow-brutal absolute w-full left-0">
          <nav className="flex flex-col gap-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 border-2 border-brutal-black px-4 py-4 font-mono text-base font-bold uppercase tracking-widest shadow-brutal ${
                    active
                      ? "bg-brutal-blue text-brutal-white"
                      : "bg-brutal-white text-brutal-black"
                  }`}
                >
                  {active && <span className="block h-2 w-2 bg-brutal-white"></span>}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
