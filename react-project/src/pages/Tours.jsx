import React, { useState } from 'react';
import { getHeritageSites } from '../services/api';
import { Reveal, Stagger } from '../components/Reveal';
import HeritageMap from '../components/HeritageMap';

const Tours = () => {
    const [activeTour, setActiveTour] = useState(null);
    const [toursData, setToursData] = useState([]);

    React.useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getHeritageSites();
                setToursData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Failed to fetch tours:", error);
                setToursData([]);
            }
        };
        fetchTours();
    }, []);

    const handleTourClick = (tour) => {
        setActiveTour(tour);
    };

    const handleMapMarkerClick = (id) => {
        // Direct mapping since IDs match, but keeping structure for extensibility
        const tour = toursData.find(t => t.id === id);
        if (tour) setActiveTour(tour);
    };

    return (
        <section id="page-tours" className="page active block opacity-100">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-12">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">Discover India Through Its Heritage 🌏</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg leading-relaxed">
                            Click on the map points to uncover culture, history, and ancient roots.
                        </p>
                    </Reveal>

                    {/* Map Overview */}
                    <Reveal className="mb-12">
                        <div className="heritage-card p-6">
                            {/* Interactive Map */}
                            <div className="w-full">
                                <HeritageMap tours={toursData} />
                            </div>
                        </div>
                    </Reveal>

                    {/* Tour Cards */}
                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(Array.isArray(toursData) ? toursData : []).map(tour => (
                            <article
                                key={tour.id}
                                className="tour-card group cursor-pointer relative overflow-hidden rounded-xl h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                onClick={() => handleTourClick(tour)}
                                tabIndex="0"
                                role="button"
                                aria-label={`Start tour of ${tour.title}`}
                            >
                                {/* Background Image with Gradient Overlay */}
                                <div className="absolute inset-0">
                                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-heritage-gold text-black">{tour.duration}</span>
                                            <span className="text-xs font-medium text-white/80 flex items-center gap-1">
                                                <svg className="w-3 h-3 text-heritage-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                                {tour.rating}
                                            </span>
                                        </div>

                                        <h3 className="font-display text-2xl font-bold mb-1 leading-tight">{tour.title}</h3>
                                        <p className="text-sm text-white/70 mb-3 font-medium flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {tour.location}
                                        </p>

                                        <p className="text-white/60 text-sm line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {tour.description}
                                        </p>

                                        <button className="flex items-center gap-2 text-sm font-bold text-heritage-gold group-hover:text-white transition-colors">
                                            <span>Start Virtual Tour</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Play Icon Overlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </article>
                        ))}
                    </Stagger>
                </div>
            </div>

            {/* Video Modal */}
            {activeTour && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 animate-in fade-in">
                    <div className="absolute inset-0 bg-transparent" onClick={() => setActiveTour(null)}></div>
                    <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                            <div>
                                <h3 className="text-xl font-display font-bold text-white">{activeTour.title}</h3>
                                <p className="text-sm text-white/50">{activeTour.location}</p>
                            </div>
                            <button
                                onClick={() => setActiveTour(null)}
                                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Video Player Embed */}
                        <div className="aspect-video w-full bg-black">
                            {/* Assuming YouTube embed, handling slightly different formats if necessary */}
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTour.videoUrl.split('/').pop().replace('watch?v=', '')}?autoplay=1`}
                                title={activeTour.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Tours;

