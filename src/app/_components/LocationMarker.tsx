// LocationMarker.tsx
'use client'
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function LocationMarker({ trigger }: { trigger: boolean }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!trigger) return;

    map.locate();

    function onLocationFound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }

    map.on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [trigger, map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}
