import { GsapReveal } from "@/components/GsapReveal";

const timelineSteps = [
  {
    title: "Check eligibility",
    summary: "Confirm that you meet the voting age and local registration rules.",
    details: [
      "Use this first so you know whether to register or simply verify your details.",
      "If you are not eligible yet, you can still learn the process early.",
      "This step tells you whether the rest of the flow is registration or just verification."
    ]
  },
  {
    title: "Register as voter",
    summary: "Submit or confirm the registration details required in your area.",
    details: [
      "Keep your identity and address documents organized.",
      "Use official local channels to update any changes in name or address.",
      "Treat this as the step where you lock in your voting record."
    ]
  },
  {
    title: "Verify details",
    summary: "Check that your name and polling information are correct.",
    details: [
      "Look for the spelling of your name and the assigned polling area.",
      "Fix mistakes before election day so you are not delayed at the booth.",
      "If something looks off, correct it before you make the journey."
    ]
  },
  {
    title: "Find polling booth",
    summary: "Locate your voting site and understand how to reach it.",
    details: [
      "Use the map feature for a location-aware, click-to-consent flow.",
      "Note travel time, accessibility, and any landmark details.",
      "If location is denied, the manual state, district, and area fallback still helps."
    ]
  },
  {
    title: "Prepare documents",
    summary: "Keep the required identity and verification papers together.",
    details: [
      "Carry the documents you were told to bring in your local process.",
      "Keep everything in one place to reduce last-minute stress.",
      "Pack the documents the night before so election day feels lighter."
    ]
  },
  {
    title: "Plan the route and time",
    summary: "Decide when to leave and how you will get there.",
    details: [
      "Aim for a time when queues are usually calmer.",
      "Check whether the booth has accessibility details you want to know in advance.",
      "Give yourself enough travel time so the day stays calm."
    ]
  },
  {
    title: "Vote on election day",
    summary: "Arrive, verify your name, and complete the voting process.",
    details: [
      "Avoid campaign material inside the booth area.",
      "Follow booth instructions and keep your confirmation in mind.",
      "Stay focused on verification, voting, and completion only."
    ]
  },
  {
    title: "After voting",
    summary: "Leave calmly and keep an eye on official updates later.",
    details: [
      "Confirm that you completed the process before you leave the area.",
      "Use trusted public sources for any later updates.",
      "Keep the experience civic-focused and neutral."
    ]
  },
  {
    title: "Track results",
    summary: "Follow official results as they are published.",
    details: [
      "Use trusted public sources rather than social posts for updates.",
      "Keep the experience civic-focused and neutral.",
      "Think of this as the final informational step, not part of your vote."
    ]
  }
];

export default function ElectionTimeline() {
  return (
    <section className="space-y-6">
      {/* Header row */}
      <GsapReveal className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          data-gsap-item
          className="rounded-sm border border-white/[0.07] bg-void-50 p-6 sm:p-8"
        >
          <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
            Election timeline
          </span>
          <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl">
            Eligibility to results.<br />Clear order.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-fog-400">
            Expand any card to see a plain explanation of each step. Lightweight enough for election-day mobile use.
          </p>
        </div>

        <div
          data-gsap-item
          className="rounded-sm border border-white/[0.07] bg-void-50 p-6 sm:p-8"
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ember-500">At a glance</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Eligibility comes first so you know which path to follow.",
              "Booth search only asks for location after a user click.",
              "Documents and voting time should be checked before you leave.",
              "The timeline is neutral, practical, and easy to scan."
            ].map((item) => (
              <div key={item} className="rounded-sm border border-white/[0.06] bg-white/[0.03] p-3 text-xs leading-6 text-fog-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </GsapReveal>

      {/* Step cards */}
      <GsapReveal className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {timelineSteps.map((step, index) => (
          <details
            key={step.title}
            data-gsap-item
            className="group rounded-sm border border-white/[0.07] bg-void-50 p-5 transition open:border-ember-500/30"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.28em] text-ember-500">
                  Step {index + 1}
                </span>
                <h3 className="mt-3 font-mono text-base font-bold uppercase tracking-tight text-fog-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-fog-400">{step.summary}</p>
              </div>
              <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-sm border border-white/[0.10] bg-white/[0.04] font-mono text-lg font-bold text-fog-400 transition group-open:rotate-45 group-open:text-ember-500">
                +
              </span>
            </summary>
            <div className="mt-4 border-t border-white/[0.07] pt-4">
              <ul className="space-y-2 text-xs leading-7 text-fog-400">
                {step.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </GsapReveal>
    </section>
  );
}
