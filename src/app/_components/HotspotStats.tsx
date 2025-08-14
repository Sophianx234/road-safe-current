'use client';

import { useState } from "react";
import { useDashStore } from "@/store/dash-store";
import { FaMapMarkerAlt, FaCarCrash } from "react-icons/fa";
import { SiFireship } from "react-icons/si";

// Your accident data type
type Accident = {
  location: { lat: number; lng: number };
  _id: string;
  date: string;
  year: number;
  region: string;
  locationName: string;
  vehicleType: string;
  accidentType: string;
  severity: string;
  fatalities: number;
  injuries: number;
  description: string;
};

type Hotspot = {
  name: string;
  location: string;
  incidents: number;
  severity: "Low" | "Medium" | "High";
};

// Map fatalities/injuries to severity
function getSeverity(
  fatalities: number,
  injuries: number
): "Low" | "Medium" | "High" {
  if (fatalities >= 4) return "High";
  if (fatalities >= 1 || injuries >= 5) return "Medium";
  return "Low";
}

export default function HotspotStats() {
  const [showAll, setShowAll] = useState(false);
  const { accidents } = useDashStore();

  // Optional filtering example: only show accidents with fatalities > 0
  const filteredAccidents = accidents.filter((acc) => acc.fatalities > 0);

  // Map DB data to hotspot format
  const hotspots: Hotspot[] = filteredAccidents.map((item) => ({
    name: item.locationName,
    location: `${item.region}, Ghana`,
    incidents: 1, // could count grouped items here
    severity: getSeverity(item.fatalities, item.injuries),
  }));

  // Control how many items to show
  const displayedHotspots = showAll ? hotspots : hotspots.slice(0, 4);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <SiFireship className="text-black" />
          Hotspot Zones
        </h2>
        <span className="text-xs text-gray-400 italic">Updated: Today</span>
      </div>

      {/* Hotspot Items */}
      <div className="space-y-4">
        {displayedHotspots.map((spot, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
          >
            {/* Location Info */}
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-black w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  {spot.name}
                </h3>
                <p className="text-xs text-gray-500">{spot.location}</p>
              </div>
            </div>

            {/* Incident Count & Severity */}
            <div className="flex items-center flex-col gap-3">
              <span className="flex items-center gap-1 text-sm font-semibold text-red-500">
                <FaCarCrash className="w-4 h-4" />
                {spot.incidents}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                  spot.severity === "High"
                    ? "bg-red-100 text-red-600"
                    : spot.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {spot.severity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      {hotspots.length > 1 && (
        <div className="pt-2 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
