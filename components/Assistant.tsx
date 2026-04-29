"use client";

import { useEffect, useMemo, useState } from "react";
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
    if (!raw) {
      return;
    }

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
    if (typeof answers.age === "number") {
      setAgeInput(String(answers.age));
    }
  }, [answers]);

  const question = getNextQuestion(answers);
  const guidance = useMemo(() => deriveGuidance(answers), [answers]);
  const answeredCount = getAnsweredCount(answers);
  const progressPercent = Math.round((answeredCount / 5) * 100);

  const transcript = useMemo<TranscriptEntry[]>(() => {
    const entries: TranscriptEntry[] = [
      {
        id: "intro-1",
        speaker: "assistant",
        text: "I will ask five short questions and then give you a neutral voting guide."
      }
    ];

    if (answers.firstTimeVoter) {
      entries.push({
        id: "first-time",
        speaker: "user",
        text: `First-time voter: ${getYesNoLabel(answers.firstTimeVoter)}`
      });
    }

    if (typeof answers.age === "number") {
      entries.push({
        id: "age",
        speaker: "user",
        text: `Age: ${answers.age}`
      });
    }

    if (answers.hasVoterId) {
      entries.push({
        id: "voter-id",
        speaker: "user",
        text: `Already have voter ID: ${getYesNoLabel(answers.hasVoterId)}`
      });
    }

    if (answers.knowsPollingLocation) {
      entries.push({
        id: "polling-location",
        speaker: "user",
        text: `Know polling location: ${getYesNoLabel(answers.knowsPollingLocation)}`
      });
    }

    if (answers.needsDocumentHelp) {
      entries.push({
        id: "documents",
        speaker: "user",
        text: `Need document help: ${getYesNoLabel(answers.needsDocumentHelp)}`
      });
    }

    return entries;
  }, [answers]);

  function setYesNoAnswer(key: keyof AssistantAnswers, value: YesNo) {
    setAnswers((current) => ({
      ...current,
      [key]: value
    }));
  }

  function submitAge() {
    const parsed = Number(ageInput);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 120) {
      setAgeError("Please enter a valid age between 0 and 120.");
      return;
    }

    setAgeError("");
    setAnswers((current) => ({
      ...current,
      age: parsed
    }));
  }

  function resetAssistant() {
    setAnswers(initialAnswers);
    setAgeInput("");
    setAgeError("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Interactive assistant</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Answer a few questions for tailored guidance.</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          The assistant is rule-based, privacy-friendly, and focused on the civic process only. It does not make political recommendations.
        </p>

        <div className="mt-6 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Progress</p>
              <p className="text-lg font-semibold text-slate-900">
                {answeredCount} of 5 questions complete
              </p>
            </div>
            <p className="text-lg font-semibold text-civic-800">{progressPercent}%</p>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-civic-600 to-civicGreen-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                entry.speaker === "assistant"
                  ? "bg-civic-50 text-slate-700 ring-1 ring-civic-100"
                  : "ml-auto bg-slate-900 text-white"
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetAssistant}
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        {question ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civicGreen-700">
                Step {answeredCount + 1} of 5
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{question.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{question.helperText}</p>
            </div>

            {question.type === "yesno" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Yes", value: "yes" as const },
                  { label: "No", value: "no" as const }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setYesNoAnswer(question.id, option.value)}
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-civic-300 hover:bg-civic-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <label htmlFor="age" className="text-sm font-medium text-slate-700">
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
                    onChange={(event) => {
                      setAgeInput(event.target.value);
                      setAgeError("");
                    }}
                    className="h-12 flex-1 rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm transition focus:border-civic-400 focus:outline-none"
                    placeholder="For example, 24"
                  />
                  <button
                    type="button"
                    onClick={submitAge}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Continue
                  </button>
                </div>
                <p id="age-help" className="text-sm text-slate-500">
                  This is used only to check whether voting guidance should mention eligibility.
                </p>
                {ageError ? (
                  <p id="age-error" className="text-sm font-medium text-rose-600">
                    {ageError}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-3xl bg-civic-50 p-5 ring-1 ring-civic-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Your guidance</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{guidance.headline}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guidance.intro}</p>
            </div>

            <div className="grid gap-4">
              {guidance.sections.map((section) => (
                <article key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold text-slate-900">{section.title}</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-civicGreen-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

