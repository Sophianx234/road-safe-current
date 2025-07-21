// File: components/LiveMapDashboard.tsx
"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, CarFront, Map as MapIcon, CircleUser } from "lucide-react";

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
  { id: 1, name: "Noah Car", km: 486, coords: [5.560, -0.205] },
  { id: 2, name: "Jeep Car", km: 486, coords: [5.562, -0.200] },
  { id: 3, name: "Peterbilt Truck", km: 486, coords: [5.565, -0.210] },
];

const tripRoute: [number, number][] = [
  [5.560, -0.205],
  [5.561, -0.202],
  [5.562, -0.200],
  [5.564, -0.198],
  [5.565, -0.210],
];

export default function LiveMapDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(dummyFleet[0]);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 bg-white border-r p-4 flex flex-col gap-4">
        <MapIcon className="h-6 w-6 text-orange-500" />
        <CarFront className="h-6 w-6" />
        <Truck className="h-6 w-6" />
        <CircleUser className="h-6 w-6" />
      </aside>

      {/* Main Map */}
      <main className="col-span-7 relative">
        <MapContainer center={[5.560, -0.205]} zoom={14} className="h-full w-full z-0">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {dummyFleet.map(vehicle => (
            <Marker key={vehicle.id} position={vehicle.coords} icon={truckIcon}>
              <Popup>{vehicle.name}</Popup>
            </Marker>
          ))}
          <Polyline positions={tripRoute} color="orange" />
        </MapContainer>
      </main>

      {/* Right Panel */}
      <section className="col-span-4 bg-white border-l p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{selectedVehicle.name}</CardTitle>
            <p className="text-sm text-gray-500">{selectedVehicle.km} KM Traveled</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto">
              <ul className="flex flex-col gap-2">
                {dummyFleet.map(vehicle => (
                  <li
                    key={vehicle.id}
                    className={`p-2 border rounded-md cursor-pointer ${selectedVehicle.id === vehicle.id ? "bg-orange-100" : ""}`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex justify-between">
                      <span>{vehicle.name}</span>
                      <span className="text-sm text-gray-500">{vehicle.km} KM</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}