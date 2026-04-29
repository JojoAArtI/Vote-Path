const timelineSteps = [
  {
    title: "Check eligibility",
    summary: "Confirm that you meet the voting age and local registration rules.",
    details: [
      "Use this first so you know whether to register or simply verify your details.",
      "If you are not eligible yet, you can still learn the process early."
    ]
  },
  {
    title: "Register as voter",
    summary: "Submit or confirm the registration details required in your area.",
    details: [
      "Keep your identity and address documents organized.",
      "Use official local channels to update any changes in name or address."
    ]
  },
  {
    title: "Verify details",
    summary: "Check that your name and polling information are correct.",
    details: [
      "Look for the spelling of your name and the assigned polling area.",
      "Fix mistakes before election day so you are not delayed at the booth."
    ]
  },
  {
    title: "Find polling booth",
    summary: "Locate your voting site and understand how to reach it.",
    details: [
      "Use the map feature for a location-aware, click-to-consent flow.",
      "Note travel time, accessibility, and any landmark details."
    ]
  },
  {
    title: "Prepare documents",
    summary: "Keep the required identity and verification papers together.",
    details: [
      "Carry the documents you were told to bring in your local process.",
      "Keep everything in one place to reduce last-minute stress."
    ]
  },
  {
    title: "Vote on election day",
    summary: "Arrive, verify your name, and complete the voting process.",
    details: [
      "Avoid campaign material inside the booth area.",
      "Follow booth instructions and keep your confirmation in mind."
    ]
  },
  {
    title: "Track results",
    summary: "Follow official results as they are published.",
    details: [
      "Use trusted public sources rather than social posts for updates.",
      "Keep the experience civic-focused and neutral."
    ]
  }
];

export default function ElectionTimeline() {
  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Election timeline</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">A clear path from eligibility to results.</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Expand any card to see a simple explanation of each step. The structure stays intentionally lightweight so it works well on mobile.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

