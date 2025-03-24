import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers for different types of locations
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const poiIcons = {
  property: L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="background-color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 16px; height: 16px;">
              <path d="M19 9l-7-7-7 7v11a2 2 0 002 2h10a2 2 0 002-2V9z" />
            </svg>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  }),
  park: createCustomIcon('#10b981'), // green
  education: createCustomIcon('#8b5cf6'), // purple
  grocery: createCustomIcon('#f59e0b'), // amber
  medical: createCustomIcon('#ef4444'), // red
  recreation: createCustomIcon('#06b6d4'), // cyan
  dining: createCustomIcon('#ec4899'), // pink
  shopping: createCustomIcon('#f97316'), // orange
  culture: createCustomIcon('#6366f1'), // indigo
  transport: createCustomIcon('#475569'), // slate
  // Default for any other type
  default: createCustomIcon('#6b7280'), // gray
};

const MapView = ({ 
  propertyLocation, 
  nearbyPlaces = [], 
  showRadius = true, 
  radiusInKm = 1,
  height = "400px" 
}) => {
  // Convert km to meters for the circle radius
  const radiusInMeters = radiusInKm * 1000;
  
  // Determine icon for a place based on its type
  const getIcon = (type) => {
    const normalizedType = type?.toLowerCase();
    return poiIcons[normalizedType] || poiIcons.default;
  };
  
  // Parse string coordinates if needed
  const parseCoordinates = (coords) => {
    if (Array.isArray(coords)) return coords;
    if (typeof coords === 'string') {
      // Try to parse from string like "lat,lng"
      const parts = coords.split(',').map(p => parseFloat(p.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts;
      }
    }
    // Default to NYC if invalid
    return [40.7128, -74.0060];
  };
  
  const coordinates = parseCoordinates(propertyLocation);
  
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height }}>
      <MapContainer 
        center={coordinates} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Property Marker */}
        <Marker 
          position={coordinates}
          icon={poiIcons.property}
        >
          <Popup>
            <div className="text-center">
              <span className="font-bold text-blue-600 block">Property Location</span>
            </div>
          </Popup>
        </Marker>
        
        {/* Radius Circle */}
        {showRadius && (
          <Circle 
            center={coordinates} 
            radius={radiusInMeters}
            pathOptions={{ 
              fillColor: '#3b82f6', 
              fillOpacity: 0.1, 
              color: '#3b82f6', 
              opacity: 0.3 
            }}
          />
        )}
        
        {/* Nearby Places Markers */}
        {nearbyPlaces.map((place, index) => {
          // Convert distance string (e.g. "0.5 miles") to number for calculating position
          let distanceValue = 0.3; // Default if parsing fails
          const distanceMatch = place.distance?.match(/(\d+\.?\d*)/);
          if (distanceMatch) {
            distanceValue = parseFloat(distanceMatch[1]);
            // Convert miles to km if needed
            if (place.distance.includes('mile')) {
              distanceValue *= 1.60934;
            }
          }
          
          // Calculate a random position around the property based on the distance
          // This is just a simulation since we don't have real coordinates for nearby places
          const angle = (index * (360 / nearbyPlaces.length)) * (Math.PI / 180);
          const lat = coordinates[0] + (distanceValue / 111) * Math.cos(angle);
          const lng = coordinates[1] + (distanceValue / (111 * Math.cos(coordinates[0] * (Math.PI / 180)))) * Math.sin(angle);
          
          return (
            <Marker 
              key={index}
              position={[lat, lng]}
              icon={getIcon(place.type)}
              eventHandlers={{
                click: () => {
                  // Do nothing for now
                }
              }}
            >
              <Popup>
                <div className="text-center">
                  <span className="font-bold block">{place.name}</span>
                  <span className="text-sm text-gray-600 capitalize">{place.type}</span>
                  <span className="text-sm block">{place.distance}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md z-[1000] text-sm max-w-xs">
        <p className="font-medium mb-1 text-gray-700">Map Legend</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1.5"></div>
            <span>Property</span>
          </div>
          {nearbyPlaces.length > 0 && Array.from(new Set(nearbyPlaces.map(p => p.type))).map((type, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-1.5 ${getIconColor(type)}`}></div>
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper to get color class based on type
const getIconColor = (type) => {
  const colorMap = {
    park: "bg-green-500",
    education: "bg-purple-500",
    grocery: "bg-amber-500",
    medical: "bg-red-500",
    recreation: "bg-cyan-500",
    dining: "bg-pink-500",
    shopping: "bg-orange-500",
    culture: "bg-indigo-500",
    transport: "bg-slate-500",
  };
  
  return colorMap[type?.toLowerCase()] || "bg-gray-500";
};

export default MapView; 