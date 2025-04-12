import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Location {
  city: string;
  lat: number;
  lng: number;
}

interface ServiceAreaMapProps {
  locations: Location[];
}

const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ locations }) => {
  // Calculate center point of all locations
  const center = locations.reduce(
    (acc, loc) => ({
      lat: acc.lat + loc.lat / locations.length,
      lng: acc.lng + loc.lng / locations.length
    }),
    { lat: 0, lng: 0 }
  );

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <Marker
          key={location.city}
          position={[location.lat, location.lng]}
          icon={defaultIcon}
        >
          <Popup>{location.city}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceAreaMap;