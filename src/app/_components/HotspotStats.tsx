'use client';

import { FaMapMarkerAlt, FaFireAlt, FaCarCrash } from 'react-icons/fa';

type Hotspot = {
  name: string;
  location: string;
  incidents: number;
  severity: 'Low' | 'Medium' | 'High';
};

const hotspots: Hotspot[] = [
  {
    name: 'Circle Roundabout',
    location: 'Accra, Ghana',
    incidents: 34,
    severity: 'High',
  },
  {
    name: 'Tech Junction',
    location: 'Kumasi, Ghana',
    incidents: 19,
    severity: 'Medium',
  },
  {
    name: 'Tamale Central',
    location: 'Tamale, Ghana',
    incidents: 9,
    severity: 'Low',
  },
];

export default function HotspotStats() {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaFireAlt className="text-red-500" />
          Hotspot Zones
        </h2>
        <span className="text-xs text-gray-400 italic">Updated: Today</span>
      </div>

      {/* Hotspot Items */}
      <div className="space-y-4">
        {hotspots.map((spot, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:shadow-sm transition-all"
          >
            {/* Location Info */}
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm text-gray-800">{spot.name}</h3>
                <p className="text-xs text-gray-500">{spot.location}</p>
              </div>
            </div>

            {/* Incident Count & Severity */}
            <div className="flex items-center flex-col gap-3">
              <span className="flex  items-center gap-1 text-sm font-semibold text-red-500">
                <FaCarCrash className="w-4 h-4" />
                {spot.incidents}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                  spot.severity === 'High'
                    ? 'bg-red-100 text-red-600'
                    : spot.severity === 'Medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {spot.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
