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
    <section className="rounded-sm border border-white/[0.07] bg-void-50 p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
            Voting day checklist
          </span>
          <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl">
            Keep the day<br />organised.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-fog-400">
            Tick each item as you prepare. Stays local to your browser — no server-side data.
          </p>
        </div>

        {/* Completion card */}
        <div className="rounded-sm border border-white/[0.07] bg-void p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-fog-500">Completion</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-3xl font-bold text-fog-50">
                {completedCount} <span className="text-fog-500">/ {checklistItems.length}</span>
              </p>
              <p className="mt-1 text-xs text-fog-500">items complete</p>
            </div>
            <p className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] ${allComplete ? "text-ember-500" : "text-fog-500"}`}>
              {allComplete ? "Ready ✓" : "In progress"}
            </p>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-sm bg-white/10">
            <div
              className="h-full rounded-sm bg-ember-500 transition-all duration-300"
              style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="mt-8 grid gap-2 md:grid-cols-2">
        {checklistItems.map((item) => {
          const checked = completeItems.includes(item);
          return (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-4 rounded-sm border px-4 py-4 transition ${
                checked
                  ? "border-ember-500/30 bg-ember-500/[0.08]"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]"
              }`}
            >
              {/* Custom checkbox */}
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-sm border transition ${
                  checked
                    ? "border-ember-500 bg-ember-500 text-black"
                    : "border-white/[0.20] bg-transparent"
                }`}
              >
                {checked && (
                  <svg viewBox="0 0 10 8" fill="none" className="h-3 w-3">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <span className={`text-sm font-medium leading-6 ${checked ? "text-fog-300 line-through decoration-ember-500/60" : "text-fog-100"}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>

      {/* Footer row */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] ${allComplete ? "text-ember-500" : "text-fog-500"}`}>
          {allComplete ? "You are ready for voting day." : "Complete the items above before heading out."}
        </p>
        <button
          type="button"
          onClick={resetChecklist}
          className="rounded-sm border border-white/[0.10] px-5 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-fog-400 transition hover:border-white/25 hover:text-fog-100"
        >
          Reset checklist
        </button>
      </div>
    </section>
  );
}
