"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { label: "Districts covered",   value: "28+" },
  { label: "Steps to vote",       value: "5"   },
  { label: "Privacy first",       value: "100%" },
];

const features = [
  {
    num: "01",
    label: "Assistant",
    title: "Tailored voting path.",
    text:  "Answer a few questions. Get a path built for your exact situation.",
    href:  "/assistant",
  },
  {
    num: "02",
    label: "Timeline",
    title: "Every step. In order.",
    text:  "Eligibility → registration → booth → results, laid out clearly.",
    href:  "/timeline",
  },
  {
    num: "03",
    label: "Map",
    title: "Find your booth.",
    text:  "Browser geolocation or manual entry — no noisy UX.",
    href:  "/map",
  },
];

export default function Hero() {
  const shellRef  = useRef<HTMLDivElement | null>(null);
  const itemsRef  = useRef<HTMLElement[]>([]);
  const orbRef1   = useRef<HTMLDivElement | null>(null);
  const orbRef2   = useRef<HTMLDivElement | null>(null);
  const orbRef3   = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      gsap.set(items, { y: 30, opacity: 0 });
      gsap.to(items, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" });

      // orb floats
      [orbRef1, orbRef2, orbRef3].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          y:        i % 2 === 0 ? -18 : -12,
          duration: 3.8 + i * 0.5,
          ease:     "sine.inOut",
          repeat:   -1,
          yoyo:     true,
          delay:    i * 0.3,
        });
      });
    }, shell);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={shellRef} className="relative overflow-hidden bg-void">
      {/* Background glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(244,127,31,0.22)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,127,31,0.08)_0%,transparent_70%)]" />
        {/* Speed lines (diagonal) */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.018)_31%,transparent_32%),linear-gradient(105deg,transparent_50%,rgba(255,255,255,0.012)_51%,transparent_52%),linear-gradient(105deg,transparent_68%,rgba(255,255,255,0.008)_69%,transparent_70%)]" />
      </div>

      {/* ── HERO MAIN ── */}
      <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-8">

          {/* LEFT: Text */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              ref={(n) => { if (n) itemsRef.current[0] = n; }}
              className="inline-flex w-fit items-center gap-2 rounded-sm border border-ember/30 bg-ember/10 px-4 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.32em] text-ember"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
              Neutral civic flow
            </div>

            {/* H1 */}
            <h1
              ref={(n) => { if (n) itemsRef.current[1] = n; }}
              className="mt-8 max-w-2xl font-mono text-5xl font-bold uppercase leading-[1.05] tracking-tight text-fog-50 sm:text-6xl lg:text-[4.5rem]"
            >
              Know before<br />
              <span className="text-ember">you go.</span>
            </h1>

            {/* Sub */}
            <p
              ref={(n) => { if (n) itemsRef.current[2] = n; }}
              className="mt-6 max-w-lg text-base leading-8 text-fog-400"
            >
              Understand your eligibility, find your polling booth, and move through election day with clarity — not confusion.
            </p>

            {/* CTAs */}
            <div
              ref={(n) => { if (n) itemsRef.current[3] = n; }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 rounded-sm bg-ember px-7 py-3.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
              >
                Start assistant →
              </Link>
              <Link
                href="/timeline"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-7 py-3.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-fog-300 transition hover:border-white/25 hover:text-fog-100"
              >
                View timeline
              </Link>
            </div>

            {/* Stats bar */}
            <div
              ref={(n) => { if (n) itemsRef.current[4] = n; }}
              className="mt-14 flex items-center gap-6 border-t border-white/[0.07] pt-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-mono text-xl font-bold text-fog-50">{s.value}</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-fog-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual card + orbs */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            {/* Floating orb 1 – large */}
            <div
              ref={orbRef1}
              className="absolute -right-8 top-4 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,213,120,0.95),rgba(244,127,31,0.80)_45%,rgba(90,40,5,0.95)_100%)] shadow-orange-glow"
            />
            {/* Floating orb 2 – smaller */}
            <div
              ref={orbRef2}
              className="absolute right-24 top-32 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,230,160,0.98),rgba(244,127,31,0.72)_42%,rgba(80,35,5,0.95)_100%)] shadow-orange-glow"
            />
            {/* Floating orb 3 – accent */}
            <div
              ref={orbRef3}
              className="absolute -right-4 top-48 h-14 w-14 rounded-full bg-ember/60 blur-sm"
            />

            {/* Glass card */}
            <div
              ref={(n) => { if (n) itemsRef.current[5] = n; }}
              className="relative z-10 w-full max-w-sm rounded-sm border border-white/[0.08] bg-white/[0.04] p-6 shadow-card backdrop-blur-xl"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.36em] text-fog-500">Live system</p>
              <p className="mt-3 font-mono text-3xl font-bold text-fog-50">28 districts</p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-ember">currently using the guide</p>

              <div className="mt-6 space-y-3">
                {features.map((f) => (
                  <Link
                    key={f.num}
                    href={f.href}
                    className="group flex items-start gap-4 rounded-sm border border-white/[0.06] bg-white/[0.03] p-4 transition hover:border-ember/30 hover:bg-ember/[0.06]"
                  >
                    <span className="font-mono text-[0.6rem] font-bold tracking-widest text-fog-500">{f.num}</span>
                    <div>
                      <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ember">{f.label}</p>
                      <p className="mt-1 text-sm font-semibold text-fog-100">{f.title}</p>
                      <p className="mt-1 text-[0.72rem] leading-5 text-fog-500">{f.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TICKER / Partner bar ── */}
      <div className="relative mt-20 border-t border-white/[0.07] bg-void-50/60 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto">
          <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ember">Tools →</span>
          {["Eligibility Check", "Registration Guide", "Polling Booth Finder", "Document Checklist", "Step Timeline", "Browser-Local Only"].map((item) => (
            <span
              key={item}
              className="shrink-0 rounded-sm border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-fog-400"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
