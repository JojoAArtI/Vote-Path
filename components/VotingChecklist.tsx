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
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civicGreen-700">Voting day checklist</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Keep the day calm and organized.</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Tick each item as you prepare. The checklist stays local to your browser so it survives refresh without storing personal data on a server.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
          <div className="font-semibold text-slate-900">
            {completedCount} / {checklistItems.length} complete
          </div>
          <div className="mt-2 h-2 w-56 max-w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-civic-600 to-civicGreen-500 transition-all"
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
              className={`flex cursor-pointer items-center gap-4 rounded-3xl border px-4 py-4 transition hover:-translate-y-0.5 ${
                checked
                  ? "border-civicGreen-200 bg-civicGreen-50"
                  : "border-slate-200 bg-slate-50 hover:border-civic-300"
              }`}
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-300 text-civic-600 focus:ring-civic-400"
                checked={checked}
                onChange={() => toggleItem(item)}
                aria-label={item}
              />
              <span className={`text-base font-medium ${checked ? "text-civicGreen-900" : "text-slate-800"}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm font-medium ${allComplete ? "text-civicGreen-700" : "text-slate-500"}`}>
          {allComplete
            ? "You are ready for voting day."
            : "Complete the items above before heading out."}
        </p>
        <button
          type="button"
          onClick={resetChecklist}
          className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Reset checklist
        </button>
      </div>
    </section>
  );
}

