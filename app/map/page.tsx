import VotingMap from "@/components/VotingMap";

export default function MapPage() {
  return (
    <div className="bg-brutal-white">
      {/* Page header */}
      <div className="border-b-4 border-brutal-black bg-brutal-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block border-2 border-brutal-black bg-brutal-blue px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brutal-white shadow-brutal">
            Map
          </span>
          <h1 className="mt-8 font-mono text-4xl font-bold uppercase leading-[1] tracking-tighter text-brutal-black sm:text-5xl">
            Find your booth.
          </h1>
          <p className="mt-4 max-w-xl text-sm font-medium leading-8 text-brutal-black/90">
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
