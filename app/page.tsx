import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col lg:flex-row px-6 lg:px-12 pb-24">
      {/* LEFT COLUMN: Fixed or sticky on desktop */}
      <div className="w-full lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-5/12 pr-10 flex flex-col pt-10">
        <h1 className="text-6xl font-semibold tracking-tight text-[#111] sm:text-7xl">
          Ready to vote?
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#555]">
          Whether you need to check your eligibility, find your polling location, or just want to connect with a neutral guide—I'm here to assist you.
        </p>

        {/* Instead of a picture, a sleek form/card area */}
        <div className="mt-16 bg-[#1a1a1a] p-8 w-full h-[400px] rounded-sm relative overflow-hidden flex flex-col justify-end">
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
           {/* Abstract minimal element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 blur-3xl mix-blend-screen"></div>
           
           <div className="relative z-20">
             <Link href="/assistant" className="inline-block w-full py-4 bg-white text-center text-sm font-semibold tracking-widest text-[#111] hover:bg-[#eee] transition-colors">
               START ASSISTANT
             </Link>
           </div>
        </div>

        <div className="mt-12 flex flex-col space-y-4 text-sm text-[#555]">
          <div>
            <p className="font-semibold text-[#111]">Platform</p>
            <p>VotePath AI Copilot</p>
          </div>
          <div>
            <p className="font-semibold text-[#111]">Privacy</p>
            <p>Local-only data storage</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Scrollable */}
      <div className="w-full lg:w-7/12 pt-10 lg:pt-32 lg:pl-16 flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-[#555] text-xs font-semibold tracking-widest uppercase">
          <span className="w-1 h-1 rounded-full bg-[#111]"></span> Value
        </div>
        
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#111]">
            Why VotePath?
          </h2>
          <p className="text-[#555] text-sm max-w-xs text-right leading-relaxed hidden sm:block">
            More than just information—here's what I bring to your election day preparation.
          </p>
        </div>

        {/* Grids */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
          <div className="border-t border-[#e5e5e5] pt-6">
            <span className="text-[#888] text-xs font-semibold">/01</span>
            <h3 className="text-lg font-semibold text-[#111] mt-8 mb-3">Neutral Clarity</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              I turn complex voting regulations into clean, thoughtful steps that communicate clearly and effectively without bias.
            </p>
          </div>
          <div className="border-t border-[#e5e5e5] pt-6">
            <span className="text-[#888] text-xs font-semibold">/02</span>
            <h3 className="text-lg font-semibold text-[#111] mt-8 mb-3">Reliable Navigation</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              A smooth, transparent process is just as important as the final vote. I prioritize clear, timely guidance at every stage.
            </p>
          </div>
          <div className="border-t border-[#e5e5e5] pt-6">
            <span className="text-[#888] text-xs font-semibold">/03</span>
            <h3 className="text-lg font-semibold text-[#111] mt-8 mb-3">User-Focused Map</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              I approach every location search with privacy, always considering the user's journey, mindset, and experience.
            </p>
          </div>
          <div className="border-t border-[#e5e5e5] pt-6">
            <span className="text-[#888] text-xs font-semibold">/04</span>
            <h3 className="text-lg font-semibold text-[#111] mt-8 mb-3">Quality Over Everything</h3>
            <p className="text-[14px] text-[#555] leading-relaxed">
              I focus on detail and consistency to deliver guidance that not only looks great but also meets a high standard of excellence.
            </p>
          </div>
        </div>

        <div className="mt-40 flex items-center justify-center gap-2 mb-6 text-[#555] text-xs font-semibold tracking-widest uppercase">
          <span className="w-1 h-1 rounded-full bg-[#111]"></span> Expertise
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#111]">
            Core Capabilities
          </h2>
          <p className="text-[#555] text-sm mt-4">
            Here's what I've mastered over the years—and continue to evolve.
          </p>
        </div>

        {/* Stacked Capabilities */}
        <div className="relative w-full flex flex-col items-center justify-center py-20">
          <div className="text-center z-10 flex flex-col leading-[1.1] tracking-tighter mix-blend-difference font-bold text-5xl sm:text-7xl uppercase text-white/20">
             <span>VOTER ID CHECK</span>
             <span className="text-white">POLLING LOCATION</span>
             <span>ELECTION TIMELINE</span>
             <span>SECURE LOCAL DATA</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center -z-10">
             <div className="w-64 h-80 bg-[#222] rotate-[15deg] shadow-2xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

