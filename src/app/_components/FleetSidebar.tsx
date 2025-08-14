'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaClock,
  FaCarCrash,
  FaSkullCrossbones,
  FaUserInjured,
} from 'react-icons/fa';
import { useDashStore } from '@/store/dash-store';

const getStatusStyle = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'fatal':
      return 'bg-red-50 border-red-200 text-red-700';
    case 'serious':
      return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    case 'minor':
      return 'bg-green-50 border-green-200 text-green-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-500';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'fatal':
      return 'text-red-600';
    case 'serious':
      return 'text-yellow-600';
    case 'minor':
      return 'text-green-600';
    default:
      return 'text-gray-400';
  }
};

export default function FleetSidebar() {
  const [loading] = useState(false);
  const { accidents } = useDashStore();
  const [showAll, setShowAll] = useState(false);

  const maxVisible = 3;
  const displayedAccidents = showAll
    ? accidents.slice(1)
    : accidents.slice(1, maxVisible + 1);

  return (
    <div className="max-w-xs w-full border mb-10 border-gray-200 rounded-lg shadow overflow-hidden text-sm bg-white">
      {/* Highlighted Record */}
      <div className="py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex px-4 justify-between items-center mb-2">
          <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Accident Information
          </h2>
        </div>

        {loading ? (
          <div className="animate-pulse px-4">
            <div className="h-4 w-28 bg-gray-100 rounded mb-3" />
          </div>
        ) : accidents.length > 0 ? (
          <>
            <h3 className="text-lg font-bold px-4 text-yellow-600 mb-3">
              {accidents[0].vehicleType.toUpperCase()}
            </h3>
            <div className="px-4 grid grid-cols-2 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span className="font-medium capitalize">{accidents[0].region}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-red-600" />
                <span className="font-semibold text-red-600">
                  {accidents[0].severity.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-500" />
                <span>{new Date(accidents[0].date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSkullCrossbones className="text-red-700" />
                <span>{accidents[0].fatalities} fatalities</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserInjured className="text-yellow-700" />
                <span>{accidents[0].injuries} injuries</span>
              </div>
            </div>
            <div className="mt-4 relative px-4">
              <div className="relative w-full h-28 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={`/images/${accidents[0].vehicleType || 'default'}-1.jpg`}
                  alt={accidents[0].vehicleType}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-2 right-6 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                ALERT
              </div>
            </div>
          </>
        ) : (
          <p className="px-4 text-xs text-gray-500">No fatal accidents found</p>
        )}
      </div>

      {/* Other Records */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Other Records
          </h2>
        </div>

        {loading ? (
          <div className="space-y-2 animate-pulse">
            {[...Array(maxVisible)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded" />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {displayedAccidents.map((accident) => (
                <div
                  key={accident._id}
                  className={`flex items-center justify-between p-3 rounded border text-xs hover:shadow-md hover:scale-[1.01] transition ${getStatusStyle(
                    accident.severity
                  )}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 font-semibold capitalize">
                      <FaCarCrash className="text-gray-600" /> {accident.vehicleType}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <FaMapMarkerAlt className="text-blue-600" /> {accident.region}
                    </div>
                    <div
                      className={`flex items-center gap-1 ${getSeverityColor(
                        accident.severity
                      )}`}
                    >
                      <FaExclamationTriangle /> {accident.severity}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="flex items-center gap-1">
                      <FaSkullCrossbones className="text-red-700" /> {accident.fatalities}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUserInjured className="text-yellow-700" /> {accident.injuries}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <FaClock /> {new Date(accident.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {accidents.length > maxVisible + 1 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="mt-3 w-full flex items-center justify-center gap-1 text-[11px] font-medium text-blue-600 hover:underline"
              >
                {showAll ? '▲ View Less' : '▼ View More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
