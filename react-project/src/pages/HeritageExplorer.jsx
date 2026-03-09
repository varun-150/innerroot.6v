import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeritageMap, { heritageLocations } from '../components/HeritageMap';

function HeritageExplorer() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-select location based on query param
  useEffect(() => {
    const locId = searchParams.get('location');
    if (locId) {
      const location = heritageLocations.find((l) => l.id.toString() === locId);
      if (location) setSelectedLocation(location);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c10] text-slate-800 dark:text-slate-200 font-sans flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white mb-4">
          Explore India's Sacred Heritage
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          A digital cultural atlas of ancient temples, heritage monuments, and spiritual sites.
        </p>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Info Panel */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6 order-2 lg:order-1 h-full max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" /><path d="m19.07 4.93-14.14 14.14" /></svg>
              Heritage Atlas
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Navigate through India's rich spiritual and cultural tapestry. Select a marker on the map to explore details about sacred places, learn cultural stories, and discover heritage sites interactively.
            </p>

            <div className="space-y-4">
              {heritageLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group hover:shadow-md ${selectedLocation?.id === loc.id
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-500/50'
                    : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-serif text-lg font-bold transition-colors ${selectedLocation?.id === loc.id
                      ? 'text-amber-700 dark:text-amber-500'
                      : 'text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                      }`}>
                      {loc.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 outline outline-1 outline-slate-200 dark:outline-slate-700 rounded-full">
                      {loc.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {loc.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Map Area */}
        <div className="w-full lg:w-2/3 h-[500px] lg:h-[800px] order-1 lg:order-2">
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 relative">
            <HeritageMap
              isMobile={isMobile}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </div>
        </div>
      </main>

      {/* Global Map Styles Fix */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-container {
          background: #e2e8f0;
          font-family: inherit;
        }
        .dark .leaflet-container {
          background: #0f172a;
        }
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 0.5rem;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-popup-tip-container {
          display: none;
        }
        .map-tiles {
          filter: sepia(0.2) hue-rotate(-10deg) saturation(1.5) contrast(1.1);
        }
        .dark .map-tiles {
          filter: grayscale(0.8) invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.2);
        }
        /* Hide Leaflet logo/attribution if desired, or let it blend */
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.7) !important;
          border-top-left-radius: 4px;
        }
        .dark .leaflet-control-attribution {
          background: rgba(15, 23, 42, 0.7) !important;
          color: #94a3b8 !important;
        }
        .dark .leaflet-control-attribution a {
          color: #cbd5e1 !important;
        }
        /* Custom scrollbar for sidebar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(71, 85, 105, 0.5);
        }
      `}} />
    </div>
  );
}

export default HeritageExplorer;
