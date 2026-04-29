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

export function deriveGuidance(answers: AssistantAnswers): GuidanceResult {
  if (typeof answers.age === "number" && answers.age < 18) {
    return {
      headline: "You are not eligible to vote yet.",
      intro:
        "You can still prepare now so you are ready when you reach voting age. Keep your identity details in order and learn the basics early.",
      sections: [
        {
          title: "What to do meanwhile",
          items: [
            "Learn the election timeline so the process feels familiar.",
            "Keep proof of identity and address documents organized.",
            "Check how voter registration works in your area when you turn 18."
          ]
        },
        {
          title: "Simple step-by-step process",
          items: [
            "Confirm your eligibility.",
            "Register or update your details.",
            "Find your polling booth.",
            "Carry the required documents.",
            "Vote and confirm the process is complete."
          ]
        }
      ]
    };
  }

  const sections: GuidanceSection[] = [];

  if (answers.firstTimeVoter === "yes") {
    sections.push({
      title: "First-time voter path",
      items: [
        "Register as a voter and verify your details carefully.",
        "Use the timeline to follow each step without rushing.",
        "Keep the map open so you can confirm where to vote."
      ]
    });
  }

  if (answers.hasVoterId === "no") {
    sections.push({
      title: "No voter ID yet",
      items: [
        "Check the local voter registration process and accepted identity proof.",
        "Prepare any alternative identity or address documents requested in your area.",
        "Keep the document checklist handy before election day."
      ]
    });
  }

  if (answers.knowsPollingLocation === "no") {
    sections.push({
      title: "Polling location guidance",
      items: [
        "Use the map to request your location only after you click the button.",
        "Review the booth card before you leave home.",
        "Keep a note of travel time and accessibility details."
      ]
    });
  }

  if (answers.needsDocumentHelp === "yes") {
    sections.push({
      title: "Documents reminder",
      items: [
        "Carry your ID or the document guidance you were given locally.",
        "Keep address proof and any registration-related papers together.",
        "Double-check the checklist before you head out."
      ]
    });
  }

  sections.push({
    title: "Voting-day steps",
    items: [
      "Confirm eligibility and booth details before you leave.",
      "Carry the right documents and verify your name at the booth.",
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
      "Vote on election day."
    ]
  });

  return {
    headline: "Here is your personalized voting path.",
    intro:
      "The guidance below is neutral, civic-focused, and built to help you move through the process one step at a time.",
    sections
  };
}

