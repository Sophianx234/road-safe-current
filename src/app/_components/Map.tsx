import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function Map() {
  return (
  
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
  )
}