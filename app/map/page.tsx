import VotingMap from "@/components/VotingMap";

export default function MapPage() {
  return (
    <div className="bg-void">
      {/* Page header */}
      <div className="border-b border-white/[0.06] bg-void-50/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
            Map
          </span>
          <h1 className="mt-5 font-mono text-4xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-5xl">
            Find your booth.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-8 text-fog-400">
            Location-aware or manual entry. No data is stored — your location stays in the browser.
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <VotingMap />
      </div>
    </div>
  );
}
