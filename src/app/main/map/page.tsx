// File: components/LiveMapDashboard.tsx
"use client";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import FleetFilter from "@/app/_components/FleetFilter";
import FleetSidebar from "@/app/_components/FleetSidebar";
import { Map } from "@/app/_components/Map";
import StatsCard from "@/app/_components/StatsCard";
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

import { FaChartLine, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';

import { StatCardProps } from './StatsCard'; // If it's in a separate file
import RoadUserInjuriesChart from "@/app/_components/charts/RoadUserInjuryChart";
import InjuryDonutChart from "@/app/_components/charts/InjuryDonutChart";
import AiChatInfoCard from "@/app/_components/AIChat";

export const statsData: StatCardProps[] = [
  {
    title: 'New Users',
    value: '1,245',
    icon: <FaUsers />,
    change: '8.5%',
    changeType: 'up',
  },
  {
    title: 'Orders',
    value: '320',
    icon: <FaShoppingCart />,
    change: '3.2%',
    changeType: 'down',
  },
  {
    title: 'Website Visits',
    value: '14,203',
    icon: <FaChartLine />,
    change: '12.4%',
    changeType: 'up',
  },
  {
    title: 'Revenue',
    value: '$9,480',
    icon: <FaDollarSign />,
    change: '5.9%',
    changeType: 'up',
  },
];



export default function LiveMapDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    dummyFleet[0]
  );
  const {showMap,showLineChart,showDonutChart,showPieChart} = useDashStore()
  return (
    <div className=" grid grid-cols-12 gap-4 pt-4  ">
      <div className="col-span-3 space-y-4">

      <FleetSidebar />
      
      </div>
      <div className="self-start space-y-2 col-span-6 overflow-hidden">
       {showMap && <Map/>}
       <div className="grid grid-cols-2 gap-4">

       {statsData.map((stat, i) => (
         <StatsCard key={i} {...stat} />
        ))}
        </div>

        {showLineChart&&<RoadUserInjuriesChart/>}
        {showDonutChart&&<InjuryDonutChart/>}
        <AiChatInfoCard/>


        
        
      </div>
      <div className="self-start col-span-3 space-y-5">
        <FleetFilter />
        
      </div>
    </div>
  );
}

/*
 */
