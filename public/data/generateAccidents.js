// generateAccidents.js
import fs from "fs";
import path from "path";

// Approximate bounding boxes for each region in Ghana
const regionBounds = [
  { name: "Greater Accra", minLat: 5.48, maxLat: 5.95, minLng: -0.33, maxLng: 0.30 },
  { name: "Ashanti", minLat: 5.5, maxLat: 7.6, minLng: -2.2, maxLng: -0.9 },
  { name: "Western", minLat: 4.8, maxLat: 6.2, minLng: -3.26, maxLng: -1.7 },
  { name: "Central", minLat: 5.0, maxLat: 6.5, minLng: -2.1, maxLng: -0.3 },
  { name: "Eastern", minLat: 5.7, maxLat: 6.8, minLng: -1.3, maxLng: 0.1 },
  { name: "Northern", minLat: 8.5, maxLat: 10.3, minLng: -2.6, maxLng: -0.2 },
  { name: "Upper East", minLat: 10.4, maxLat: 11.17, minLng: -1.5, maxLng: 0.92 },
  { name: "Upper West", minLat: 9.6, maxLat: 11.17, minLng: -2.95, maxLng: -1.3 },
  { name: "Volta", minLat: 5.8, maxLat: 8.9, minLng: 0.0, maxLng: 1.19 },
  { name: "Oti", minLat: 7.5, maxLat: 9.0, minLng: -0.3, maxLng: 0.9 },
  { name: "Bono", minLat: 7.4, maxLat: 8.4, minLng: -2.7, maxLng: -1.7 },
  { name: "Bono East", minLat: 7.4, maxLat: 8.6, minLng: -1.6, maxLng: -0.6 },
  { name: "Ahafo", minLat: 6.5, maxLat: 7.5, minLng: -2.6, maxLng: -1.7 },
  { name: "Savannah", minLat: 8.2, maxLat: 10.5, minLng: -2.8, maxLng: -0.6 },
  { name: "North East", minLat: 9.8, maxLat: 10.7, minLng: -0.6, maxLng: -0.1 },
  { name: "Western North", minLat: 5.7, maxLat: 6.8, minLng: -2.8, maxLng: -2.0 }
];

const vehicleTypes = ["car", "bike", "truck", "bus", "taxi", "long-vehicle"];
const accidentTypes = ["collision", "pedestrian knockdown", "overturn", "run-off-road", "fire"];
const severities = ["fatal", "serious", "minor"];

// Helper: random item from array
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Random location within a specific region's bounding box
function randomLocationInRegion(bounds) {
  return {
    lat: +(Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat).toFixed(6),
    lng: +(Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng).toFixed(6),
  };
}

// Random date between years
function randomDate(startYear = 2015, endYear = 2025) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split("T")[0];
}

// Casualties depend on severity
function generateCasualties(severity) {
  switch (severity) {
    case "fatal": return { fatalities: Math.floor(Math.random() * 5) + 1, injuries: Math.floor(Math.random() * 15) };
    case "serious": return { fatalities: Math.floor(Math.random() * 2), injuries: Math.floor(Math.random() * 10) + 1 };
    default: return { fatalities: 0, injuries: Math.floor(Math.random() * 5) + 1 };
  }
}

// Main generator
function generateData(count) {
  return Array.from({ length: count }, () => {
    const regionData = randomItem(regionBounds);
    const location = randomLocationInRegion(regionData);
    const date = randomDate();
    const year = new Date(date).getFullYear();
    const locationName = `${regionData.name} - Spot ${Math.floor(Math.random() * 1000)}`;
    const vehicleType = randomItem(vehicleTypes);
    const accidentType = randomItem(accidentTypes);
    const severity = randomItem(severities);
    const { fatalities, injuries } = generateCasualties(severity);

    return {
      date,
      year,
      region: regionData.name,
      locationName,
      location,
      vehicleType,
      accidentType,
      severity,
      fatalities,
      injuries,
      description: `A ${severity} ${accidentType} involving a ${vehicleType} at ${locationName}.`
    };
  });
}

// Generate and save
const accidents = generateData(50000);
const dir = path.resolve("public/data");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, "accidents.json"), JSON.stringify(accidents, null, 2));
console.log("✅ accidents.json generated successfully!");
