"use client";

import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";

export default function Hero() {
  const screenSize = useScreenSize();

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center border-b-4 border-brutal-black bg-brutal-white overflow-hidden">
      {/* Background Image from Unsplash */}
      <img
        src="https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1000&auto=format&fit=crop"
        alt="civic engagement"
        className="w-full h-full object-cover absolute inset-0 opacity-20 grayscale"
      />

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 40}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-brutal-blue"
        />
      </div>

      <div className="z-10 flex flex-col items-center text-center pointer-events-none p-4">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex w-fit items-center gap-2 border-2 border-brutal-black bg-brutal-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-brutal-black shadow-brutal pointer-events-auto">
          <span className="h-2 w-2 border border-brutal-black bg-brutal-blue" />
          Neutral civic flow
        </div>

        <h1 className="font-mono text-6xl sm:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tighter text-brutal-black mix-blend-hard-light max-w-4xl drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
          Know before<br />
          <span className="text-brutal-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)] bg-brutal-white px-4 border-4 border-brutal-black inline-block mt-4">you go.</span>
        </h1>
      </div>
    </section>
  );
}
