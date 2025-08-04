'use client'
import { useDashStore } from "@/store/dash-store";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
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
  console.log('accidents', accidents )
  function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "fatal":
      return "red";
    case "serious":
      return "orange";
    case "minor":
      return "yellow";
    default:
      return "blue";
  }
}

  return (
    <div className="p-2 border    row-span-1   border-gray-200 rounded-lg shadow">
      <div className="size-full relative   rounded-xl border-gray-500 overflow-hidden">
        <MapContainer
          center={[7.9465, -1.0232]}
          zoom={6}
          className="size-[30rem] z-10 w-[45rem]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {accidents.map((accident) => (
  <Circle
    key={accident._id}
    center={[accident.location.lat, accident.location.lng]}
    radius={5000} // in meters — adjust as needed for your hotspot size
    pathOptions={{
      color: getSeverityColor(accident.severity),
      fillColor: getSeverityColor(accident.severity),
      fillOpacity: 0.4,
    }}
  >
     <Popup>
    <div className="text-sm">
      <strong>{accident.accidentType}</strong><br />
      Severity: {accident.severity}<br />
      Region: {accident.region}<br />
      Date: {accident.date}
    </div>
  </Popup>
  </Circle>
))}

              <LocationMarker trigger={useLocation}/>
              
        </MapContainer>
      <div onClick={()=>setUseLocation(state=>!state)} className="rounded-full p-1 right-2 absolute bottom-2 hover:scale-110 duration-150 border border-gray-200  bg-white z-50 shadow">
        <MdOutlineGpsFixed className="size-5 text-gray-500  "/>
        </div>
      </div>
    </div>
  );
}
