'use client'
import { useDashStore } from '@/store/dash-store';
import { set } from 'mongoose';
import { useMapEvents } from 'react-leaflet'

export function MapClickHandler() {
  const {setLatLng} = useDashStore();
  useMapEvents({
    click(e) {
      setLatLng(e.latlng );
      
      console.log('Clicked location:', e.latlng);
      // You can also use e.latlng.lat and e.latlng.lng separately
    },
  });

  return null; // This component doesn't render anything visible
}