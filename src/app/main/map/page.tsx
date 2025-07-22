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
    <div className=" mt-4 flex gap-2 items-center   ">
      <div>

      </div>
      {/* map */}
      <div className="self-start space-y-2 ">
        <div className="p-2 border  col-span-8 row-span-1 z-10 border-gray-200 rounded-lg shadow">
          <div className="size-[28rem] w-[40rem]   rounded-xl border-gray-500 overflow-hidden">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="size-[30rem] z-0 w-[45rem]"
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
        
        <div>

          
        </div>
      </div>
      
    </div>
  );
}

/*
 */
