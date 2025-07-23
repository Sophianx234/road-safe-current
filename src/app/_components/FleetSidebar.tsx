'use client';

import {
  FaTachometerAlt,
  FaThermometerHalf,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaClock,
  FaCarCrash,
} from 'react-icons/fa';

const vehicles = [
  {
    name: 'Noah Car',
    icon: '/images/car-1.png',
    km: '486 KM',
    status: 'Moving',
    speed: '125 KM/H',
    region: 'Northern',
    temp: '18°C',
    time: '13:25',
    severity: 'Medium',
  },
  {
    name: 'Peterbilt Trucks',
    icon: '/images/truck-1.jpg',
    km: '486 KM',
    status: 'Crashed',
    speed: '90 KM/H',
    region: 'Eastern',
    temp: '20°C',
    time: '10:10',
    severity: 'High',
    highlighted: true,
  },
  {
    name: 'Keeway V302C',
    icon: '/images/motor-1.jpg',
    km: '486 KM',
    status: 'Idle',
    speed: 'N/A',
    region: 'Central',
    temp: '24°C',
    time: '16:40',
    severity: 'Low',
  },
  {
    name: '500 SJD',
    icon: '/images/truck-1.png',
    km: '486 KM',
    status: 'Moving',
    speed: '112 KM/H',
    region: 'Volta',
    temp: '22°C',
    time: '09:30',
    severity: 'Medium',
  },
];

export default function FleetSidebar() {
  return (
    <div className="max-w-xs w-full  bg-white border border-gray-200 rounded-2xl shadow-lg p-5 space-y-6">
      {/* Header Info */}
      <section>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Selected Vehicle</h2>
          <button className="text-green-600 text-xs font-semibold hover:underline">Details</button>
        </div>

        <h3 className="text-lg font-bold text-orange-600">POLSTAR 520 DDS</h3>

        <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <FaTachometerAlt className="text-gray-400" />
            <span>135 KM/H</span>
          </div>
          <div className="flex items-center gap-1">
            <FaThermometerHalf className="text-gray-400" />
            <span>20°C</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-gray-400" />
            <span>12:42 PM</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>Accra, Ghana</span>
          </div>
          <div className="flex items-center gap-1">
            <FaExclamationTriangle className="text-yellow-500" />
            <span className="text-xs font-semibold">Severity: High</span>
          </div>
        </div>

        <img
          src="/images/truck-1x.png"
          alt="Highlighted Vehicle"
          className="w-full mt-4 rounded-xl object-cover shadow-sm border border-gray-200"
        />
      </section>

      {/* Other Vehicles */}
      <section>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nearby Vehicles Involved</h2>
          <button className="text-green-600 text-xs font-semibold hover:underline">View All</button>
        </div>

        <p className="text-xs text-gray-400 mb-2">Showing 4 related vehicles</p>

        <div className="space-y-3">
          {vehicles.map((v, index) => (
            <div
  key={index}
  className={`flex items-center justify-between px-3 py-2 rounded-lg shadow-sm border border-gray-100 ${
    v.highlighted ? 'bg-orange-50 border-orange-300' : 'hover:bg-gray-50'
  }`}
>
  <div className="flex items-center gap-3">
    <img
      src={v.icon}
      alt={v.name}
      className="w-9 h-9 rounded-md object-cover border border-gray-200"
    />
    <div className="space-y-0.5">
      <p className="text-xs font-semibold text-gray-700">{v.name}</p>
      <div className="flex items-center gap-1 text-[10px] text-gray-500">
        <FaCarCrash className="text-gray-400 text-[10px]" />
        <span>{v.status} · {v.region}</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-gray-400">
        <FaExclamationTriangle className="text-yellow-500 text-[10px]" />
        <span>{v.severity} severity</span>
      </div>
    </div>
  </div>
  <div className="flex flex-col items-end text-[10px] text-gray-600">
    <span className="font-bold text-orange-600 text-xs">{v.km}</span>
    <span>{v.speed}</span>
  </div>
</div>

          ))}
        </div>
      </section>
    </div>
  );
}
