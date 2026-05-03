import Link from "next/link";

const footerLinks = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline",  label: "Timeline"  },
  { href: "/map",       label: "Map"        },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brutal-black bg-brutal-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center bg-brutal-black font-mono text-[12px] font-bold text-brutal-white">VP</span>
              <span className="font-mono text-lg font-bold uppercase tracking-widest text-brutal-black">VotePath</span>
            </div>
            <h2 className="mt-8 max-w-md font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-brutal-black sm:text-4xl">
              A calmer path<br />through election day.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-brutal-black">
              Neutral, browser-local, and focused on the practical steps — from eligibility to polling booth.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between gap-8">
            <nav className="grid gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between border-2 border-brutal-black bg-brutal-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest text-brutal-black shadow-brutal transition hover:bg-brutal-blue hover:text-brutal-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  {link.label}
                  <span className="font-bold">→</span>
                </Link>
              ))}
            </nav>

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-brutal-black">
              Built with Next.js · Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
