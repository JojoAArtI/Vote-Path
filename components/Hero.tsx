import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-civic-200 bg-civic-50 px-4 py-2 text-sm font-medium text-civic-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-civicGreen-500" />
            Neutral election guidance for voting day
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            VotePath — Your Election Day Copilot
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Understand the election process, find your polling area, and follow every voting step with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/assistant"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start Assistant
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-civic-300 hover:text-civic-800"
            >
              Find Voting Location
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-slate-200">No political recommendations</span>
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-slate-200">Local-only progress storage</span>
            <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-slate-200">Maps load only after click</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-civic-100/80 via-white to-civicGreen-100/80 blur-3xl" />
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/70 backdrop-blur">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-inner">
              <p className="text-sm text-slate-300">Today&apos;s flow</p>
              <div className="mt-5 space-y-4">
                {[
                  "Check if you are eligible",
                  "Confirm your voter ID details",
                  "Find your polling booth",
                  "Carry the right documents",
                  "Vote and confirm completion"
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-civic-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-civic-50 p-4 ring-1 ring-civic-100">
                <p className="text-sm font-semibold text-civic-800">Assistant</p>
                <p className="mt-1 text-sm text-slate-600">Rule-based guidance tailored to the answers you give.</p>
              </div>
              <div className="rounded-2xl bg-civicGreen-50 p-4 ring-1 ring-civicGreen-100">
                <p className="text-sm font-semibold text-civicGreen-800">Map</p>
                <p className="mt-1 text-sm text-slate-600">Browser location and mock booths generated near you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

