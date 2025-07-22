'use client';

import { useState } from 'react';
import { FaFilter, FaCar, FaMotorcycle, FaTruck, FaChevronDown } from 'react-icons/fa';

const years = ['2021', '2022', '2023', '2024'];
const types = [
  { label: 'All', value: '' },
  { label: 'Car', value: 'car', icon: <FaCar /> },
  { label: 'Truck', value: 'truck', icon: <FaTruck /> },
  { label: 'Motorbike', value: 'bike', icon: <FaMotorcycle /> },
];

const statuses = ['All', 'Active', 'Idle', 'Crashed'];

export default function FleetFilter({
  onFilterChange,
}: {
  onFilterChange?: (filters: { year: string; type: string; status: string }) => void;
}) {
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const handleFilterChange = () => {
    onFilterChange?.({ year, type, status });
  };

  return (
    <div className="w-full self-start  max-w-xs bg-white border border-gray-100 rounded-2xl shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaFilter className="text-gray-400" /> Filters
        </h2>
        <button
          onClick={() => {
            setYear('');
            setType('');
            setStatus('');
            handleFilterChange();
          }}
          className="text-xs text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Year Filter */}
      <div>
        <label className="text-xs text-gray-500 block mb-1">Year</label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            handleFilterChange();
          }}
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Type Filter */}
      <div>
        <label className="text-xs text-gray-500 block mb-1">Vehicle Type</label>
        <div className="flex gap-2 flex-wrap">
          {types.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setType(item.value);
                handleFilterChange();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
                type === item.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="text-xs text-gray-500 block mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleFilterChange();
          }}
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {statuses.map((s) => (
            <option key={s} value={s === 'All' ? '' : s.toLowerCase()}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
