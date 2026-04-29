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
      Map: new (element: HTMLElement, options: { center: Coordinates; zoom: number; mapTypeControl: boolean; streetViewControl: boolean; fullscreenControl: boolean }) => {
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

  if (window.google?.maps) {
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
  const mapInstanceRef = useRef<ReturnType<NonNullable<GoogleMapsWindow["google"]>["maps"]["Map"]> | null>(null);
  const markerRefs = useRef<Array<ReturnType<NonNullable<GoogleMapsWindow["google"]>["maps"]["Marker"]>>>([]);
  const infoWindowRef = useRef<ReturnType<NonNullable<GoogleMapsWindow["google"]>["maps"]["InfoWindow"]> | null>(null);

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
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-civic-700">Voting location finder</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Find a mock polling booth near you.</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          The map uses Google Maps JavaScript API only after you click a location button. If permission is denied or the key is missing, the app falls back gracefully.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={requestCurrentLocation}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Use my current location
            </button>
            <p className="text-sm text-slate-500">
              {apiKey ? "Google Maps API key detected." : "Google Maps key missing; showing manual fallback only."}
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-civic-50 via-white to-civicGreen-50 shadow-inner">
              <div ref={mapRef} className="absolute inset-0" />

              {!apiKey ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200">
                    <p className="text-lg font-semibold text-slate-900">Google Maps API key is not set.</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Add <code className="rounded bg-slate-100 px-1.5 py-0.5 text-civic-800">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable the live map. The manual location flow still works.
                    </p>
                  </div>
                </div>
              ) : locationMode === "idle" || locationMode === "loading" ? (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200">
                    <p className="text-lg font-semibold text-slate-900">Click to share your location.</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      We only request browser geolocation after you click the button above.
                    </p>
                  </div>
                </div>
              ) : locationMode === "manual" ? (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full max-w-lg rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-slate-200">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Enter your area details</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use your state, district, and area so VotePath can generate a demo map near your location.
                    </p>
                    <div className="mt-5 grid gap-3">
                      {[
                        { key: "state", label: "State" },
                        { key: "district", label: "District" },
                        { key: "area", label: "Area" }
                      ].map((field) => (
                        <label key={field.key} className="grid gap-2 text-sm font-medium text-slate-700">
                          {field.label}
                          <input
                            value={manualLocation[field.key as keyof ManualLocation]}
                            onChange={(event) =>
                              setManualLocation((current) => ({
                                ...current,
                                [field.key]: event.target.value
                              }))
                            }
                            className="h-12 rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm focus:border-civic-400 focus:outline-none"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={submitManualLocation}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Show demo booths
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute left-4 top-4 z-10 rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-soft ring-1 ring-slate-200 backdrop-blur">
                  {apiReady ? `Centered near ${locationLabel || "your chosen area"}.` : "Preparing map..."}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {locationError ? (
            <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-800">
              {locationError}
            </div>
          ) : null}

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-civic-700">Booth details</p>
            {selectedBooth ? (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{selectedBooth.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">Distance estimate: {formatDistance(selectedBooth.distanceKm)}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Accessibility</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{selectedBooth.accessibility}</p>
                </div>
                <div className="rounded-3xl bg-civic-50 p-4 ring-1 ring-civic-100">
                  <p className="text-sm font-semibold text-civic-800">Suggested visit time</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{selectedBooth.suggestedTime}</p>
                </div>
                <div className="rounded-3xl bg-civicGreen-50 p-4 ring-1 ring-civicGreen-100">
                  <p className="text-sm font-semibold text-civicGreen-800">Documents reminder</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{selectedBooth.documentsReminder}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Select a booth marker to view the booth name, distance estimate, accessibility note, suggested visit time, and documents reminder.
              </p>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-civicGreen-700">Nearby mock booths</p>
            <div className="mt-4 grid gap-3">
              {booths.length > 0 ? (
                booths.map((booth) => (
                  <button
                    key={booth.id}
                    type="button"
                    onClick={() => setSelectedBoothId(booth.id)}
                    className={`rounded-3xl border px-4 py-4 text-left transition hover:-translate-y-0.5 ${
                      selectedBoothId === booth.id
                        ? "border-civic-300 bg-civic-50"
                        : "border-slate-200 bg-slate-50 hover:border-civic-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{booth.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{formatDistance(booth.distanceKm)} away</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                        Booth
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-600">
                  Use the location button or enter your state, district, and area to generate demo booths.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
