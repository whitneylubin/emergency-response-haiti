'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface Props {
  requests: Array<{ id: string; lat: number | null; lng: number | null; summary: string }>;
}

export default function LeafletMap({ requests }: Props) {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `.leaflet-container { width: 100%; height: 300px; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const positions = requests.filter((item) => item.lat && item.lng);

  return (
    <MapContainer center={[18.594, -72.307]} zoom={7} className="h-72 w-full">
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((item) => (
        <Marker key={item.id} position={[item.lat!, item.lng!]} icon={icon}>
          <Popup>{item.summary}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
