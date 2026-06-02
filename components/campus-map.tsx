"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Campus } from "@/config/data";

// Fix Leaflet missing icon marker issues by resolving URLs to unpkg CDN
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

interface CampusMapProps {
  activeCampus: Campus;
  campuses: Campus[];
}

export default function CampusMap({ activeCampus, campuses }: CampusMapProps) {
  return (
    <MapContainer center={activeCampus.coordinates} zoom={15} className="h-full w-full z-0">
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <ChangeView center={activeCampus.coordinates} />
      {campuses.map((c) => (
        <Marker key={c.name} position={c.coordinates}>
          <Popup>
            <div className="text-center font-sans">
              <strong className="text-primary-navy">{c.displayName}</strong>
              <p className="text-xs text-slate-600 mt-1 max-w-[200px] leading-relaxed">
                {c.officeAddress}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
