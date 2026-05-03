"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "votepath.checklist.v1";

const checklistItems = [
  "Carry ID",
  "Confirm polling booth",
  "Check voting time",
  "Avoid political campaign material inside booth",
  "Stand in queue",
  "Verify name",
  "Cast vote",
  "Confirm completion"
];

function readStoredItems(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export default function VotingChecklist() {
  const [completeItems, setCompleteItems] = useState<string[]>([]);

  useEffect(() => { setCompleteItems(readStoredItems()); }, []);
  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completeItems));
  }, [completeItems]);

  const completedCount = useMemo(() => completeItems.length, [completeItems]);
  const allComplete = completedCount === checklistItems.length;

  function toggleItem(item: string) {
    setCompleteItems((curr) =>
      curr.includes(item) ? curr.filter((v) => v !== item) : [...curr, item]
    );
  }

  function resetChecklist() {
    setCompleteItems([]);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="border-4 border-brutal-black bg-brutal-white p-6 sm:p-8 shadow-brutal">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <span className="inline-block border-2 border-brutal-black bg-brutal-blue px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brutal-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Voting day checklist
          </span>
          <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-brutal-black sm:text-4xl">
            Keep the day<br />organised.
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-8 text-brutal-black/80">
            Tick each item as you prepare. Stays local to your browser — no server-side data.
          </p>
        </div>

        {/* Completion card */}
        <div className="border-4 border-brutal-black bg-brutal-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-brutal-blue">Completion</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-3xl font-bold text-brutal-black">
                {completedCount} <span className="text-brutal-black/50">/ {checklistItems.length}</span>
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brutal-black/70">items complete</p>
            </div>
            <p className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] ${allComplete ? "text-brutal-blue" : "text-brutal-black/50"}`}>
              {allComplete ? "Ready ✓" : "In progress"}
            </p>
          </div>
          <div className="mt-4 h-2 border-2 border-brutal-black bg-brutal-white">
            <div
              className="h-full bg-brutal-blue transition-all duration-300"
              style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {checklistItems.map((item) => {
          const checked = completeItems.includes(item);
          return (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-4 border-4 px-4 py-4 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-brutal ${
                checked
                  ? "border-brutal-black bg-brutal-blue text-brutal-white"
                  : "border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-gray"
              }`}
            >
              {/* Custom checkbox */}
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center border-2 border-brutal-black transition ${
                  checked
                    ? "bg-brutal-white text-brutal-blue"
                    : "bg-brutal-white"
                }`}
              >
                {checked && (
                  <svg viewBox="0 0 10 8" fill="none" className="h-4 w-4">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggleItem(item)}
                aria-label={item}
              />
              <span className={`text-sm font-bold leading-6 ${checked ? "line-through decoration-brutal-white/60" : ""}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>

      {/* Footer row */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t-4 border-brutal-black pt-6">
        <p className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] ${allComplete ? "text-brutal-blue" : "text-brutal-black/70"}`}>
          {allComplete ? "You are ready for voting day." : "Complete the items above before heading out."}
        </p>
        <button
          type="button"
          onClick={resetChecklist}
          className="border-2 border-brutal-black bg-brutal-white px-5 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brutal-blue hover:text-brutal-white"
        >
          Reset checklist
        </button>
      </div>
    </section>
  );
}
