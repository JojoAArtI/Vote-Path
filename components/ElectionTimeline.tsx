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
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Election timeline</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A clear path from eligibility to results.</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Expand any card to see a simple explanation of each step. The structure stays intentionally lightweight so it works well on mobile.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">At a glance</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Eligibility comes first so you know which path to follow.",
              "Booth search only asks for location after a user click.",
              "Documents and voting time should be checked before you leave.",
              "The timeline is neutral, practical, and easy to scan."
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {timelineSteps.map((step, index) => (
          <details
            key={step.title}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <div className="inline-flex rounded-full bg-civic-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-civic-700">
                  Step {index + 1}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.summary}</p>
              </div>
              <span className="mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-100 text-xl font-medium text-slate-500 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <ul className="space-y-2 text-sm leading-7 text-slate-600">
                {step.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-civicGreen-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
