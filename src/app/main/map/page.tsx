// File: components/LiveMapDashboard.tsx
"use client";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import FleetFilter from "@/app/_components/FleetFilter";
import FleetSidebar from "@/app/_components/FleetSidebar";
import { Map } from "@/app/_components/Map";
import { useDashStore } from "@/store/dash-store";

interface Vehicle {
  id: number;
  name: string;
  km: number;
  coords: [number, number];
}

const truckIcon = new Icon({
  iconUrl: "/truck-icon.png", // Add your truck icon image in public folder
  iconSize: [32, 32],
});

const dummyFleet: Vehicle[] = [
  { id: 1, name: "Noah Car", km: 486, coords: [5.56, -0.205] },
  { id: 2, name: "Jeep Car", km: 486, coords: [5.562, -0.2] },
  { id: 3, name: "Peterbilt Truck", km: 486, coords: [5.565, -0.21] },
];

const tripRoute: [number, number][] = [
  [5.56, -0.205],
  [5.561, -0.202],
  [5.562, -0.2],
  [5.564, -0.198],
  [5.565, -0.21],
];


import AiChatInfoCard from "@/app/_components/AIChat";
import { ChartBarLabel } from "@/app/_components/charts/ChartBarLabel";

import DashboardToggles from "@/app/_components/DashboardToggles";
import HotspotStats from "@/app/_components/HotspotStats";
import StatCardsList from "@/app/_components/StatCardsList";
import { BarChartComponent } from "@/app/_components/charts/BarChat";
import { LineChartComponent } from "@/app/_components/charts/LineChart";
import Link from "next/link";
import { GiArtificialHive } from "react-icons/gi";
import { ChartBarLabelSkeleton } from "../../../../skeletons/ChartBarLabelSkeleton";


export default function LiveMapDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    dummyFleet[0]
  );
  const {
    showMap,
    showLineChart,
    showCumChart,
    showHotspots,
    showAI,
    showBarChart,
    showCards,
  } = useDashStore();
  
  return (
    <div className="relative">
      <div className=" grid grid-cols-12 -z-40 gap-4 pt-4  ">
        <DashboardToggles />

        <div className="col-span-3 space-y-4">
          <FleetSidebar />
        </div>
        <div className="self-start space-y-2 col-span-6 overflow-hidden">
          
            {showCards &&
              <StatCardsList/>}
          
          {showHotspots && <HotspotStats />}
          
          {showLineChart && <ChartBarLabel/>}
          {showBarChart && <BarChartComponent />}
          {showCumChart && <LineChartComponent />}
          {!showMap && <Map />}
          {showAI && <AiChatInfoCard />}

        </div>
        <div className="self-start col-span-3 space-y-5">
          <FleetFilter />
        </div>
      </div>
      <Link
        href="/main/ai"
        className="fixed right-4 shadow-md bottom-4 p-2 border border-gray-200 rounded-full hover:scale-110 transition-all hover:border-orange-500 bg-white flex items-center justify-center  "
      >
        <GiArtificialHive size={24} />
      </Link>
    </div>
  );
}

/*
 */
