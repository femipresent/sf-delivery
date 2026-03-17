import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons broken by vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored dot icon
const createColoredIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

// Truck icon
const createTruckIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="width:30px;height:30px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:15px;">🚛</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

// Auto-fit bounds helper
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [40, 40] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 13);
    }
  }, [positions, map]);
  return null;
};

/**
 * MapView - Reusable Leaflet map (no API key needed)
 *
 * Props:
 *  center      [lat, lng]   default center
 *  zoom        number       default zoom
 *  height      string       CSS height e.g. "400px"
 *  markers     Array of { position:[lat,lng], label, popup, color, type:'truck'|'dot'|'default' }
 *  route       Array of [lat,lng]  draws a dashed polyline
 *  routeColor  string       polyline color
 *  fitBounds   boolean      auto-fit map to all markers
 */
const MapView = ({
  center = [6.5244, 3.3792],
  zoom = 12,
  height = '400px',
  markers = [],
  route = [],
  routeColor = '#3B82F6',
  fitBounds = true,
}) => {
  const allPositions = markers.map((m) => m.position).filter(Boolean);

  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {fitBounds && allPositions.length > 0 && <FitBounds positions={allPositions} />}

        {route.length > 1 && (
          <Polyline positions={route} pathOptions={{ color: routeColor, weight: 4, opacity: 0.85, dashArray: '8 5' }} />
        )}

        {markers.map((marker, i) => {
          if (!marker.position) return null;
          const icon =
            marker.type === 'truck' ? createTruckIcon(marker.color || '#3B82F6') :
            marker.type === 'dot'   ? createColoredIcon(marker.color || '#3B82F6') :
            new L.Icon.Default();

          return (
            <Marker key={i} position={marker.position} icon={icon}>
              {(marker.popup || marker.label) && (
                <Popup>
                  <div style={{ fontSize: 13 }}>
                    {marker.label && <strong>{marker.label}</strong>}
                    {marker.popup && <p style={{ margin: '4px 0 0', color: '#555' }}>{marker.popup}</p>}
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
