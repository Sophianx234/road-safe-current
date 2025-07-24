'use client';

import { useDashStore } from '@/store/dash-store';
import {
  FaChartBar,
  FaChartPie,
  FaInfoCircle,
  FaChartLine,
  FaMapMarkedAlt,
  FaBurn,
} from 'react-icons/fa';
import { GiArtificialHive } from 'react-icons/gi';

export default function DashboardToggles() {
  const {
    showMap,
    toggleMap,
    showCumChart,
    toggleCumChart,
    showLineChart,
    toggleLineChart,
    showBarChart,
    toggleBarChart,
    showHotspots,
    toggleHotspots,
    showCards,
    toggleCards,
    
    showAI,
     // Add this to your Zustand store if not already there
    toggleAI, // Optional: in case you want a separate toggle for AI
  } = useDashStore();

  return (
    <div className="w-full pb-3 z-50 col-span-12 space-y-4">
      <div className="flex w-full col-span-12 justify-evenly gap-2 flex-wrap">
        <ToggleButton
          active={showCards}
          onClick={toggleCards}
          icon={<FaInfoCircle size={12} />}
          label="Stats Overview"
        />
        <ToggleButton
          active={showMap}
          onClick={toggleMap}
          icon={<FaMapMarkedAlt size={12} />}
          label="Map View"
        />
        <ToggleButton
          active={showBarChart}
          onClick={toggleBarChart}
          icon={<FaChartBar size={12} />}
          label="Bar Chart"
        />
        <ToggleButton
          active={showCumChart}
          onClick={toggleCumChart}
          icon={<FaChartPie size={12} />}
          label="Cummulative Chart"
        />
        <ToggleButton
          active={showLineChart}
          onClick={toggleLineChart}
          icon={<FaChartLine size={12} />}
          label="Line Chart"
        />
        <ToggleButton
          active={showHotspots}
          onClick={toggleHotspots}
          icon={<FaBurn size={12} />}
          label="Hotspot Zones"
        />
        <ToggleButton
          active={showAI}
          onClick={toggleAI} // ← Hook this into your Zustand
          icon={<GiArtificialHive size={12} />}
          label="AI Analysis"
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
        active
          ? 'bg-orange-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon} {label}
    </button>
  );
}
