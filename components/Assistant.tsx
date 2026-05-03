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
      <GsapReveal className="border-4 border-brutal-black bg-brutal-white p-6 sm:p-8 shadow-brutal">
        <span className="inline-block border-2 border-brutal-black bg-brutal-blue px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brutal-white">
          Interactive assistant
        </span>
        <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-brutal-black sm:text-4xl">
          Answer five questions.<br />Get your path.
        </h2>
        <p className="mt-4 max-w-xl text-sm font-medium leading-8 text-brutal-black/80">
          Rule-based and privacy-friendly. No political recommendations — just the practical civic steps that get you through election day.
        </p>

        {/* Progress card */}
        <div className="mt-6 border-4 border-brutal-black bg-brutal-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-brutal-blue">Progress</p>
              <p className="mt-2 text-lg font-bold text-brutal-black">{answeredCount} of 5 questions complete</p>
            </div>
            <p className="font-mono text-3xl font-bold text-brutal-black">{progressPercent}%</p>
          </div>
          <div className="mt-4 h-2 border-2 border-brutal-black bg-brutal-white">
            <div
              className="h-full bg-brutal-blue transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Transcript */}
        <div className="mt-6 space-y-4">
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`max-w-[90%] border-4 px-4 py-3 text-sm font-medium leading-7 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                entry.speaker === "assistant"
                  ? "border-brutal-black bg-brutal-white text-brutal-black"
                  : "ml-auto border-brutal-black bg-brutal-blue text-brutal-white"
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>

        {/* Covers */}
        <div className="mt-8 border-4 border-brutal-black bg-brutal-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-brutal-blue">What this covers</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Eligibility and first-time voter prep",
              "Documents and voter ID reminders",
              "Polling location and map guidance",
              "Simple voting-day step-by-step help"
            ].map((item) => (
              <div key={item} className="border-2 border-brutal-black bg-brutal-white px-3 py-2.5 text-xs font-bold text-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={resetAssistant}
            className="border-2 border-brutal-black bg-brutal-white px-5 py-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brutal-blue hover:text-brutal-white"
          >
            Start over
          </button>
        </div>
      </GsapReveal>

      {/* ── RIGHT PANEL ── */}
      <GsapReveal className="border-4 border-brutal-black bg-brutal-white p-6 sm:p-8 shadow-brutal">
        {question ? (
          <div className="space-y-6">
            <div>
              <span className="inline-block border-2 border-brutal-black bg-brutal-white px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Step {answeredCount + 1} of 5
              </span>
              <h3 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-brutal-black">
                {question.label}
              </h3>
              <p className="mt-3 text-base font-medium leading-7 text-brutal-black/80">{question.helperText}</p>
            </div>

            {question.type === "yesno" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Yes", value: "yes" as const },
                  { label: "No",  value: "no"  as const }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setYesNoAnswer(question.id, option.value)}
                    className="border-4 border-brutal-black bg-brutal-white px-5 py-5 text-left font-mono text-xl font-bold uppercase tracking-tight text-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-brutal-blue hover:text-brutal-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <label htmlFor="age" className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brutal-blue">
                  Enter your age
                </label>
                <div className="flex flex-col gap-4 sm:flex-row">
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
                    className="h-14 flex-1 border-4 border-brutal-black bg-brutal-white px-4 font-mono text-xl text-brutal-black placeholder-brutal-black/40 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition focus:outline-none focus:ring-4 focus:ring-brutal-blue"
                    placeholder="e.g. 24"
                  />
                  <button
                    type="button"
                    onClick={submitAge}
                    className="inline-flex h-14 items-center justify-center border-4 border-brutal-black bg-brutal-blue px-8 font-mono text-sm font-bold uppercase tracking-[0.22em] text-brutal-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Continue
                  </button>
                </div>
                <p id="age-help" className="text-xs font-bold text-brutal-black/70">
                  Used only to check whether voting guidance should mention eligibility.
                </p>
                {ageError && (
                  <p id="age-error" aria-live="polite" className="text-sm font-bold text-red-600">{ageError}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Guidance headline card */}
            <div className="border-4 border-brutal-black bg-brutal-blue p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-brutal-white">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em]">Your guidance</p>
              <h3 className="mt-3 font-mono text-3xl font-bold uppercase leading-tight tracking-tight">
                {guidance.headline}
              </h3>
              <p className="mt-4 text-base font-medium leading-7">{guidance.intro}</p>
            </div>

            {/* Guidance sections */}
            <div className="grid gap-5">
              {guidance.sections.map((section) => (
                <article key={section.title} className="border-4 border-brutal-black bg-brutal-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-brutal-black">{section.title}</h4>
                  <ul className="mt-4 space-y-3 text-sm font-medium leading-7 text-brutal-black/90">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none border border-brutal-black bg-brutal-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Tips */}
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              {[
                "Keep the checklist open while you prepare.",
                "Use the map if you need booth guidance.",
                "Share the assistant with someone who wants a neutral explanation.",
                "Return anytime if your voting details change."
              ].map((item) => (
                <div key={item} className="border-2 border-brutal-black bg-brutal-white px-4 py-4 text-xs font-bold leading-6 text-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
