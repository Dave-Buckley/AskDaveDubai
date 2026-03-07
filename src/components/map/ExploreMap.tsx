import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Category, Place } from './NeighbourhoodMap';
import { DINING_CATEGORIES, DINING_PLACES } from './DiningMap';
import { EDUCATION_CATEGORIES, EDUCATION_PLACES } from './EducationMap';
import { HEALTHCARE_CATEGORIES, HEALTHCARE_PLACES } from './HealthcareMap';
import { FITNESS_CATEGORIES, FITNESS_PLACES } from './FitnessMap';
import { ESSENTIALS_CATEGORIES, ESSENTIALS_PLACES } from './EssentialsMap';
import { OUTDOORS_CATEGORIES, OUTDOORS_PLACES } from './OutdoorsMap';
import { TRANSPORT_CATEGORIES, TRANSPORT_PLACES } from './TransportMap';
import { SHOPPING_CATEGORIES, SHOPPING_PLACES } from './ShoppingMap';

interface TabData {
  id: string;
  label: string;
  icon: string;
  categories: Category[];
  places: Place[];
  center: [number, number];
  zoom: number;
}

const TABS: TabData[] = [
  { id: 'dining', label: 'Dining & Nightlife', icon: '🍽️', categories: DINING_CATEGORIES, places: DINING_PLACES, center: [25.200, 55.272], zoom: 14 },
  { id: 'education', label: 'Education', icon: '🎓', categories: EDUCATION_CATEGORIES, places: EDUCATION_PLACES, center: [25.195, 55.265], zoom: 13 },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥', categories: HEALTHCARE_CATEGORIES, places: HEALTHCARE_PLACES, center: [25.205, 55.272], zoom: 13 },
  { id: 'fitness', label: 'Fitness', icon: '💪', categories: FITNESS_CATEGORIES, places: FITNESS_PLACES, center: [25.200, 55.272], zoom: 14 },
  { id: 'essentials', label: 'Essentials', icon: '🛒', categories: ESSENTIALS_CATEGORIES, places: ESSENTIALS_PLACES, center: [25.198, 55.272], zoom: 14 },
  { id: 'outdoors', label: 'Outdoors', icon: '🌴', categories: OUTDOORS_CATEGORIES, places: OUTDOORS_PLACES, center: [25.200, 55.270], zoom: 13 },
  { id: 'transport', label: 'Transport', icon: '🚇', categories: TRANSPORT_CATEGORIES, places: TRANSPORT_PLACES, center: [25.205, 55.275], zoom: 13 },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', categories: SHOPPING_CATEGORIES, places: SHOPPING_PLACES, center: [25.200, 55.272], zoom: 14 },
];

function getInitialTab(): string {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1);
    if (TABS.find(t => t.id === hash)) return hash;
  }
  return 'dining';
}

function getGoogleMapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}&query_place_id=${encodeURIComponent(place.name + ' Dubai')}`;
}

function getDirectionsUrl(place: Place): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
}

export default function ExploreMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);

  const [activeTabId, setActiveTabId] = useState(getInitialTab);
  const [activeSubCategories, setActiveSubCategories] = useState<Set<string>>(new Set());
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeTab = TABS.find(t => t.id === activeTabId)!;

  // Reset sub-category filters when tab changes
  useEffect(() => {
    setActiveSubCategories(new Set(activeTab.categories.map(c => c.id)));
    setSearchQuery('');
    setSelectedPlace(null);
  }, [activeTabId]);

  // Hash-based deep linking
  const switchTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
  }, []);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1);
      if (TABS.find(t => t.id === hash)) setActiveTabId(hash);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const toggleSubCategory = (id: string) => {
    setActiveSubCategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAllSub = () => {
    if (activeSubCategories.size === activeTab.categories.length) {
      setActiveSubCategories(new Set());
    } else {
      setActiveSubCategories(new Set(activeTab.categories.map(c => c.id)));
    }
  };

  const filteredPlaces = useMemo(() => {
    let result = activeTab.places.filter(p => activeSubCategories.has(p.category));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        activeTab.categories.find(c => c.id === p.category)?.label.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, activeSubCategories, searchQuery]);

  const groupedPlaces = useMemo(() => {
    const groups: Record<string, Place[]> = {};
    activeTab.categories.forEach(c => { groups[c.id] = []; });
    filteredPlaces.forEach(p => {
      if (groups[p.category]) groups[p.category].push(p);
    });
    return groups;
  }, [filteredPlaces, activeTab]);

  // Initialize map (once)
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      const tab = TABS.find(t => t.id === getInitialTab())!;
      const map = L.map(mapRef.current!, {
        center: tab.center,
        zoom: tab.zoom,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);
      mapInstanceRef.current = map;
      leafletRef.current = L;
      layerGroupRef.current = L.layerGroup().addTo(map);
      setMapLoaded(true);
      setTimeout(() => map.invalidateSize(), 100);
    });
    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, []);

  // Update markers via LayerGroup swap (no map recreate)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletRef.current;
    const group = layerGroupRef.current;
    if (!map || !L || !group || !mapLoaded) return;

    group.clearLayers();

    filteredPlaces.forEach(place => {
      const cat = activeTab.categories.find(c => c.id === place.category);
      const color = cat?.color || '#c9a96e';
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;
          background:${color};
          border:2px solid rgba(255,255,255,0.9);
          border-radius:50%;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);
          display:flex;align-items:center;justify-content:center;
          font-size:14px;line-height:1;
          cursor:pointer;
          transition:transform 0.2s;
        ">${cat?.icon || ''}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });

      const marker = L.marker([place.lat, place.lng], { icon })
        .bindPopup(
          `<div style="font-family:Inter,system-ui,sans-serif;min-width:200px;padding:4px 0;">
            <div style="font-size:14px;font-weight:600;margin-bottom:4px;color:#fafafa;">${place.name}</div>
            <div style="font-size:11px;color:#999;margin-bottom:8px;">${place.description || ''}</div>
            <div style="display:flex;gap:8px;">
              <a href="${getGoogleMapsUrl(place)}" target="_blank" rel="noopener noreferrer"
                 style="font-size:11px;color:#c9a96e;text-decoration:none;font-weight:500;">
                View on Maps
              </a>
              <a href="${getDirectionsUrl(place)}" target="_blank" rel="noopener noreferrer"
                 style="font-size:11px;color:#c9a96e;text-decoration:none;font-weight:500;">
                Directions
              </a>
            </div>
          </div>`,
          { closeButton: false, className: 'dark-popup' }
        );

      marker.on('mouseover', function() {
        (this as any)._icon.firstChild.style.transform = 'scale(1.3)';
      });
      marker.on('mouseout', function() {
        (this as any)._icon.firstChild.style.transform = 'scale(1)';
      });

      group.addLayer(marker);
    });
  }, [filteredPlaces, mapLoaded, activeTab]);

  // Pan map to tab's default view on tab change
  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      mapInstanceRef.current.flyTo(activeTab.center, activeTab.zoom, { duration: 0.5 });
    }
  }, [activeTabId, mapLoaded]);

  const flyTo = (place: Place) => {
    setSelectedPlace(place);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([place.lat, place.lng], 16, { duration: 0.8 });
      layerGroupRef.current?.eachLayer((layer: any) => {
        if (layer._latlng?.lat === place.lat && layer._latlng?.lng === place.lng) {
          layer.openPopup();
        }
      });
    }
  };

  // Invalidate size on sidebar toggle
  useEffect(() => {
    if (mapInstanceRef.current) {
      requestAnimationFrame(() => {
        mapInstanceRef.current?.invalidateSize({ animate: false, pan: false });
      });
    }
  }, [sidebarOpen]);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .dark-popup .leaflet-popup-content-wrapper {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .dark-popup .leaflet-popup-tip {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #fafafa !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #333 !important;
        }
        .explore-tabs::-webkit-scrollbar { display: none; }
      `}} />

      {/* Tab Bar */}
      <div className="border border-white/10 border-b-0 bg-[#0a0a0a]">
        <div className="flex overflow-x-auto explore-tabs" style={{ scrollbarWidth: 'none' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                activeTabId === tab.id
                  ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                  : 'border-transparent text-white/35 hover:text-white/55 hover:bg-white/[0.02]'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-0 border border-white/10 overflow-hidden" style={{ height: '700px' }}>
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-full lg:w-96' : 'w-0 lg:w-0'} flex-shrink-0 bg-[#0f0f0f] overflow-hidden transition-all duration-300 flex flex-col`}>
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={`Search ${activeTab.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>
          </div>

          {/* Sub-category Filters */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">Categories</span>
              <button onClick={toggleAllSub} className="text-[10px] tracking-wider uppercase text-[#c9a96e] hover:text-[#e0c98a] transition-colors">
                {activeSubCategories.size === activeTab.categories.length ? 'Hide All' : 'Show All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeTab.categories.map(cat => {
                const isActive = activeSubCategories.has(cat.id);
                const count = activeTab.places.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubCategory(cat.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 rounded-sm"
                    style={{
                      background: isActive ? `${cat.color}20` : 'transparent',
                      border: `1px solid ${isActive ? cat.color + '60' : 'rgba(255,255,255,0.08)'}`,
                      color: isActive ? cat.color : 'rgba(255,255,255,0.35)',
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    <span style={{ fontSize: '12px' }}>{cat.icon}</span>
                    {cat.label}
                    <span style={{ fontSize: '10px', opacity: 0.6, marginLeft: '2px' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Places List */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
            {activeTab.categories.filter(c => activeSubCategories.has(c.id) && groupedPlaces[c.id]?.length > 0).map(cat => (
              <div key={cat.id}>
                <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 sticky top-0 z-10 backdrop-blur-sm">
                  <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: cat.color }}>
                    {cat.icon} {cat.label} ({groupedPlaces[cat.id].length})
                  </span>
                </div>
                {groupedPlaces[cat.id].map((place, i) => (
                  <button
                    key={i}
                    onClick={() => flyTo(place)}
                    className="w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors group"
                    style={{ background: selectedPlace === place ? 'rgba(201,169,110,0.08)' : undefined }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm text-white/90 font-medium group-hover:text-[#c9a96e] transition-colors">
                          {place.name}
                        </div>
                        {place.description && (
                          <div className="text-[11px] text-white/35 mt-0.5">{place.description}</div>
                        )}
                      </div>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-[#c9a96e] flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            ))}
            {filteredPlaces.length === 0 && (
              <div className="p-8 text-center text-white/30 text-sm">
                No places found. Try adjusting your search or filters.
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-white/10 text-[11px] text-white/30">
            Showing {filteredPlaces.length} of {activeTab.places.length} places
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 z-[1000] w-10 h-10 bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              )}
            </svg>
          </button>

          <button
            onClick={() => mapInstanceRef.current?.flyTo(activeTab.center, activeTab.zoom, { duration: 0.8 })}
            className="absolute top-4 right-4 z-[1000] px-3 py-2 bg-[#1a1a1a] border border-white/10 text-[11px] tracking-wider uppercase text-white/50 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
          >
            Reset View
          </button>

          <div ref={mapRef} className="w-full h-full" style={{ background: '#1a1a2e' }} />
        </div>
      </div>
    </div>
  );
}
