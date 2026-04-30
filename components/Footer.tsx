import Link from "next/link";

const footerLinks = [
  { href: "/assistant", label: "Assistant" },
  { href: "/timeline", label: "Timeline" },
  { href: "/map", label: "Map" }
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/8 bg-ink-900 text-paper-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-paper-300">VotePath</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-paper-50 sm:text-5xl">
            A calmer election-day interface, built to be clear first.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-paper-200">
            VotePath stays neutral, browser-local, and focused on the practical steps that matter, from eligibility to polling booth navigation and voting-day prep.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="grid gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-paper-100 transition hover:border-ember-300 hover:bg-ember-400/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-paper-400">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
