# VotePath

VotePath is a polished, civic-tech Next.js app for voter guidance and polling booth navigation.

## Chosen Vertical

- Election process assistant
- Voter guidance
- Polling booth navigation

## What It Does

- Explains the election process in a simple interactive assistant
- Shows a visual election timeline
- Maintains a voting-day checklist in the browser
- Uses Google Maps JavaScript API plus Browser Geolocation for a "Where do I vote?" flow
- Generates mock polling booths near the user for demo purposes only

## Approach and Logic

- The assistant is rule-based, not AI-generated
- The flow asks about first-time voting, age, voter ID, polling location, and document help
- Guidance is neutral and civic-focused
- If the user is under 18, the app explains they are not eligible yet and gives preparation steps
- If the user does not know their polling location, the map route helps them find a demo booth
- If geolocation is denied, the app asks for state, district, and area instead
- If the Google Maps API key is missing, the app shows a graceful fallback and still lets the user continue with mock guidance

## Google Services Used

- Google Maps JavaScript API
- Browser Geolocation API

The app requests browser location only after the user clicks a button.

## Environment Variables

Create a local `.env.local` file with:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

If this variable is missing, VotePath still works with fallback UI.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser.

## Build

```bash
npm run build
```

## Vercel Deployment

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. Add the environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project settings.
4. Deploy.

The project is built for Vercel and does not require a backend.

## Assumptions

- No real election data is used
- No personal data is stored on a server
- No political recommendations are made
- Mock polling booths are generated dynamically for the demo
- The app should remain useful even if geolocation is denied

## Project Notes

- Built with Next.js App Router
- TypeScript
- Tailwind CSS
- Client-side interactions only where needed
- Designed to stay light and maintainable

