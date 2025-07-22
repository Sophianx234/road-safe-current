'use client';

import { FaTachometerAlt, FaThermometerHalf } from 'react-icons/fa';

const vehicles = [
  { name: 'Noah Car', icon: '/images/car-1.png', km: '486 KM' },
  { name: 'Jeep Car', icon: '/images/jeep.png', km: '486 KM' },
  { name: 'Peterbilt Trucks', icon: '/images/truck-1.jpg', km: '486 KM', highlighted: true },
  { name: 'Cargo Truck', icon: '/images/car-1.jpg', km: '486 KM' },
  { name: 'Keeway V302C', icon: '/images/motor-1.jpg', km: '486 KM' },
  { name: 'Jeep Car', icon: '/images/bicycle-1.jpg', km: '486 KM' },
  { name: '500 SJD', icon: '/images/truck-1.png', km: '486 KM' },
];

export default function FleetSidebar() {
  return (
    <div className=" max-w-xs   self-start bg-white border border-gray-100 rounded-2xl shadow-md p-5 space-y-6">
      {/* Fleet Overview Header */}
      <section>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">My Fleet</h2>
          <button className="text-green-600 text-xs font-semibold hover:underline">See All</button>
        </div>

        <h3 className="text-xl font-bold text-orange-600">POLSTAR 520 DDS</h3>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaTachometerAlt className="text-gray-400" />
            <span>135 KM/H</span>
          </div>
          <div className="flex items-center gap-1">
            <img src="/icons/road.png" alt="Road" className="w-4 h-4" />
            <span>486 KM</span>
          </div>
          <div className="flex items-center gap-1">
            <FaThermometerHalf className="text-gray-400" />
            <span>20°C</span>
          </div>
        </div>

        <img
          src="/images/truck-1.png"
          alt="Featured Vehicle"
          className="w-full mt-4 rounded-xl object-contain shadow-sm"
        />
      </section>

      {/* Live Tracking Section */}
      <section>
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Live Tracking</h2>
          <button className="text-green-600 text-xs font-semibold hover:underline">See All</button>
        </div>
        <p className="text-xs text-gray-400 mb-3">32 vehicles on the road</p>

        <div className="space-y-3">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-3 py-2 rounded-lg shadow-sm transition-all ${
                vehicle.highlighted ? 'bg-orange-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={vehicle.icon}
                  alt={vehicle.name}
                  className="w-10 h-10 rounded-md object-cover border border-gray-200"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{vehicle.name}</p>
                  <p className="text-xs text-gray-400">Status: Heina 23 – 20%</p>
                </div>
              </div>
              <span className="text-orange-500 text-sm font-bold">{vehicle.km}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
