import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TrackingMapProps {
  deliveryLocation: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}

const TrackingMap = ({ deliveryLocation, destination }: TrackingMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const center: [number, number] = [
      (deliveryLocation.lat + destination.lat) / 2,
      (deliveryLocation.lng + destination.lng) / 2,
    ];

    // Initialize map
    const map = L.map(mapRef.current).setView(center, 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create custom icons
    const deliveryIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const destinationIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add markers
    L.marker([deliveryLocation.lat, deliveryLocation.lng], { icon: deliveryIcon })
      .bindPopup('<strong>Delivery Partner</strong><br/>Current Location')
      .addTo(map);

    L.marker([destination.lat, destination.lng], { icon: destinationIcon })
      .bindPopup('<strong>Destination</strong><br/>Delivery Address')
      .addTo(map);

    // Add route line
    const routePath: [number, number][] = [
      [deliveryLocation.lat, deliveryLocation.lng],
      [destination.lat, destination.lng]
    ];
    
    L.polyline(routePath, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(map);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [deliveryLocation, destination]);

  return (
    <div 
      ref={mapRef} 
      className="h-[400px] w-full rounded-lg overflow-hidden border"
    />
  );
};

export default TrackingMap;
