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
import StatsCard from "@/app/_components/StatsCard";
import { FaBox, FaChartLine, FaClock, FaTruckMoving } from "react-icons/fa";
import DashboardToggles from "@/app/_components/DashboardToggles";

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
    <div className=" grid grid-cols-12 gap-4 pt-4 h-dvh overflow-hidden  ">
      <div className="col-span-3 h-dvh overflow-y-scroll scrollbar-hide space-y-4">
        <DashboardToggles/>

      <FleetSidebar />
      
      </div>
      <div className="self-start space-y-2 col-span-6 overflow-hidden">
        <div className="p-2 border    row-span-1   border-gray-200 rounded-lg shadow">
          <div className="size-full   rounded-xl border-gray-500 overflow-hidden">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="size-[30rem] z-10 w-[45rem]"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        
        
      </div>
      <div className="self-start col-span-3 space-y-5">
        <FleetFilter />
        
      </div>
    </div>
  );
}

/*
 */
