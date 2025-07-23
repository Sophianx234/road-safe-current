'use client';

import { useState } from 'react';
import {
  FaFilter,
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaTruckMoving,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCarCrash,
} from 'react-icons/fa';

const years = ['2021', '2022', '2023', '2024'];

const types = [
  { label: 'All', value: '', icon: <FaFilter /> },
  { label: 'Car', value: 'car', icon: <FaCar /> },
  { label: 'Truck', value: 'truck', icon: <FaTruck /> },
  { label: 'Motorbike', value: 'bike', icon: <FaMotorcycle /> },
  { label: 'Long Vehicle', value: 'long-vehicle', icon: <FaTruckMoving /> },
];

const accidentTypes = ['All', 'Collision', 'Overturning', 'Pedestrian Knockdown', 'Hit and Run'];
const regions = ['All', 'North', 'South', 'East', 'West'];
const severities = ['All', 'Low', 'Medium', 'High'];

export default function FleetFilter({
  onFilterChange,
}: {
  onFilterChange?: (filters: {
    year: string;
    type: string;
    accidentType: string;
    region: string;
    severity: string;
  }) => void;
}) {
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [accidentType, setAccidentType] = useState('');
  const [region, setRegion] = useState('');
  const [severity, setSeverity] = useState('');

  const handleFilterChange = () => {
    onFilterChange?.({ year, type, accidentType, region, severity });
  };

  const clearFilters = () => {
    setYear('');
    setType('');
    setAccidentType('');
    setRegion('');
    setSeverity('');
    handleFilterChange();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <FaFilter className="text-black" /> Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Year */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Vehicle Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map((item) => (
            <button
              key={item.value}
              onClick={() => setType(item.value)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                type === item.value
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-gray-50 text-gray-700 hover:bg-orange-100 border-gray-300'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accident Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaCarCrash className="text-gray-500" /> Accident Type
        </label>
        <select
          value={accidentType}
          onChange={(e) => setAccidentType(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {accidentTypes.map((type) => (
            <option key={type} value={type === 'All' ? '' : type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" /> Region
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {regions.map((r) => (
            <option key={r} value={r === 'All' ? '' : r.toLowerCase()}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Severity */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FaExclamationTriangle className="text-gray-400" /> Severity
        </label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {severities.map((s) => (
            <option key={s} value={s === 'All' ? '' : s.toLowerCase()}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Button */}
      <div>
        <button
          onClick={handleFilterChange}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold text-sm transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
