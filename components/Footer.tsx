export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
        <p className="max-w-3xl">
          VotePath provides neutral civic guidance, mock polling-booth navigation, and a browser-only
          assistant. It does not store personal data on a server or make political recommendations.
        </p>
        <p>Built for Vercel with Next.js, Tailwind CSS, Google Maps JavaScript API, and Browser Geolocation.</p>
      </div>
    </footer>
  );
}

