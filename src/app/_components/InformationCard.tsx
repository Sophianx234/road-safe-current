'use client';

import { FaPhoneAlt, FaComments } from 'react-icons/fa';

const driver = {
  name: 'Philip Osborne',
  role: 'Driver',
  experience: '12 years',
  license: 'CDL',
  idNumber: '2415-65-7867',
  licenseClass: 'A, D',
  insurance: '987-36-2415',
  image: '/driver.jpg', // Replace with actual path or import
};

const tabs = [
  'Order details',
  'Driver information',
  'Vehicle',
  'Customer information',
  'Documents',
];

export default function DriverInformationCard() {
  return (
    <div className="bg-white  size-[20rem]   rounded-xl shadow border p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b text-sm font-medium text-gray-500">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`py-2 px-2 ${
              tab === 'Driver information'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'hover:text-green-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between mt-6">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src={driver.image}
            alt={driver.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{driver.name}</p>
            <p className="text-sm text-gray-500">{driver.role}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
            <FaPhoneAlt size={14} />
            Call
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
            <FaComments size={14} />
            Chat
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm text-gray-700">
        <div>
          <p className="text-gray-400">Experience</p>
          <p className="font-medium">{driver.experience}</p>
        </div>
        <div>
          <p className="text-gray-400">Driver's license</p>
          <p className="font-medium">{driver.license}</p>
        </div>
        <div>
          <p className="text-gray-400">ID number</p>
          <p className="font-medium">{driver.idNumber}</p>
        </div>
        <div>
          <p className="text-gray-400">License class</p>
          <p className="font-medium">{driver.licenseClass}</p>
        </div>
        <div>
          <p className="text-gray-400">Insurance number</p>
          <p className="font-medium">{driver.insurance}</p>
        </div>
      </div>
    </div>
  );
}
