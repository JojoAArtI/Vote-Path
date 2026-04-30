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
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export default function VotingChecklist() {
  const [completeItems, setCompleteItems] = useState<string[]>([]);

  useEffect(() => {
    setCompleteItems(readStoredItems());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completeItems));
    }
  }, [completeItems]);

  const completedCount = useMemo(() => completeItems.length, [completeItems]);
  const allComplete = completedCount === checklistItems.length;

  function toggleItem(item: string) {
    setCompleteItems((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  }

  function resetChecklist() {
    setCompleteItems([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ember-600">Voting day checklist</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Keep the day calm and organized.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-ink-600">
            Tick each item as you prepare. The checklist stays local to your browser so it survives refresh without storing personal data on a server.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-black/10 bg-ink-900 p-5 text-paper-50 shadow-soft">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-paper-300">Completion</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-paper-50">
                {completedCount} / {checklistItems.length}
              </p>
              <p className="mt-1 text-sm text-paper-200">items complete</p>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ember-300">{allComplete ? "Ready" : "In progress"}</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ember-500 to-amber-200 transition-all duration-300"
              style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {checklistItems.map((item) => {
          const checked = completeItems.includes(item);

          return (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-4 rounded-[1.4rem] border px-4 py-4 transition hover:-translate-y-0.5 ${
                checked
                  ? "border-ember-200 bg-ember-50"
                  : "border-black/8 bg-paper-50 hover:border-ember-200 hover:bg-white"
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-ink-300 text-ember-600 focus:ring-ember-400"
                checked={checked}
                onChange={() => toggleItem(item)}
                aria-label={item}
              />
              <span className={`text-sm font-medium leading-6 ${checked ? "text-ink-900" : "text-ink-700"}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm font-medium ${allComplete ? "text-ember-700" : "text-ink-500"}`}>
          {allComplete ? "You are ready for voting day." : "Complete the items above before heading out."}
        </p>
        <button
          type="button"
          onClick={resetChecklist}
          className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition hover:-translate-y-0.5 hover:border-ember-300 hover:bg-ember-50"
        >
          Reset checklist
        </button>
      </div>
    </section>
  );
}
