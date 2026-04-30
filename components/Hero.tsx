"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const capabilityRows = [
  {
    label: "Assistant",
    title: "Answer a few questions, get a practical voting path.",
    text: "Age, voter ID, first-time voter status, polling location knowledge, and document help shape the guidance."
  },
  {
    label: "Timeline",
    title: "See the process as a clear sequence.",
    text: "Eligibility, registration, location, documents, and completion are broken into calm, readable steps."
  },
  {
    label: "Map",
    title: "Find a booth without a noisy experience.",
    text: "Click to share location, view mock booths near you, and fall back to manual area entry when needed."
  }
];

const proofPoints = [
  "Neutral guidance from first click to completion.",
  "Local storage only, no server-side profile.",
  "Designed for mobile-first election-day use."
];

const partnerMarks = ["Eligibility", "Location", "Checklist", "Timeline", "Booths"];

export default function Hero() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const heroItemsRef = useRef<HTMLElement[]>([]);
  const floaterRefs = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = heroItemsRef.current.filter(Boolean);
      const floaters = floaterRefs.current.filter(Boolean);

      gsap.set(items, { y: 22, opacity: 0 });
      gsap.set(floaters, { y: 18, opacity: 0, scale: 0.95 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(items, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }).to(
        floaters,
        { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.08 },
        "-=0.45"
      );

      floaters.forEach((floater, index) => {
        gsap.to(floater, {
          y: index % 2 === 0 ? -10 : -14,
          duration: 3.6 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });
    }, shell);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div
        ref={shellRef}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-black/10 bg-paper-50 shadow-panel"
      >
        <div className="grid min-h-[min(100dvh,960px)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#fbf7f0_0%,#f6efe4_100%)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,127,31,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(69,44,21,0.08),transparent_34%)]" />
            <div className="relative z-10">
              <div
                ref={(node) => {
                  if (node) heroItemsRef.current[0] = node;
                }}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-ink-500 shadow-soft"
              >
                <span className="h-2 w-2 rounded-full bg-ember-500" />
                Neutral election guidance, maps, and checklists
              </div>

              <div className="mt-8 max-w-3xl">
                <p
                  ref={(node) => {
                    if (node) heroItemsRef.current[1] = node;
                  }}
                  className="font-mono text-[0.72rem] uppercase tracking-[0.34em] text-ink-400"
                >
                  VotePath
                </p>
                <h1
                  ref={(node) => {
                    if (node) heroItemsRef.current[2] = node;
                  }}
                  className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
                >
                  A cleaner path through election day.
                </h1>
                <p
                  ref={(node) => {
                    if (node) heroItemsRef.current[3] = node;
                  }}
                  className="mt-6 max-w-2xl text-base leading-8 text-ink-600 sm:text-lg"
                >
                  Understand eligibility, find your polling booth, and move through voting day with a calm, step-by-step interface instead of a crowded civic dashboard.
                </p>
              </div>

              <div
                ref={(node) => {
                  if (node) heroItemsRef.current[4] = node;
                }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/assistant"
                  className="inline-flex items-center justify-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-paper-50 transition hover:-translate-y-0.5 hover:bg-ink-800"
                >
                  Start assistant
                </Link>
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition hover:-translate-y-0.5 hover:border-ember-300 hover:bg-ember-50"
                >
                  Find a booth
                </Link>
                <Link
                  href="/timeline"
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-ink-500 transition hover:-translate-y-0.5 hover:text-ink-900"
                >
                  View timeline
                </Link>
              </div>

              <div
                ref={(node) => {
                  if (node) heroItemsRef.current[5] = node;
                }}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {proofPoints.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-black/8 bg-white/80 p-4 text-sm leading-6 text-ink-600 shadow-soft">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={(node) => {
                if (node) heroItemsRef.current[6] = node;
              }}
              className="relative z-10 mt-10 grid gap-3 border-t border-black/8 pt-6 md:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="rounded-[1.6rem] border border-black/8 bg-white/70 p-5 shadow-soft">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ink-400">What it covers</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Eligibility", "Registration", "Polling booth", "Documents", "Completion"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink-200 bg-paper-50 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-black/8 bg-ink-900 p-5 text-paper-50 shadow-soft">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-paper-300">Privacy posture</p>
                <p className="mt-3 text-sm leading-7 text-paper-200">
                  Progress stays inside the browser, so users can move through the flow without creating a server-side profile.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-ink-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(244,127,31,0.32),transparent_16%),radial-gradient(circle_at_18%_72%,rgba(255,200,128,0.16),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))]" />

            <div className="absolute inset-0 opacity-90">
              <div className="absolute left-[-10%] top-[15%] h-[44rem] w-[44rem] rounded-full border border-white/12" />
              <div className="absolute right-[-14%] top-[3%] h-[34rem] w-[34rem] rounded-full border border-white/10" />
              <div className="absolute bottom-[-18%] right-[-8%] h-[24rem] w-[24rem] rounded-full border border-ember-400/18" />
              <div className="absolute left-[8%] top-[18%] h-[1px] w-[78%] bg-gradient-to-r from-transparent via-white/35 to-transparent rotate-12" />
              <div className="absolute left-[4%] top-[31%] h-[1px] w-[82%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12" />
              <div className="absolute left-[2%] top-[43%] h-[1px] w-[86%] bg-gradient-to-r from-transparent via-white/12 to-transparent rotate-12" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div
                  ref={(node) => {
                    if (node) floaterRefs.current[0] = node;
                  }}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-paper-100 backdrop-blur-md"
                >
                  28 districts currently using the guide
                </div>
                <div
                  ref={(node) => {
                    if (node) floaterRefs.current[1] = node;
                  }}
                  className="hidden rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-paper-100 backdrop-blur-md lg:block"
                >
                  Google Maps + browser geolocation
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[34rem] flex-1 items-center justify-center">
                <div
                  ref={(node) => {
                    if (node) floaterRefs.current[2] = node;
                  }}
                  className="absolute left-8 top-10 h-28 w-28 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,213,164,0.95),rgba(244,127,31,0.75)_45%,rgba(68,34,10,0.95)_100%)] shadow-[0_0_80px_rgba(244,127,31,0.22)]"
                />
                <div
                  ref={(node) => {
                    if (node) floaterRefs.current[3] = node;
                  }}
                  className="absolute right-6 top-28 h-20 w-20 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,220,183,0.98),rgba(244,127,31,0.7)_42%,rgba(76,35,10,0.95)_100%)] shadow-[0_0_70px_rgba(244,127,31,0.18)]"
                />

                <div className="relative w-full rounded-[2rem] border border-white/10 bg-white/6 p-5 text-paper-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.34em] text-paper-300">Current mode</p>
                  <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight text-paper-50">
                    Power your civic flow with a quiet, structured path.
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-paper-200">
                    Every surface here is designed to reduce confusion, keep the process neutral, and make each step feel obvious on desktop or mobile.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {capabilityRows.map((row, index) => (
                      <article
                        key={row.label}
                        ref={(node) => {
                          if (node) floaterRefs.current[index + 4] = node;
                        }}
                        className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-paper-300">{row.label}</p>
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-paper-400">/0{index + 1}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold tracking-tight text-paper-50">{row.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-paper-200">{row.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4 text-paper-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-paper-300">Transaction value</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-paper-50">$45,409,115,424</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4 text-paper-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-paper-300">Coverage</p>
                  <p className="mt-2 text-sm leading-7 text-paper-200">
                    One assistant, one route timeline, and one location finder, arranged for faster decision making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/8 bg-white/75 px-6 py-5 sm:px-10">
          <div className="flex flex-wrap items-center gap-3">
            {partnerMarks.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/8 bg-paper-50 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-ink-500"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
