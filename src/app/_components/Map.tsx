import { MapContainer, TileLayer } from "react-leaflet";

export  function Map() {


  return (
    <div className="p-2 border    row-span-1   border-gray-200 rounded-lg shadow">
      <div className="size-full   rounded-xl border-gray-500 overflow-hidden">
        <MapContainer
          center={[7.9465, -1.0232]}
          zoom={6}
          className="size-[30rem] z-10 w-[45rem]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <Marker position={[7.9465, -1.0232]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
}
