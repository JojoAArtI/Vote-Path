import Hero from "@/components/Hero";
import Link from "next/link";

const capabilityBlocks = [
  {
    title: "What VotePath helps with",
    items: [
      "Eligibility and first-time voter guidance",
      "Polling booth navigation with map support",
      "Document and voter ID reminders",
      "A simple, neutral voting-day checklist"
    ]
  },
  {
    title: "Why it feels different",
    items: [
      "Designed like a real public-service product",
      "No political recommendations or persuasion",
      "Progress stays on your device only",
      "Mobile-friendly and keyboard-friendly by default"
    ]
  }
];

export default function HomePage() {
  return (
    <div className="pb-16">
      <Hero />

      <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Why it matters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A cleaner way to understand election day.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              VotePath reduces the voting process to a calm, practical sequence. You can ask for help, check the timeline, and look up a mock polling location without needing to navigate a noisy or biased experience.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Clarity for first-time voters",
                "Booth search without hidden steps",
                "Checklists that feel like a real prep tool",
                "Neutral language from start to finish"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {capabilityBlocks.map((block) => (
              <article key={block.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civicGreen-700">{block.title}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-civic-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
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

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <Link href="/assistant" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Assistant</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Get a personal voting path.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Answer a few questions and get neutral guidance tailored to your situation.</p>
          </Link>
          <Link href="/timeline" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civicGreen-700">Timeline</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">See the process in order.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Expand the steps from eligibility through results tracking.</p>
          </Link>
          <Link href="/map" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Map</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Find a mock booth near you.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Use your location, or fall back to a structured area search if permission is denied.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
