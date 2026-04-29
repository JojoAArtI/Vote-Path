"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { GLSLHills } from "@/components/ui/glsl-hills";

const highlightCards = [
  {
    title: "Neutral guidance",
    text: "Clear, civic-focused steps that keep the process simple from eligibility to voting day."
  },
  {
    title: "Location-aware map",
    text: "Click to share location, view mock booths near you, and understand the journey before you leave."
  },
  {
    title: "Privacy-first flow",
    text: "Progress stays local in the browser. No personal data is stored on a server."
  }
];

const capabilityRows = [
  {
    label: "Assistant",
    title: "Answer a few questions, get a practical vote path.",
    text: "Age, voter ID, first-time voter status, polling location knowledge, and document help all shape the guidance."
  },
  {
    label: "Timeline",
    title: "See the election process as a simple sequence.",
    text: "Expandable cards explain what happens before registration, during voting day, and after the results are tracked."
  },
  {
    label: "Checklist",
    title: "Tick the items that matter before you head out.",
    text: "The checklist keeps the routine calm: ID, booth, timing, queue, name verification, and completion."
  }
];

export default function Hero() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const glow = glowRef.current;

    if (!shell || !left || !right || !glow) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const rect = shell.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const x = gsap.utils.clamp(-18, 18, offsetX / 18);
      const y = gsap.utils.clamp(-14, 14, offsetY / 18);
      xTo(x);
      yTo(y);
      rotateTo(x / 8);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
      rotateTo(0);
    };

    const xTo = gsap.quickTo(right, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(right, "y", { duration: 0.8, ease: "power3.out" });
    const rotateTo = gsap.quickTo(right, "rotate", { duration: 0.8, ease: "power3.out" });

    shell.addEventListener("mousemove", handleMove);
    shell.addEventListener("mouseleave", handleLeave);

    const ctx = gsap.context(() => {
      const heroItems = shell.querySelectorAll<HTMLElement>("[data-hero-item]");
      const rightCards = shell.querySelectorAll<HTMLElement>("[data-right-card]");

      gsap.set([left, right], { opacity: 0 });
      gsap.set(glow, { scale: 0.85, opacity: 0.55 });
      gsap.set(heroItems, { y: 24, opacity: 0 });
      gsap.set(rightCards, { y: 18, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(left, { opacity: 1, duration: 0.4 })
        .to(right, { opacity: 1, duration: 0.5 }, "<")
        .to(glow, { scale: 1, opacity: 1, duration: 1.2 }, "<")
        .to(heroItems, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, "-=0.1")
        .to(rightCards, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.45");

      gsap.to(glow, {
        y: 18,
        rotate: 3,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      rightCards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -10 : -6,
          duration: 3.5 + index * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });
    }, shell);

    return () => {
      shell.removeEventListener("mousemove", handleMove);
      shell.removeEventListener("mouseleave", handleLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div
        ref={shellRef}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)]"
      >
        <div className="grid min-h-[min(100dvh,980px)] lg:grid-cols-[1.04fr_0.96fr]">
          <div
            ref={leftRef}
            className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,136,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(22,168,116,0.10),transparent_32%)]" />

            <div className="relative z-10">
              <div
                data-hero-item
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-civicGreen-500" />
                Neutral election guidance, maps, and checklists
              </div>

              <div className="mt-8 max-w-3xl">
                <p data-hero-item className="text-sm font-semibold uppercase tracking-[0.28em] text-civic-700">
                  VotePath
                </p>
                <h1 data-hero-item className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  Your Election Day Copilot.
                </h1>
                <p data-hero-item className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Understand the election process, find your polling area, and follow every voting step with confidence.
                </p>
              </div>

              <div data-hero-item className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/assistant"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Start Assistant
                </Link>
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-civic-300 hover:text-civic-800"
                >
                  Find Voting Location
                </Link>
              </div>

              <div data-hero-item className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlightCards.map((card) => (
                  <article key={card.title} data-hero-item className="rounded-[1.6rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div data-hero-item className="relative z-10 mt-10 grid gap-4 border-t border-slate-200/80 pt-6 sm:grid-cols-3">
              {["No political recommendations", "Local-only progress storage", "Maps load only after click"].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="relative overflow-hidden bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,136,255,0.20),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(22,168,116,0.12),transparent_30%)]" />
            <div ref={glowRef} className="absolute inset-0">
              <GLSLHills width="100%" height="100%" cameraZ={118} planeSize={220} speed={0.42} />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.48)_100%)]" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-6 sm:p-8">
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                Civic-tech interface
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-md lg:block">
                Google Maps + Browser Geolocation
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Today&apos;s flow</p>
                  <div className="mt-4 space-y-3">
                    {["Check eligibility", "Confirm voter details", "Find your polling booth", "Carry documents", "Vote and confirm completion"].map(
                      (item, index) => (
                        <div key={item} data-right-card className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-white/90">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Core capabilities</p>
                  <div className="mt-4 space-y-3">
                    {capabilityRows.map((row, index) => (
                      <article key={row.label} data-right-card className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{row.label}</p>
                          <span className="text-xs text-white/45">/0{index + 1}</span>
                        </div>
                        <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">{row.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-white/72">{row.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
