"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateDemoCenterFromArea, generateMockBooths, type Coordinates, type MockBooth } from "@/lib/mockBooths";

type LocationMode = "idle" | "loading" | "manual" | "ready" | "error";

type ManualLocation = {
  state: string;
  district: string;
  area: string;
};

const DEFAULT_MANUAL_LOCATION: ManualLocation = {
  state: "",
  district: "",
  area: ""
};

let googleMapsLoader: Promise<void> | null = null;

type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      Map: new (
        element: HTMLElement,
        options: { center: Coordinates; zoom: number; mapTypeControl: boolean; streetViewControl: boolean; fullscreenControl: boolean }
      ) => {
        setCenter: (center: Coordinates) => void;
      };
      Marker: new (options: { position: Coordinates; map: { setCenter: (center: Coordinates) => void } | null; title: string }) => {
        setMap: (map: { setCenter: (center: Coordinates) => void } | null) => void;
        addListener: (eventName: string, handler: () => void) => void;
      };
      InfoWindow: new () => {
        setContent: (content: string) => void;
        open: (options: { map: { setCenter: (center: Coordinates) => void }; anchor: unknown }) => void;
      };
    };
  };
};

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  const mapsWindow = window as GoogleMapsWindow;

  if (mapsWindow.google?.maps) {
    return Promise.resolve();
  }

  if (!googleMapsLoader) {
    googleMapsLoader = new Promise((resolve, reject) => {
      const existingScript = document.getElementById("google-maps-script") as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () => reject(new Error("Google Maps failed to load.")));
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google Maps failed to load."));
      document.head.appendChild(script);
    });
  }

  return googleMapsLoader;
}

function formatDistance(value: number): string {
  return value < 1 ? `${Math.round(value * 1000)} m` : `${value.toFixed(1)} km`;
}

export default function VotingMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [locationMode, setLocationMode] = useState<LocationMode>("idle");
  const [locationError, setLocationError] = useState("");
  const [manualLocation, setManualLocation] = useState(DEFAULT_MANUAL_LOCATION);
  const [center, setCenter] = useState<Coordinates | null>(null);
  const [locationLabel, setLocationLabel] = useState("");
  const [booths, setBooths] = useState<MockBooth[]>([]);
  const [selectedBoothId, setSelectedBoothId] = useState<string>("");
  const [apiReady, setApiReady] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  const selectedBooth = useMemo(
    () => booths.find((booth) => booth.id === selectedBoothId) ?? null,
    [booths, selectedBoothId]
  );

  useEffect(() => {
    if (locationMode !== "ready" || !center) {
      return;
    }

    setBooths(generateMockBooths(center, locationLabel));
  }, [center, locationLabel, locationMode]);

  useEffect(() => {
    if (!apiKey || locationMode !== "ready" || !center || !mapRef.current) {
      return;
    }

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        const mapsWindow = window as GoogleMapsWindow;

        if (cancelled || !mapsWindow.google?.maps || !mapRef.current) {
          return;
        }

        const googleMaps = mapsWindow.google.maps;

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new googleMaps.Map(mapRef.current, {
            center,
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          });
        } else {
          mapInstanceRef.current.setCenter(center);
        }

        const map = mapInstanceRef.current;
        if (!map) {
          return;
        }

        markerRefs.current.forEach((marker) => marker.setMap(null));
        markerRefs.current = [];

        if (!infoWindowRef.current) {
          infoWindowRef.current = new googleMaps.InfoWindow();
        }

        const userMarker = new googleMaps.Marker({
          position: center,
          map,
          title: "You are here"
        });
        markerRefs.current.push(userMarker);
        userMarker.addListener("click", () => {
          infoWindowRef.current?.setContent("<strong>You are here</strong>");
          infoWindowRef.current?.open({ map, anchor: userMarker });
        });

        booths.forEach((booth) => {
          const marker = new googleMaps.Marker({
            position: booth.coordinates,
            map,
            title: booth.name
          });

          markerRefs.current.push(marker);
          marker.addListener("click", () => {
            setSelectedBoothId(booth.id);
          });
        });

        setApiReady(true);
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Google Maps could not be loaded.";
        setLocationError(message);
        setApiReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, booths, center, locationMode]);

  function requestCurrentLocation() {
    setLocationError("");
    setLocationMode("loading");

    if (!navigator.geolocation) {
      setLocationMode("manual");
      setLocationError("Browser geolocation is not available here. Use the manual location form.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter = {
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6))
        };
        setCenter(nextCenter);
        setLocationLabel("your current area");
        setLocationMode("ready");
      },
      (error) => {
        setLocationMode("manual");
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. Enter your state, district, and area to continue."
            : "We could not read your location. Try the manual location form instead."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function submitManualLocation() {
    if (!manualLocation.state.trim() || !manualLocation.district.trim() || !manualLocation.area.trim()) {
      setLocationError("Please enter your state, district, and area.");
      return;
    }

    const nextCenter = generateDemoCenterFromArea(
      manualLocation.state.trim(),
      manualLocation.district.trim(),
      manualLocation.area.trim()
    );

    setLocationError("");
    setCenter(nextCenter);
    setLocationLabel(`${manualLocation.area.trim()}, ${manualLocation.district.trim()}, ${manualLocation.state.trim()}`);
    setLocationMode("ready");
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="max-w-3xl">
        <span className="inline-block rounded-sm border border-ember-500/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-ember-500">
          Voting location finder
        </span>
        <h2 className="mt-5 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-fog-50 sm:text-4xl">
          Find a mock polling booth.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-fog-400">
          The map uses Google Maps only after you click. If permission is denied or the key is missing, the manual flow still works.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        {/* Map panel */}
        <div className="rounded-sm border border-white/[0.07] bg-void-50 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={requestCurrentLocation}
              className="inline-flex items-center justify-center rounded-sm bg-ember-500 px-6 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
            >
              Use my current location
            </button>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-fog-500">
              {apiKey ? "Google Maps API key detected." : "Google Maps key missing — manual fallback only."}
            </p>
          </div>

          <div className="mt-4 rounded-sm border border-white/[0.07] bg-void p-2">
            <div className="relative min-h-[28rem] overflow-hidden rounded-sm border border-white/[0.06] bg-void-100">
              <div ref={mapRef} className="absolute inset-0" />

              {!apiKey ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md rounded-sm border border-white/[0.08] bg-void-50 p-6">
                    <p className="font-mono text-base font-bold uppercase tracking-tight text-fog-50">Google Maps key not set.</p>
                    <p className="mt-3 text-sm leading-6 text-fog-400">
                      Add <code className="rounded-sm bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-ember-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable the live map. The manual location flow still works.
                    </p>
                  </div>
                </div>
              ) : locationMode === "idle" || locationMode === "loading" ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md rounded-sm border border-white/[0.08] bg-void-50 p-6">
                    <p className="font-mono text-base font-bold uppercase tracking-tight text-fog-50">
                      {locationMode === "loading" ? "Detecting location..." : "Click to share your location."}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-fog-400">
                      We only request browser geolocation after you click the button above.
                    </p>
                  </div>
                </div>
              ) : locationMode === "manual" ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full max-w-lg rounded-sm border border-white/[0.08] bg-void-50 p-6">
                    <h3 className="font-mono text-xl font-bold uppercase tracking-tight text-fog-50">Enter your area</h3>
                    <p className="mt-2 text-sm leading-6 text-fog-400">
                      Enter state, district, and area to generate a demo map near your location.
                    </p>
                    <div className="mt-5 grid gap-3">
                      {[
                        { key: "state",    label: "State"    },
                        { key: "district", label: "District" },
                        { key: "area",     label: "Area"     }
                      ].map((field) => (
                        <label key={field.key} className="grid gap-1.5">
                          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog-500">{field.label}</span>
                          <input
                            value={manualLocation[field.key as keyof ManualLocation]}
                            onChange={(e) => setManualLocation((curr) => ({ ...curr, [field.key]: e.target.value }))}
                            className="h-11 rounded-sm border border-white/[0.10] bg-white/[0.04] px-4 font-mono text-sm text-fog-50 placeholder-fog-600 transition focus:border-ember-500/60 focus:outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={submitManualLocation}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-sm bg-ember-500 px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-ember-400"
                    >
                      Show demo booths
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute left-4 top-4 z-10 rounded-sm border border-white/[0.10] bg-void-50/90 px-4 py-2.5 font-mono text-xs text-fog-300 backdrop-blur">
                  {apiReady ? `Centered near ${locationLabel || "your chosen area"}.` : "Preparing map..."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {locationError && (
            <div className="rounded-sm border border-red-500/30 bg-red-500/[0.08] p-4 font-mono text-xs leading-6 text-red-400">
              {locationError}
            </div>
          )}

          {/* Booth details */}
          <div className="rounded-sm border border-white/[0.07] bg-void-50 p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ember-500">Booth details</p>
            {selectedBooth ? (
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="font-mono text-xl font-bold uppercase tracking-tight text-fog-50">{selectedBooth.name}</h3>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-fog-500">
                    Distance: {formatDistance(selectedBooth.distanceKm)}
                  </p>
                </div>
                <div className="rounded-sm border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.26em] text-fog-500">Accessibility</p>
                  <p className="mt-2 text-sm leading-6 text-fog-300">{selectedBooth.accessibility}</p>
                </div>
                <div className="rounded-sm border border-ember-500/20 bg-ember-500/[0.07] p-4">
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.26em] text-ember-500">Suggested visit time</p>
                  <p className="mt-2 text-sm leading-6 text-fog-300">{selectedBooth.suggestedTime}</p>
                </div>
                <div className="rounded-sm border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.26em] text-fog-500">Documents reminder</p>
                  <p className="mt-2 text-sm leading-6 text-fog-300">{selectedBooth.documentsReminder}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-fog-500">
                Select a booth marker to view details — distance, accessibility, suggested time, and documents.
              </p>
            )}
          </div>

          {/* Nearby booths list */}
          <div className="rounded-sm border border-white/[0.07] bg-void-50 p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ember-500">Nearby mock booths</p>
            <div className="mt-4 grid gap-2">
              {booths.length > 0 ? (
                booths.map((booth) => (
                  <button
                    key={booth.id}
                    type="button"
                    onClick={() => setSelectedBoothId(booth.id)}
                    className={`rounded-sm border px-4 py-4 text-left transition ${
                      selectedBoothId === booth.id
                        ? "border-ember-500/30 bg-ember-500/[0.08]"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-sm font-bold text-fog-100">{booth.name}</p>
                        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-fog-500">{formatDistance(booth.distanceKm)} away</p>
                      </div>
                      <span className="rounded-sm border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-fog-500">
                        Booth
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-sm leading-6 text-fog-500">
                  Use the location button or enter your area to generate demo booths.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

