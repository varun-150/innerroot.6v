import React, { useState, useEffect, useMemo, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// Removed static import

// Using local GeoJSON file downloaded to public/data/india.json
const INDIA_GEO_JSON = "/data/india.json";

const HeritageMap = ({ tours = [] }) => {
    const [geography, setGeography] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [hoveredState, setHoveredState] = useState(null);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height: width * 0.8 }); // Maintain aspect ratio
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch Map Data
    useEffect(() => {
        fetch(INDIA_GEO_JSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load map data: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Determine if GeoJSON (direct features) or TopoJSON
                let features;
                if (data.type === 'FeatureCollection') {
                    features = data.features;
                } else if (data.type === 'Topology') {
                    // Fallback for TopoJSON (though we expect GeoJSON)
                    // features = feature(data, Object.keys(data.objects)[0]).features;
                    throw new Error("Unexpected TopoJSON format. Expected GeoJSON.");
                } else {
                    throw new Error("Unknown map data format");
                }

                setGeography(features);
                setLoading(false);
            })
            .catch(err => {
                console.error("Map Load Error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Memoize the projection and path generator
    const { pathGenerator, projection } = useMemo(() => {
        if (!geography || !dimensions.width) return { pathGenerator: null, projection: null };

        // Manual projection for India - centered and scaled to MAXIMIZE visibility
        const proj = geoMercator()
            .center([80, 23]) // Center on central India
            .scale(dimensions.width * 1.6) // Boost scale to fit box (approx 1300-1500 for standard screens)
            .translate([dimensions.width / 2, dimensions.height / 2]);

        const pathGen = geoPath().projection(proj);

        return { pathGenerator: pathGen, projection: proj };
    }, [geography, dimensions]);

    if (loading) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-gold"></div>
                <span className="ml-3 text-white/70">Loading Map...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[600px] flex flex-col items-center justify-center bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm p-6 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-white mb-2">Unable to load map data</h3>
                <p className="text-white/50 mb-4">{error}</p>
                <div className="text-sm text-white/30">Check your internet connection or GitHub access.</div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-[500px] md:h-[600px] bg-black/20 rounded-xl overflow-hidden relative border border-white/10 backdrop-blur-sm shadow-2xl"
        >
            <svg width={dimensions.width} height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
                <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2D3748" />
                        <stop offset="100%" stopColor="#1A202C" />
                    </linearGradient>
                </defs>

                {/* Map Features (States) */}
                <g className="map-features">
                    {geography && geography.length > 0 ? (
                        geography.map((feature, i) => (
                            <motion.path
                                key={`path-${i}`}
                                d={pathGenerator(feature)}
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.005 }}
                                fill={hoveredState === i ? "#4A5568" : "rgba(255,255,255,0.05)"} // Slight fill for presence
                                stroke={hoveredState === i ? "#F6E05E" : "#E2E8F0"}
                                strokeWidth={hoveredState === i ? "1.5" : "0.75"}
                                onMouseEnter={() => setHoveredState(i)}
                                onMouseLeave={() => setHoveredState(null)}
                                style={{ cursor: "pointer", filter: hoveredState === i ? "drop-shadow(0px 0px 8px rgba(246, 224, 94, 0.5))" : "none" }}
                            />
                        ))
                    ) : (
                        <text x="50%" y="50%" textAnchor="middle" fill="white">No map features found</text>
                    )}
                </g>

                {/* Tour Markers */}
                {tours.map((tour) => {
                    if (!projection) return null;
                    const coords = tour.coordinates;
                    if (!coords || coords.length !== 2) return null;

                    const [x, y] = projection(coords);
                    if (isNaN(x) || isNaN(y)) return null;

                    return (
                        <g key={tour.id} transform={`translate(${x}, ${y})`}>
                            <motion.g
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 1 + Math.random() * 0.5
                                }}
                                whileHover={{ scale: 1.5 }}
                            >
                                {/* Glow Effect */}
                                <circle r={12} fill="rgb(217 119 6 / 0.2)" className="animate-pulse" />
                                {/* Pin */}
                                <circle
                                    r={5}
                                    fill="#D97706"
                                    stroke="#fff"
                                    strokeWidth={1.5}
                                    data-tooltip-id="map-tooltip"
                                    data-tooltip-content={`${tour.title} - ${tour.location}`}
                                    className="cursor-pointer focus:outline-none hover:stroke-heritage-gold"
                                    onClick={() => {
                                        const card = document.getElementById(`tour-card-${tour.id}`);
                                        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                />
                            </motion.g>
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            <Tooltip
                id="map-tooltip"
                style={{
                    backgroundColor: "#1A202C",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    zIndex: 50,
                    fontSize: "0.875rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
            />

            <div className="absolute bottom-4 right-4 bg-black/80 p-4 rounded-xl backdrop-blur-md border border-white/10 max-w-xs shadow-xl">
                <h4 className="text-heritage-gold font-display font-bold mb-1 flex items-center gap-2">
                    <span className="text-xl">🗺️</span> Explore India’s Heritage
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                    Tap the markers to explore monuments, culture, and timeless stories across the map.
                </p>
            </div>
        </div>
    );
};

export default HeritageMap;
