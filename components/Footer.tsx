export default function Footer() {
  return (
    <footer className="w-full bg-[#1e1e1e] text-white py-32 px-6">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-center text-center">
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight mb-8">
          Let's Prepare for<br />Election Day
        </h2>
        <p className="max-w-xl text-[#888] text-sm leading-relaxed mb-12">
          VotePath provides neutral civic guidance, mock polling-booth navigation, and a browser-only assistant. We do not store personal data or make political recommendations.
        </p>
        <p className="text-[#555] text-xs">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

