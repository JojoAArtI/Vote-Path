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
    <div className="bg-brutal-white min-h-screen">
      <Hero />

      {/* ── WHY SECTION ── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="font-mono text-sm font-bold uppercase tracking-widest text-brutal-blue">
          ■ Why it matters
        </p>
        <h2 className="mt-5 max-w-3xl font-mono text-4xl font-bold uppercase leading-tight tracking-tight text-brutal-black sm:text-5xl lg:text-6xl">
          Engineered to help<br />you vote better.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {whyCards.map((c) => (
            <div
              key={c.tag}
              className="border-4 border-brutal-black bg-brutal-white p-8 shadow-brutal transition hover:-translate-y-2"
            >
              <span className="inline-block border-2 border-brutal-black bg-brutal-blue px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brutal-white">
                {c.tag}
              </span>
              <h3 className="mt-8 font-mono text-2xl font-bold uppercase tracking-tight text-brutal-black">
                {c.title}
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-brutal-black/80">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROUTES SECTION ── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 border-t-4 border-brutal-black pt-24">
        <p className="font-mono text-sm font-bold uppercase tracking-widest text-brutal-blue">
          ■ Three surfaces
        </p>
        <h2 className="mt-5 max-w-2xl font-mono text-4xl font-bold uppercase leading-tight tracking-tight text-brutal-black sm:text-5xl">
          One consistent<br />path.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Large card */}
          <Link
            href={routeCards[0].href}
            className="group relative flex flex-col justify-between overflow-hidden border-4 border-brutal-black bg-brutal-blue p-8 shadow-brutal transition hover:-translate-y-2 hover:bg-brutal-black"
          >
            <div className="flex items-start justify-between">
              <span className="bg-brutal-white border-2 border-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brutal-black">
                {routeCards[0].num} / {routeCards[0].label}
              </span>
              <span className="font-mono text-2xl font-bold text-brutal-white transition group-hover:translate-x-2">→</span>
            </div>
            <div className="mt-32">
              <h3 className="font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-brutal-white sm:text-5xl">
                {routeCards[0].title}
              </h3>
              <p className="mt-6 max-w-md text-lg font-medium leading-7 text-brutal-white/90">{routeCards[0].text}</p>
            </div>
          </Link>

          {/* Two stacked cards */}
          <div className="grid gap-6">
            {routeCards.slice(1).map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between border-4 border-brutal-black bg-brutal-white p-8 shadow-brutal transition hover:-translate-y-2 hover:bg-brutal-blue hover:text-brutal-white"
              >
                <div className="flex items-start justify-between">
                  <span className="border-2 border-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-widest text-brutal-black group-hover:bg-brutal-white group-hover:text-brutal-black">
                    {card.num} / {card.label}
                  </span>
                  <span className="font-mono text-2xl font-bold text-brutal-black transition group-hover:translate-x-2 group-hover:text-brutal-white">→</span>
                </div>
                <div className="mt-12">
                  <h3 className="font-mono text-2xl font-bold uppercase tracking-tight text-brutal-black group-hover:text-brutal-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base font-medium leading-7 text-brutal-black/80 group-hover:text-brutal-white/90">{card.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="border-t-4 border-b-4 border-brutal-black bg-brutal-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-20 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-brutal-blue">■ Ready?</p>
            <h2 className="mt-4 font-mono text-4xl font-bold uppercase tracking-tight text-brutal-black sm:text-5xl">
              Know before you go.<br />Start in seconds.
            </h2>
          </div>
          <Link
            href="/assistant"
            className="shrink-0 inline-flex items-center gap-4 border-4 border-brutal-black bg-brutal-blue px-10 py-5 font-mono text-lg font-bold uppercase tracking-widest text-brutal-white shadow-brutal transition hover:-translate-y-1 hover:bg-brutal-black"
          >
            Start assistant →
          </Link>
        </div>
      </section>
    </div>
  );
}
