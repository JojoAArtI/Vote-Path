import Link from "next/link";
import Hero from "@/components/Hero";

const whyCards = [
  {
    tag:   "Clarity",
    title: "Zero noise.",
    text:  "VotePath strips civic info down to what you actually need on election day. No persuasion, no political framing.",
  },
  {
    tag:   "Neutrality",
    title: "No recommendations.",
    text:  "No party affiliations. No political framing. Just the practical steps that get you to and through your polling booth.",
  },
  {
    tag:   "Privacy",
    title: "Stays in your browser.",
    text:  "Progress is local. No server-side profile, no tracking. Your data doesn't leave the tab.",
  },
];

const routeCards = [
  {
    href:  "/assistant",
    num:   "01",
    label: "Assistant",
    title: "Get a tailored voting path.",
    text:  "Answer a few short questions. The guide adapts to your setup.",
    dark:  true,
  },
  {
    href:  "/timeline",
    num:   "02",
    label: "Timeline",
    title: "See the process in order.",
    text:  "Eligibility, registration, documents, the booth — step by step.",
    dark:  false,
  },
  {
    href:  "/map",
    num:   "03",
    label: "Map",
    title: "Find your booth before you leave.",
    text:  "Browser geolocation or manual entry — no noisy experience.",
    dark:  false,
  },
];

export default function HomePage() {
  return (
    <div className="bg-void">
      <Hero />

      {/* ── WHY SECTION ── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.36em] text-ember">
          Why it matters
        </p>
        <h2 className="mt-5 max-w-2xl font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl lg:text-5xl">
          Engineered to help<br />you vote better.
        </h2>

        <div className="mt-12 grid gap-px border border-white/[0.06] sm:grid-cols-3">
          {whyCards.map((c) => (
            <div
              key={c.tag}
              className="bg-void-50/40 p-8 transition hover:bg-white/[0.03]"
            >
              <span className="inline-block rounded-sm border border-ember/30 bg-ember/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember">
                {c.tag}
              </span>
              <h3 className="mt-5 font-mono text-xl font-bold uppercase tracking-tight text-fog-50">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-fog-400">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROUTES SECTION ── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.36em] text-ember">
          Three surfaces
        </p>
        <h2 className="mt-5 max-w-xl font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl">
          One consistent<br />path.
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* Large card */}
          <Link
            href={routeCards[0].href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/[0.07] bg-ember-500 p-8 transition hover:bg-ember-400"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-black/50">
                {routeCards[0].num} / {routeCards[0].label}
              </span>
              <span className="font-mono text-[0.7rem] font-bold text-black/40 transition group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-24">
              <h3 className="font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-black sm:text-3xl">
                {routeCards[0].title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-black/60">{routeCards[0].text}</p>
            </div>
          </Link>

          {/* Two stacked cards */}
          <div className="grid gap-4">
            {routeCards.slice(1).map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between rounded-sm border border-white/[0.07] bg-void-50/60 p-8 transition hover:border-ember/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-fog-500">
                    {card.num} / {card.label}
                  </span>
                  <span className="font-mono text-[0.7rem] font-bold text-fog-600 transition group-hover:translate-x-1 group-hover:text-ember">→</span>
                </div>
                <div className="mt-10">
                  <h3 className="font-mono text-xl font-bold uppercase tracking-tight text-fog-50">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-fog-400">{card.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="border-t border-white/[0.06] bg-void-50/50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.36em] text-ember">Ready?</p>
            <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-tight text-fog-50 sm:text-3xl">
              Know before you go.<br />Start in seconds.
            </h2>
          </div>
          <Link
            href="/assistant"
            className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-ember-500 px-8 py-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
          >
            Start assistant →
          </Link>
        </div>
      </section>
    </div>
  );
}
