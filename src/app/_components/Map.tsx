'use client'
import { useDashStore } from "@/store/dash-store";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./LocationMarker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet's default icon issue with webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MdOutlineGpsFixed } from "react-icons/md";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  iconUrl: markerIcon.src || markerIcon,
  shadowUrl: markerShadow.src || markerShadow,
});

export  function Map() {
  const {accidents } = useDashStore()
  const [useLocation, setUseLocation] = useState(false);
  console.log('use location', useLocation )
  return (
    <div className="p-2 border    row-span-1   border-gray-200 rounded-lg shadow">
      <div className="size-full relative   rounded-xl border-gray-500 overflow-hidden">
        <MapContainer
          center={[7.9465, -1.0232]}
          zoom={6}
          className="size-[30rem] z-10 w-[45rem]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
              <LocationMarker trigger={useLocation}/>
        </MapContainer>
      <div onClick={()=>setUseLocation(state=>!state)} className="rounded-full p-1 right-2 absolute bottom-2 hover:scale-110 duration-150 border border-gray-200  bg-white z-50 shadow">
        <MdOutlineGpsFixed className="size-5 text-gray-500  "/>
        </div>
      </div>
    </div>
  );
}
