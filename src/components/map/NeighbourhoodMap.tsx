import { useState, useEffect, useRef, useMemo } from 'react';

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Place {
  name: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
}

interface Props {
  categories: Category[];
  places: Place[];
  center?: [number, number];
  zoom?: number;
}

function getGoogleMapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}&query_place_id=${encodeURIComponent(place.name + ' Dubai')}`;
}

function getDirectionsUrl(place: Place): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
}

export default function NeighbourhoodMap({ categories, places, center = [25.197, 55.274], zoom = 13 }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set(categories.map(c => c.id)));
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleCategory = (id: string) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (activeCategories.size === categories.length) {
      setActiveCategories(new Set());
    } else {
      setActiveCategories(new Set(categories.map(c => c.id)));
    }
  };

  const filteredPlaces = useMemo(() => {
    let result = places.filter(p => activeCategories.has(p.category));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        categories.find(c => c.id === p.category)?.label.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategories, searchQuery, places, categories]);

  const flyTo = (place: Place) => {
    setSelectedPlace(place);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([place.lat, place.lng], 16, { duration: 0.8 });
      markersRef.current.forEach(m => {
        if (m._latlng.lat === place.lat && m._latlng.lng === place.lng) {
          m.openPopup();
        }
      });
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      const map = L.map(mapRef.current!, {
        center,
        zoom,
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
      setMapLoaded(true);
      setTimeout(() => map.invalidateSize(), 100);
    });
    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      filteredPlaces.forEach(place => {
        const cat = categories.find(c => c.id === place.category);
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
          .addTo(mapInstanceRef.current!)
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

        markersRef.current.push(marker);
      });
    });
  }, [filteredPlaces, mapLoaded, categories]);

  const groupedPlaces = useMemo(() => {
    const groups: Record<string, Place[]> = {};
    categories.forEach(c => { groups[c.id] = []; });
    filteredPlaces.forEach(p => {
      if (groups[p.category]) groups[p.category].push(p);
    });
    return groups;
  }, [filteredPlaces, categories]);

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
      `}} />

      <div className="flex flex-col lg:flex-row gap-0 border border-[var(--color-border)] overflow-hidden" style={{ height: '700px' }}>
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-full lg:w-96' : 'w-0 lg:w-0'} flex-shrink-0 bg-[#0f0f0f] overflow-hidden transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>
          </div>

          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">Categories</span>
              <button onClick={toggleAll} className="text-[10px] tracking-wider uppercase text-[#c9a96e] hover:text-[#e0c98a] transition-colors">
                {activeCategories.size === categories.length ? 'Hide All' : 'Show All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => {
                const isActive = activeCategories.has(cat.id);
                const count = places.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
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

          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
            {categories.filter(c => activeCategories.has(c.id) && groupedPlaces[c.id]?.length > 0).map(cat => (
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
            Showing {filteredPlaces.length} of {places.length} places
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
            onClick={() => mapInstanceRef.current?.flyTo(center, zoom, { duration: 0.8 })}
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
