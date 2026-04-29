import Hero from "@/components/Hero";
import Link from "next/link";

const previewCards = [
  {
    title: "Interactive Assistant",
    description:
      "A neutral Q&A flow that adapts to age, first-time voting status, voter ID, polling location, and document help."
  },
  {
    title: "Election Timeline",
    description:
      "Expandable cards that map the process from eligibility checks to election-day completion and results tracking."
  },
  {
    title: "Voting Checklist",
    description:
      "A local-only checklist that helps users stay organized before leaving for the polling booth."
  }
];

export default function HomePage() {
  return (
    <div className="pb-16">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {previewCards.map((card) => (
            <article key={card.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">{card.title}</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{card.description}</p>
              <Link
                href={
                  card.title === "Interactive Assistant"
                    ? "/assistant"
                    : card.title === "Election Timeline"
                      ? "/timeline"
                      : "/timeline"
                }
                className="mt-5 inline-flex items-center text-sm font-semibold text-civic-800 transition hover:text-civic-700"
              >
                Open {card.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:grid-cols-3">
          {[
            "Click-to-consent geolocation",
            "Mock polling booths around you",
            "Graceful fallback when location or API key is unavailable"
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

