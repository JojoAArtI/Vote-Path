# Security Protocol & Declarations

## 1. Data Minimization & Privacy
VotePath operates on a strict **Privacy-First** architecture. 
- **Zero Server-Side Storage**: The application does not connect to a backend database for user data collection. 
- **Local Storage Isolation**: All interactive assistant states (`age`, `voterId`, `firstTimeVoter`) are securely stored in the client's `window.localStorage` under the `votepath.assistant.v1` key. This data never leaves the user's browser.
- **No Analytics**: To maintain absolute civic neutrality and privacy, zero third-party tracking pixels or analytics platforms are integrated.

## 2. API Key Management
- The `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is loaded exclusively through secure `.env.local` bindings.
- The application implements graceful degradation: if the key is compromised, missing, or revoked, the UI handles the absence without throwing unhandled exceptions or crashing the user journey.

## 3. Threat Mitigation
- **XSS Prevention**: React's native DOM-escaping is strictly adhered to. No `dangerouslySetInnerHTML` is used in the codebase.
- **Dependency Auditing**: The repository maintains an optimized bundle with zero critical NPM vulnerabilities. Only trusted, well-maintained libraries (`framer-motion`, `lucide-react`) are utilized.

## 4. Permissions
- **Geolocation**: Browser Geolocation API is explicitly trigger-based (requires user action via the "Use my current location" button) to comply with modern browser security sandboxing and consent models.
