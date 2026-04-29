export type YesNo = "yes" | "no";

export type AssistantAnswers = {
  firstTimeVoter?: YesNo;
  age?: number;
  hasVoterId?: YesNo;
  knowsPollingLocation?: YesNo;
  needsDocumentHelp?: YesNo;
};

export type AssistantQuestion = {
  id: keyof AssistantAnswers;
  label: string;
  helperText: string;
  type: "yesno" | "age";
};

export type GuidanceSection = {
  title: string;
  items: string[];
};

export type GuidanceResult = {
  headline: string;
  intro: string;
  sections: GuidanceSection[];
};

export const ASSISTANT_QUESTIONS: AssistantQuestion[] = [
  {
    id: "firstTimeVoter",
    label: "Are you a first-time voter?",
    helperText: "This helps me decide whether to include registration guidance.",
    type: "yesno"
  },
  {
    id: "age",
    label: "What is your age?",
    helperText: "I use this only to check eligibility guidance.",
    type: "age"
  },
  {
    id: "hasVoterId",
    label: "Do you already have voter ID?",
    helperText: "If not, I will show the document and verification path.",
    type: "yesno"
  },
  {
    id: "knowsPollingLocation",
    label: "Do you know your polling location?",
    helperText: "If not, the map can help you find a nearby booth.",
    type: "yesno"
  },
  {
    id: "needsDocumentHelp",
    label: "Do you need help with documents?",
    helperText: "I will show a simple checklist if you do.",
    type: "yesno"
  }
];

export function getNextQuestion(answers: AssistantAnswers): AssistantQuestion | null {
  return ASSISTANT_QUESTIONS.find((question) => answers[question.id] === undefined) ?? null;
}

export function getAnsweredCount(answers: AssistantAnswers): number {
  return ASSISTANT_QUESTIONS.filter((question) => answers[question.id] !== undefined).length;
}

export function getYesNoLabel(value: YesNo): string {
  return value === "yes" ? "Yes" : "No";
}

function statusText(value?: YesNo): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not answered yet";
}

export function deriveGuidance(answers: AssistantAnswers): GuidanceResult {
  if (typeof answers.age === "number" && answers.age < 18) {
    return {
      headline: "You are not eligible to vote yet.",
      intro:
        "You can still prepare now so you are ready when you reach voting age. Keep your identity details in order and learn the basics early.",
      sections: [
        {
          title: "What you can do meanwhile",
          items: [
            "Learn the election timeline so the process feels familiar.",
            "Keep proof of identity and address documents organized.",
            "Notice the difference between registration, verification, and voting day.",
            "Check how voter registration works in your area when you turn 18."
          ]
        },
        {
          title: "What the process will look like later",
          items: [
            "Confirm your eligibility.",
            "Register or update your details.",
            "Find your polling booth.",
            "Carry the required documents.",
            "Vote and confirm the process is complete."
          ]
        },
        {
          title: "What this app can do for you later",
          items: [
            "Explain the process in plain language.",
            "Help you identify what to carry on voting day.",
            "Guide you to the polling location map when you are ready."
          ]
        }
      ]
    };
  }

  const sections: GuidanceSection[] = [
    {
      title: "Your snapshot",
      items: [
        `First-time voter: ${statusText(answers.firstTimeVoter)}.`,
        `Age check: ${typeof answers.age === "number" ? `${answers.age}` : "Not answered yet"}.`,
        `Voter ID: ${statusText(answers.hasVoterId)}.`,
        `Polling location: ${answers.knowsPollingLocation === "yes" ? "Known" : answers.knowsPollingLocation === "no" ? "Need help finding it" : "Not answered yet"}.`
      ]
    },
    {
      title: "Before you leave home",
      items: [
        "Keep your ID and any registration papers together.",
        "Check the polling booth details and the approximate travel time.",
        "Choose a time when you can get there without rushing.",
        "Keep a small backup note with the booth name and location."
      ]
    },
    {
      title: "If something feels unclear",
      items: [
        "Return to the timeline to see the process from start to finish.",
        "Use the map if you need help with the polling location.",
        "Review the checklist before you head out.",
        "Keep the guidance neutral and focused on the civic process."
      ]
    }
  ];

  if (answers.firstTimeVoter === "yes") {
    sections.push({
      title: "First-time voter path",
      items: [
        "Register as a voter and verify your details carefully.",
        "Use the timeline to follow each step without rushing.",
        "Keep the map open so you can confirm where to vote.",
        "Expect a few extra verification steps on your first visit."
      ]
    });
  }

  if (answers.hasVoterId === "no") {
    sections.push({
      title: "No voter ID yet",
      items: [
        "Check the local voter registration process and accepted identity proof.",
        "Prepare any alternative identity or address documents requested in your area.",
        "Keep the document checklist handy before election day.",
        "If you are unsure, ask locally which documents are accepted before you travel."
      ]
    });
  }

  if (answers.knowsPollingLocation === "no") {
    sections.push({
      title: "Polling location guidance",
      items: [
        "Use the map to request your location only after you click the button.",
        "Review the booth card before you leave home.",
        "Keep a note of travel time and accessibility details.",
        "If you prefer manual entry, enter your state, district, and area."
      ]
    });
  }

  if (answers.needsDocumentHelp === "yes") {
    sections.push({
      title: "Documents reminder",
      items: [
        "Carry your ID or the document guidance you were given locally.",
        "Keep address proof and any registration-related papers together.",
        "Double-check the checklist before you head out.",
        "Separate the papers into one folder so they are easy to reach."
      ]
    });
  }

  sections.push({
    title: "Voting-day rhythm",
    items: [
      "Confirm eligibility and booth details before you leave.",
      "Carry the right documents and verify your name at the booth.",
      "Stay calm in the queue and follow the booth instructions.",
      "Vote, then confirm you have completed the process."
    ]
  });

  sections.push({
    title: "Simple step-by-step process",
    items: [
      "Check eligibility.",
      "Register or verify your record.",
      "Find the polling booth.",
      "Prepare documents.",
      "Vote on election day.",
      "Confirm completion and leave the booth area."
    ]
  });

  sections.push({
    title: "Quick practical reminders",
    items: [
      "Avoid campaign material inside the booth area.",
      "Keep your phone on silent while you are inside.",
      "Review any accessibility note before you travel.",
      "Use the map as a planning tool, not a political tool."
    ]
  });

  return {
    headline: "Here is your personalized voting path.",
    intro:
      "The guidance below is neutral, civic-focused, and built to help you move through the process one step at a time.",
    sections
  };
}
