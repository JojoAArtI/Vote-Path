export type Coordinates = {
  lat: number;
  lng: number;
};

export type MockBooth = {
  id: string;
  name: string;
  coordinates: Coordinates;
  distanceKm: number;
  accessibility: string;
  suggestedTime: string;
  documentsReminder: string;
};

const BOOTH_NAMES = [
  "Community Hall Polling Booth",
  "Government School Polling Booth",
  "District Library Polling Booth",
  "Health Centre Polling Booth",
  "Ward Office Polling Booth"
];

const ACCESSIBILITY_NOTES = [
  "Step-free entrance and wide doorway access.",
  "Accessible queue path and seating nearby.",
  "Clear signage and assisted entry available.",
  "Wheelchair-friendly entry with shaded waiting area.",
  "Low-step access and staff assistance on request."
];

const VISIT_TIMES = [
  "Early morning for shorter queues.",
  "Mid-morning after the opening rush.",
  "Late morning if you want a steadier flow.",
  "Early afternoon for a balanced visit.",
  "Before closing, but not at the last minute."
];

const DOCUMENT_NOTES = [
  "Carry your ID and any registration reference you were given.",
  "Keep your voter details and address proof ready.",
  "Bring the papers you normally use to verify your record.",
  "Have your identity and address documents together.",
  "Double-check the checklist before leaving home."
];

function hashText(text: string): number {
  let hash = 0;
  for (const character of text.toLowerCase()) {
    hash = (hash * 31 + character.charCodeAt(0)) % 1000003;
  }
  return hash;
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function distanceKm(from: Coordinates, to: Coordinates): number {
  const earthRadiusKm = 6371;
  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) *
      Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function generateDemoCenterFromArea(state: string, district: string, area: string): Coordinates {
  const seed = hashText([state, district, area].join("-"));
  const baseLat = 20.5937;
  const baseLng = 78.9629;
  const latOffset = ((seed % 7000) / 7000 - 0.5) * 12;
  const lngOffset = (((Math.floor(seed / 7000) % 7000) / 7000) - 0.5) * 16;

  return {
    lat: Number((baseLat + latOffset).toFixed(6)),
    lng: Number((baseLng + lngOffset).toFixed(6))
  };
}

export function generateMockBooths(center: Coordinates, locationLabel: string): MockBooth[] {
  const seed = hashText(locationLabel || `${center.lat},${center.lng}`);

  return BOOTH_NAMES.map((name, index) => {
    const offsetSeed = seed + index * 997;
    const latOffset = (((offsetSeed % 2000) / 2000) - 0.5) * 0.024;
    const lngOffset = ((((Math.floor(offsetSeed / 2000) % 2000) / 2000) - 0.5) * 0.03);
    const boothCoordinates = {
      lat: Number((center.lat + latOffset).toFixed(6)),
      lng: Number((center.lng + lngOffset).toFixed(6))
    };

    return {
      id: `booth-${index + 1}`,
      name: `${name} ${locationLabel ? `for ${locationLabel}` : ""}`.trim(),
      coordinates: boothCoordinates,
      distanceKm: Number(distanceKm(center, boothCoordinates).toFixed(1)),
      accessibility: ACCESSIBILITY_NOTES[index % ACCESSIBILITY_NOTES.length],
      suggestedTime: VISIT_TIMES[index % VISIT_TIMES.length],
      documentsReminder: DOCUMENT_NOTES[index % DOCUMENT_NOTES.length]
    };
  });
}

