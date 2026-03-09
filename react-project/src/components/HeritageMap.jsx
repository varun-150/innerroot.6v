import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix for default marker icons in React Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Example heritage locations data
const heritageLocations = [
    {
        id: 1,
        name: 'Varanasi',
        lat: 25.3176,
        lng: 82.9739,
        description: 'Spiritual capital of India, known for its ghats and temples along the Ganges.',
        image: 'https://images.unsplash.com/photo-1560384734-b91c0e39aee4?auto=format&fit=crop&q=80&w=400',
        type: 'Spiritual'
    },
    {
        id: 2,
        name: 'Kedarnath Temple',
        lat: 30.7352,
        lng: 79.0669,
        description: 'Ancient Himalayan pilgrimage site dedicated to Lord Shiva.',
        image: 'https://images.unsplash.com/photo-1626084050215-6f81e3381fa1?auto=format&fit=crop&q=80&w=400',
        type: 'Temple'
    },
    {
        id: 3,
        name: 'Rameshwaram Temple',
        lat: 9.2881,
        lng: 79.3174,
        description: 'One of the Char Dhams, famous for its long corridor and sacred teerthams.',
        image: 'https://images.unsplash.com/photo-1627885740411-bcbf813426e2?auto=format&fit=crop&q=80&w=400',
        type: 'Temple'
    },
    {
        id: 4,
        name: 'Hampi',
        lat: 15.3350,
        lng: 76.4600,
        description: 'UNESCO World Heritage Site with mesmerizing ruins of the Vijayanagara Empire.',
        image: 'https://images.unsplash.com/photo-1600008581786-9acab420aab1?auto=format&fit=crop&q=80&w=400',
        type: 'Historical'
    },
    {
        id: 5,
        name: 'Konark Sun Temple',
        lat: 19.8876,
        lng: 86.0945,
        description: 'Architectural marvel shaped like a giant chariot, dedicated to the Sun God.',
        image: 'https://images.unsplash.com/photo-1596409848520-22709e8647e3?auto=format&fit=crop&q=80&w=400',
        type: 'Monument'
    },
    {
        id: 6,
        name: 'Ajanta & Ellora Caves',
        lat: 20.5519,
        lng: 75.7033,
        description: 'Ancient rock-cut caves featuring exquisite Buddhist and Hindu art.',
        image: 'https://images.unsplash.com/photo-1610056156360-318e47f2ef87?auto=format&fit=crop&q=80&w=400',
        type: 'Historical'
    },
    {
        id: 7,
        name: 'Bodh Gaya',
        lat: 24.6961,
        lng: 84.9869,
        description: 'The sacred place where Gautama Buddha attained enlightenment.',
        image: 'https://images.unsplash.com/photo-1588691503920-00ad7fa91666?auto=format&fit=crop&q=80&w=400',
        type: 'Spiritual'
    }
];

// Custom map zoom controller
const MapController = ({ selectedLocation }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedLocation) {
            map.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
                duration: 1.5
            });
        }
    }, [selectedLocation, map]);
    return null;
};

const HeritageMap = ({ onLocationSelect, selectedLocation, isMobile }) => {
    // Center of India
    const defaultCenter = [22.3511, 78.6677];
    const defaultZoom = isMobile ? 4 : 5;

    return (
        <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                className="h-full w-full outline-none"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles grayscale opacity-90 sepia-[0.3] hue-rotate-[-30deg] invert-[0.9]"
                />

                {heritageLocations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                        eventHandlers={{
                            click: () => {
                                if (onLocationSelect) onLocationSelect(location);
                            },
                        }}
                    >
                        <Popup className="heritage-popup custom-popup">
                            <div className="w-56 overflow-hidden rounded-lg bg-slate-900 border border-amber-500/30 text-slate-200">
                                <div className="h-28 overflow-hidden relative">
                                    <img
                                        src={location.image}
                                        alt={location.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-600/90 text-white text-xs rounded-full font-medium">
                                        {location.type}
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-serif text-lg font-bold text-amber-500 mb-1">{location.name}</h3>
                                    <p className="text-sm text-slate-300 mb-3 line-clamp-2 leading-tight">
                                        {location.description}
                                    </p>
                                    <Link
                                        to={`/explore?location=${location.id}`}
                                        className="block w-full text-center py-1.5 px-3 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded transition-colors duration-300 font-medium"
                                    >
                                        Explore Details
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <MapController selectedLocation={selectedLocation} />
            </MapContainer>
        </div>
    );
};

export { heritageLocations };
export default HeritageMap;
