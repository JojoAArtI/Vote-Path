import ElectionTimeline from "@/components/ElectionTimeline";
import VotingChecklist from "@/components/VotingChecklist";

export default function TimelinePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <ElectionTimeline />
      <VotingChecklist />
    </div>
  );
}

