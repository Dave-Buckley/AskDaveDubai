import { useEffect, useRef } from 'react';

interface Building {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  branded: boolean;
  brandName?: string;
  tagline: string;
}

interface Props {
  buildings: Building[];
}

export default function BuildingsMap({ buildings }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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
        center: [25.1900, 55.2740],
        zoom: 15,
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      buildings.forEach((b) => {
        const color = b.branded ? '#c9a96e' : '#8b9dc3';
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:24px;height:24px;
            background:${color};
            border:2px solid rgba(255,255,255,0.9);
            border-radius:50%;
            box-shadow:0 2px 8px rgba(0,0,0,0.5);
            display:flex;align-items:center;justify-content:center;
            font-size:11px;line-height:1;
            cursor:pointer;
            transition:transform 0.2s;
          ">${b.branded ? '★' : '◆'}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -14],
        });

        const marker = L.marker([b.lat, b.lng], { icon })
          .bindPopup(
            `<div style="font-family:Inter,system-ui,sans-serif;min-width:180px;padding:4px 0;">
              <div style="font-size:13px;font-weight:600;color:#fafafa;margin-bottom:2px;">${b.name}</div>
              ${b.brandName ? `<div style="font-size:10px;color:#c9a96e;margin-bottom:4px;">${b.brandName}</div>` : ''}
              <div style="font-size:11px;color:#999;margin-bottom:8px;line-height:1.4;">${b.tagline}</div>
              <a href="/buildings/${b.slug}" style="font-size:11px;color:#c9a96e;text-decoration:none;font-weight:500;">
                View Profile &rarr;
              </a>
            </div>`,
            { closeButton: false, className: 'dark-popup' }
          );

        marker.on('mouseover', function () {
          (this as any)._icon.firstChild.style.transform = 'scale(1.3)';
        });
        marker.on('mouseout', function () {
          (this as any)._icon.firstChild.style.transform = 'scale(1)';
        });

        marker.addTo(map);
      });

      mapInstanceRef.current = map;
      setTimeout(() => map.invalidateSize(), 100);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [buildings]);

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
      <div className="flex items-center gap-6 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#c9a96e] border border-white/60"></div>
          <span className="text-xs text-white/50">Hotel-Branded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b9dc3] border border-white/60"></div>
          <span className="text-xs text-white/50">Residential</span>
        </div>
      </div>
      <div
        ref={mapRef}
        className="w-full border border-white/10"
        style={{ height: '450px', background: '#1a1a2e' }}
      />
      <p className="text-[10px] text-white/30 mt-2">Click a marker to see building details. Scroll to zoom is disabled; use the +/- controls.</p>
    </div>
  );
}
