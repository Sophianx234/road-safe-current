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
    <div className="w-full max-w-md bg-white border border-gray-200 shadow rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaFireAlt className="text-red-500" /> Hotspot Zones
        </h2>
        <span className="text-xs text-gray-400">Updated: Today</span>
      </div>

      <div className="space-y-4">
        {hotspots.map((spot, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 border rounded-xl hover:shadow transition-all"
          >
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
              <div>
                <p className="font-medium text-sm text-gray-700">{spot.name}</p>
                <p className="text-xs text-gray-400">{spot.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm font-semibold text-red-500">
                <FaCarCrash className="w-4 h-4" />
                {spot.incidents}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
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
