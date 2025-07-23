'use client';

import { useState } from 'react';
import {
  FaChartBar,
  FaChartPie,
  FaInfoCircle,
  FaChartLine,
  FaMapMarkedAlt,
  FaListUl,
  FaBurn,
  FaDotCircle,
} from 'react-icons/fa';

export default function DashboardToggles() {
  const [showStats, setShowStats] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showDonutChart, setShowDonutChart] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="w-full space-y-4">
      {/* Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <ToggleButton
          active={showStats}
          onClick={() => setShowStats(!showStats)}
          icon={<FaInfoCircle size={12} />}
          label="Stats Overview"
        />

        <ToggleButton
          active={showBarChart}
          onClick={() => setShowBarChart(!showBarChart)}
          icon={<FaChartBar size={12} />}
          label="Bar Chart"
        />

        <ToggleButton
          active={showPieChart}
          onClick={() => setShowPieChart(!showPieChart)}
          icon={<FaChartPie size={12} />}
          label="Pie Chart"
        />

        <ToggleButton
          active={showLineChart}
          onClick={() => setShowLineChart(!showLineChart)}
          icon={<FaChartLine size={12} />}
          label="Line Chart"
        />

        <ToggleButton
          active={showDonutChart}
          onClick={() => setShowDonutChart(!showDonutChart)}
          icon={<FaDotCircle size={12} />}
          label="Donut Chart"
        />

        <ToggleButton
          active={showMap}
          onClick={() => setShowMap(!showMap)}
          icon={<FaMapMarkedAlt size={12} />}
          label="Map View"
        />

        <ToggleButton
          active={showHotspots}
          onClick={() => setShowHotspots(!showHotspots)}
          icon={<FaBurn size={12} />}
          label="Hotspot Zones"
        />

        <ToggleButton
          active={showTable}
          onClick={() => setShowTable(!showTable)}
          icon={<FaListUl size={12} />}
          label="Detailed Table"
        />
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition ${
        active ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon} {label}
    </button>
  );
}
