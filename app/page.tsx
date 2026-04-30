import Link from "next/link";
import Hero from "@/components/Hero";
import { GsapReveal } from "@/components/GsapReveal";

const proofColumns = [
  {
    title: "Built for clarity",
    text: "VotePath uses a quiet visual system, crisp labels, and a linear flow so people can move without second-guessing the interface."
  },
  {
    title: "Built for neutrality",
    text: "There are no recommendations, no persuasion hooks, and no political framing, only practical help for election-day preparation."
  },
  {
    title: "Built for privacy",
    text: "Progress stays local in the browser, which keeps the experience lightweight and reduces the need to hand over personal data."
  }
];

const routeCards = [
  {
    href: "/assistant",
    label: "Assistant",
    title: "Get a tailored voting path.",
    text: "Answer a few short questions and the guide adapts to your voting setup."
  },
  {
    href: "/timeline",
    label: "Timeline",
    title: "See the process in order.",
    text: "Eligibility, registration, documents, the booth, and results are laid out step by step."
  },
  {
    href: "/map",
    label: "Map",
    title: "Find the booth before you leave.",
    text: "Use browser geolocation or manual area entry to explore mock polling locations."
  }
];

export default function HomePage() {
  return (
    <div className="pb-12">
      <Hero />

      <GsapReveal className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article
            data-gsap-item
            className="rounded-[2rem] border border-black/10 bg-paper-50 p-6 shadow-soft sm:p-8"
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ink-400">Why it matters</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
              A calmer way to understand election day.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink-600">
              VotePath reduces the voting process to a quiet sequence. You can ask for help, check the timeline, and look up a mock polling location without navigating a noisy or persuasive experience.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {proofColumns.map((block) => (
                <div
                  key={block.title}
                  className="rounded-[1.4rem] border border-black/8 bg-white px-4 py-3 text-sm font-medium text-ink-700 shadow-soft"
                >
                  {block.title}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            <article
              data-gsap-item
              className="rounded-[2rem] border border-black/10 bg-ink-900 p-6 text-paper-50 shadow-soft sm:p-8"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-paper-300">What you get</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-paper-50">
                Three surfaces, one consistent path.
              </h3>
              <p className="mt-4 text-sm leading-7 text-paper-200">
                The assistant, timeline, and map pages all keep the same visual language, so users do not need to relearn the interface as they move through the flow.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {proofColumns.slice(1).map((block) => (
                <article
                  key={block.title}
                  data-gsap-item
                  className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-soft sm:p-7"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ember-600">{block.title}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-600">{block.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </GsapReveal>

      <GsapReveal className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={routeCards[0].href}
            data-gsap-item
            className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 sm:p-8"
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ember-600">{routeCards[0].label}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">{routeCards[0].title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-600">{routeCards[0].text}</p>
          </Link>

          <div className="grid gap-4">
            {routeCards.slice(1).map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                data-gsap-item
                className={`rounded-[2rem] border border-black/10 p-6 shadow-soft transition hover:-translate-y-0.5 sm:p-8 ${
                  index === 0 ? "bg-ink-900 text-paper-50" : "bg-paper-50 text-ink-900"
                }`}
              >
                <p className={`font-mono text-[0.68rem] uppercase tracking-[0.32em] ${index === 0 ? "text-paper-300" : "text-ember-600"}`}>
                  {card.label}
                </p>
                <h3 className={`mt-3 text-2xl font-semibold tracking-tight ${index === 0 ? "text-paper-50" : "text-ink-900"}`}>
                  {card.title}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-paper-200" : "text-ink-600"}`}>
                  {card.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </GsapReveal>
    </div>
  );
}
