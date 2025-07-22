// File: components/LiveMapDashboard.tsx
"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { BiFilterAlt } from "react-icons/bi";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, CarFront, Map as MapIcon, CircleUser } from "lucide-react";
import FleetSidebar from "@/app/_components/FleetSidebar";
import FleetFilter from "@/app/_components/FleetFilter";
import TripTracker from "@/app/_components/TripTracker";
import ExpenseCard from "@/app/_components/ExpensesCard";
import HotspotStats from "@/app/_components/HotspotStats";
import { BarChartComponent } from "@/app/_components/charts/BarChat";
import { LineChartComponent } from "@/app/_components/charts/LineChart";
import { PieChartComponent } from "@/app/_components/charts/PieChart";
import { RadarChartComponent } from "@/app/_components/charts/RadarChart";
import { RadialChartComponent } from "@/app/_components/charts/RadialChart";
import { FaSearch } from "react-icons/fa";
import DriverInformationCard from "@/app/_components/InformationCard";

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

export default function LiveMapDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    dummyFleet[0]
  );

  return (
    <div className="flex  h-dvh w-dvw overflow-hidden">
      {/* Sidebar */}
      <div className="bg-gray-100 w-96 p-4 px-8 py-10 space-y-4">
        <h1 className="text-lg  mb-2 font-bold">Active Orders: 45</h1>

        {/* Search */}
        <div className="grid grid-cols-[3fr_1fr] gap-2 items-center ">

        <div className="relative  ">
          <FaSearch className="absolute text-xs top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 text-xs  py-2 rounded-md  bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            </div>
            <button className="flex w-full text-xs shadow gap-1 rounded-sm bg-white py-2 px-5 items-center"><BiFilterAlt/>
            <span>Filters</span>
            </button>
        </div>
        <div className=" space-y-4 pb-32 overflow-y-scroll h-full scrollbar-hide">
        <FleetFilter/>

<FleetSidebar/>
        </div>

        {/* Add any sidebar content here */}
        <DriverInformationCard/>
      </div>

      {/* Map Section */}
      <div className="flex-1 block relative   w-[80rem] overflow-hidden  ">
        <MapContainer
          center={[5.56, -0.205]}
          zoom={13}
          
          className="size-[38rem] w-[80rem]  object-cover"
        >
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


          <Marker position={[5.56, -0.205]} icon={truckIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}


/*
 */
