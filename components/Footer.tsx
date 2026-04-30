import Link from "next/link";

const footerLinks = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline",  label: "Timeline"  },
  { href: "/map",       label: "Map"        },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-void-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-ember font-mono text-[10px] font-bold tracking-widest text-black">VP</span>
              <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.32em] text-fog-100">VotePath</span>
            </div>
            <h2 className="mt-8 max-w-md font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-3xl">
              A calmer path<br />through election day.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-fog-500">
              Neutral, browser-local, and focused on the practical steps — from eligibility to polling booth.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between gap-8">
            <nav className="grid gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-sm border border-white/[0.07] bg-white/[0.03] px-4 py-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-fog-300 transition hover:border-ember/30 hover:text-ember"
                >
                  {link.label}
                  <span className="text-fog-600">→</span>
                </Link>
              ))}
            </nav>

            <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-fog-600">
              Built with Next.js · Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
