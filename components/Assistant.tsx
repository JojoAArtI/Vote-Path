"use client";

import { useEffect, useMemo, useState } from "react";
import { GsapReveal } from "@/components/GsapReveal";
import {
  AssistantAnswers,
  deriveGuidance,
  getAnsweredCount,
  getNextQuestion,
  getYesNoLabel,
  YesNo
} from "@/lib/electionLogic";

const STORAGE_KEY = "votepath.assistant.v1";

type TranscriptEntry = {
  id: string;
  speaker: "assistant" | "user";
  text: string;
};

const initialAnswers: AssistantAnswers = {};

export default function Assistant() {
  const [answers, setAnswers] = useState<AssistantAnswers>(initialAnswers);
  const [ageInput, setAgeInput] = useState("");
  const [ageError, setAgeError] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AssistantAnswers;
      setAnswers(parsed);
      setAgeInput(typeof parsed.age === "number" ? String(parsed.age) : "");
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    if (typeof answers.age === "number") setAgeInput(String(answers.age));
  }, [answers]);

  const question = getNextQuestion(answers);
  const guidance = useMemo(() => deriveGuidance(answers), [answers]);
  const answeredCount = getAnsweredCount(answers);
  const progressPercent = Math.round((answeredCount / 5) * 100);

  const transcript = useMemo<TranscriptEntry[]>(() => {
    const entries: TranscriptEntry[] = [
      { id: "intro-1", speaker: "assistant", text: "I will ask five short questions and then give you a neutral voting guide." }
    ];
    if (answers.firstTimeVoter) entries.push({ id: "first-time", speaker: "user", text: `First-time voter: ${getYesNoLabel(answers.firstTimeVoter)}` });
    if (typeof answers.age === "number") entries.push({ id: "age", speaker: "user", text: `Age: ${answers.age}` });
    if (answers.hasVoterId) entries.push({ id: "voter-id", speaker: "user", text: `Already have voter ID: ${getYesNoLabel(answers.hasVoterId)}` });
    if (answers.knowsPollingLocation) entries.push({ id: "polling-location", speaker: "user", text: `Know polling location: ${getYesNoLabel(answers.knowsPollingLocation)}` });
    if (answers.needsDocumentHelp) entries.push({ id: "documents", speaker: "user", text: `Need document help: ${getYesNoLabel(answers.needsDocumentHelp)}` });
    return entries;
  }, [answers]);

  function setYesNoAnswer(key: keyof AssistantAnswers, value: YesNo) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submitAge() {
    const parsed = Number(ageInput);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 120) {
      setAgeError("Please enter a valid age between 0 and 120.");
      return;
    }
    setAgeError("");
    setAnswers((current) => ({ ...current, age: parsed }));
  }

  function resetAssistant() {
    setAnswers(initialAnswers);
    setAgeInput("");
    setAgeError("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      {/* ── LEFT PANEL ── */}
      <GsapReveal className="rounded-sm border border-white/[0.07] bg-void-50 p-6 sm:p-8">
        <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
          Interactive assistant
        </span>
        <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl">
          Answer five questions.<br />Get your path.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-8 text-fog-400">
          Rule-based and privacy-friendly. No political recommendations — just the practical civic steps that get you through election day.
        </p>

        {/* Progress card */}
        <div className="mt-6 rounded-sm border border-white/[0.07] bg-void p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-fog-500">Progress</p>
              <p className="mt-2 text-lg font-semibold text-fog-50">{answeredCount} of 5 questions complete</p>
            </div>
            <p className="font-mono text-2xl font-bold text-ember-500">{progressPercent}%</p>
          </div>
          <div className="mt-4 h-1.5 rounded-sm bg-white/10">
            <div
              className="h-1.5 rounded-sm bg-ember-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Transcript */}
        <div className="mt-6 space-y-3">
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`max-w-[90%] rounded-sm px-4 py-3 text-sm leading-7 ${
                entry.speaker === "assistant"
                  ? "border border-white/[0.07] bg-white/[0.04] text-fog-300"
                  : "ml-auto border border-ember-500/20 bg-ember-500/10 text-fog-100"
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>

        {/* Covers */}
        <div className="mt-8 rounded-sm border border-white/[0.07] bg-void p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ember-500">What this covers</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Eligibility and first-time voter prep",
              "Documents and voter ID reminders",
              "Polling location and map guidance",
              "Simple voting-day step-by-step help"
            ].map((item) => (
              <div key={item} className="rounded-sm border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-fog-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={resetAssistant}
            className="rounded-sm border border-white/[0.10] px-5 py-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-fog-400 transition hover:border-white/25 hover:text-fog-100"
          >
            Start over
          </button>
        </div>
      </GsapReveal>

      {/* ── RIGHT PANEL ── */}
      <GsapReveal className="rounded-sm border border-white/[0.07] bg-void-50 p-6 sm:p-8">
        {question ? (
          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
                Step {answeredCount + 1} of 5
              </span>
              <h3 className="mt-5 font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-fog-50">
                {question.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-fog-400">{question.helperText}</p>
            </div>

            {question.type === "yesno" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Yes", value: "yes" as const },
                  { label: "No",  value: "no"  as const }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setYesNoAnswer(question.id, option.value)}
                    className="rounded-sm border border-white/[0.08] bg-white/[0.04] px-5 py-5 text-left font-mono text-lg font-bold uppercase tracking-tight text-fog-100 transition hover:border-ember-500/40 hover:bg-ember-500/[0.08] hover:text-ember-400"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <label htmlFor="age" className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-fog-400">
                  Enter your age
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="age"
                    type="number"
                    min={0}
                    max={120}
                    inputMode="numeric"
                    aria-invalid={ageError ? "true" : "false"}
                    aria-describedby={ageError ? "age-error" : "age-help"}
                    value={ageInput}
                    onChange={(e) => { setAgeInput(e.target.value); setAgeError(""); }}
                    className="h-12 flex-1 rounded-sm border border-white/[0.10] bg-white/[0.04] px-4 font-mono text-base text-fog-50 placeholder-fog-600 transition focus:border-ember-500/60 focus:outline-none"
                    placeholder="e.g. 24"
                  />
                  <button
                    type="button"
                    onClick={submitAge}
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-ember-500 px-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
                  >
                    Continue
                  </button>
                </div>
                <p id="age-help" className="text-xs text-fog-500">
                  Used only to check whether voting guidance should mention eligibility.
                </p>
                {ageError && (
                  <p id="age-error" className="text-xs font-medium text-red-400">{ageError}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {/* Guidance headline card */}
            <div className="rounded-sm border border-ember-500/20 bg-ember-500/[0.07] p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ember-500">Your guidance</p>
              <h3 className="mt-3 font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-fog-50">
                {guidance.headline}
              </h3>
              <p className="mt-3 text-sm leading-7 text-fog-300">{guidance.intro}</p>
            </div>

            {/* Guidance sections */}
            <div className="grid gap-4">
              {guidance.sections.map((section) => (
                <article key={section.title} className="rounded-sm border border-white/[0.07] bg-white/[0.03] p-5">
                  <h4 className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-fog-100">{section.title}</h4>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-fog-400">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Tips */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Keep the checklist open while you prepare.",
                "Use the map if you need booth guidance.",
                "Share the assistant with someone who wants a neutral explanation.",
                "Return anytime if your voting details change."
              ].map((item) => (
                <div key={item} className="rounded-sm border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-xs leading-7 text-fog-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </GsapReveal>
    </section>
  );
}
