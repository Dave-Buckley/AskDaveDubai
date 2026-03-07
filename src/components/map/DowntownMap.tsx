import { useState, useEffect, useRef, useMemo } from 'react';

const CENTER: [number, number] = [25.1972, 55.2744];
const ZOOM = 14;

interface Place {
  name: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
}

const CATEGORIES = [
  { id: 'buildings', label: 'Residential Buildings', icon: '🏢', color: '#c9a96e' },
  { id: 'schools', label: 'Schools & Nurseries', icon: '🎓', color: '#6366f1' },
  { id: 'hospitals', label: 'Healthcare', icon: '🏥', color: '#ef4444' },
  { id: 'restaurants', label: 'Restaurants', icon: '🍽️', color: '#f97316' },
  { id: 'cafes', label: 'Cafes', icon: '☕', color: '#a16207' },
  { id: 'nightlife', label: 'Bars & Nightlife', icon: '🍸', color: '#ec4899' },
  { id: 'gyms', label: 'Gyms & Fitness', icon: '💪', color: '#22c55e' },
  { id: 'supermarkets', label: 'Supermarkets', icon: '🛒', color: '#3b82f6' },
  { id: 'malls', label: 'Shopping', icon: '🛍️', color: '#a855f7' },
  { id: 'parks', label: 'Parks & Outdoor', icon: '🌴', color: '#14b8a6' },
  { id: 'metro', label: 'Metro Stations', icon: '🚇', color: '#64748b' },
  { id: 'landmarks', label: 'Landmarks', icon: '⭐', color: '#eab308' },
];

const PLACES: Place[] = [
  // Residential Buildings (Downtown Dubai)
  { name: 'Burj Khalifa Residences', lat: 25.1972, lng: 55.2744, category: 'buildings', description: '163 floors, Emaar. World\'s tallest building.' },
  { name: 'Address Downtown', lat: 25.1957, lng: 55.2780, category: 'buildings', description: '63 floors, hotel-branded. Dubai Fountain views.' },
  { name: 'Address Boulevard', lat: 25.1925, lng: 55.2753, category: 'buildings', description: '72 floors, hotel-branded. Boulevard frontage.' },
  { name: 'Address Sky View', lat: 25.1891, lng: 55.2747, category: 'buildings', description: 'Twin towers, sky bridge. Hotel-branded.' },
  { name: 'Address Fountain Views', lat: 25.1942, lng: 55.2798, category: 'buildings', description: '3 towers, hotel-branded. Fountain views.' },
  { name: 'Vida Downtown', lat: 25.1898, lng: 55.2715, category: 'buildings', description: '35 floors, boutique hotel-branded.' },
  { name: 'Vida Residences Downtown', lat: 25.1912, lng: 55.2729, category: 'buildings', description: '56 floors, Vida-branded. Boulevard.' },
  { name: 'Boulevard Point', lat: 25.1908, lng: 55.2761, category: 'buildings', description: '65 floors, Emaar. Good value residential.' },
  { name: 'The Lofts (East & West)', lat: 25.1860, lng: 55.2687, category: 'buildings', description: '2 towers, Emaar. Low service charges.' },
  { name: 'South Ridge', lat: 25.1832, lng: 55.2710, category: 'buildings', description: '6 towers, Emaar. Lowest prices in Downtown.' },
  { name: '8 Boulevard Walk', lat: 25.1930, lng: 55.2774, category: 'buildings', description: '42 floors, Emaar. Studios available.' },
  { name: 'Standpoint Towers', lat: 25.1922, lng: 55.2770, category: 'buildings', description: '2 towers, Emaar. Central location.' },
  { name: 'Claren Towers', lat: 25.1883, lng: 55.2741, category: 'buildings', description: '2 towers (75 & 65 floors), Emaar. Modern.' },
  { name: 'Act One | Act Two', lat: 25.1871, lng: 55.2706, category: 'buildings', description: '2 towers, Emaar. Opera District.' },
  { name: 'Opera Grand', lat: 25.1867, lng: 55.2710, category: 'buildings', description: '66 floors, Emaar. Next to Dubai Opera.' },
  { name: 'Forte', lat: 25.1845, lng: 55.2690, category: 'buildings', description: '78 floors, Emaar. Premium finishes.' },
  { name: 'The Residences (1-9)', lat: 25.1955, lng: 55.2810, category: 'buildings', description: '9 towers, Emaar. Largest units in Downtown.' },
  { name: 'Burj Vista', lat: 25.1900, lng: 55.2730, category: 'buildings', description: '2 towers, Emaar. Head-on Burj views.' },
  { name: 'BLVD Heights', lat: 25.1935, lng: 55.2788, category: 'buildings', description: '2 towers, Emaar. Boulevard frontage.' },
  { name: 'Burj Royale', lat: 25.1878, lng: 55.2756, category: 'buildings', description: '60 floors, Emaar. Studios, investor-friendly.' },
  { name: 'Boulevard Central', lat: 25.1915, lng: 55.2763, category: 'buildings', description: '2 towers, Emaar. Affordable studios.' },
  { name: 'Downtown Views', lat: 25.1842, lng: 55.2725, category: 'buildings', description: '2 towers, Emaar. Canal views, quiet.' },
  { name: '29 Boulevard', lat: 25.1880, lng: 55.2770, category: 'buildings', description: '2 towers (67 & 37 floors), Emaar.' },
  { name: 'Imperial Avenue', lat: 25.1862, lng: 55.2730, category: 'buildings', description: '46 floors, Shapoorji Pallonji. Non-Emaar.' },
  { name: 'Bellevue Towers', lat: 25.1835, lng: 55.2698, category: 'buildings', description: '2 towers, Dubai Properties. Canal views.' },
  { name: 'BLVD Crescent', lat: 25.1948, lng: 55.2795, category: 'buildings', description: '25 floors, Emaar. Low-rise premium.' },

  // Schools & Nurseries
  { name: 'Safa British School', lat: 25.2050, lng: 55.2480, category: 'schools', description: 'British curriculum, KHDA Outstanding. 8 min drive.' },
  { name: 'Safa Community School', lat: 25.2060, lng: 55.2470, category: 'schools', description: 'American/IB, KHDA Outstanding. 8 min drive.' },
  { name: 'Horizon English School', lat: 25.2070, lng: 55.2460, category: 'schools', description: 'British, KHDA Very Good. 10 min drive.' },
  { name: 'JSS Private School', lat: 25.2040, lng: 55.2450, category: 'schools', description: 'Indian CBSE, KHDA Very Good. 10 min drive.' },
  { name: 'Repton School', lat: 25.1680, lng: 55.3050, category: 'schools', description: 'British, KHDA Outstanding. 12 min drive.' },
  { name: 'GEMS Dubai American Academy', lat: 25.1100, lng: 55.2020, category: 'schools', description: 'American, KHDA Outstanding. 15 min drive.' },
  { name: 'Kings\' School Al Barsha', lat: 25.1090, lng: 55.2030, category: 'schools', description: 'British, KHDA Outstanding. 15 min drive.' },
  { name: 'Raffles World Academy', lat: 25.1600, lng: 55.2350, category: 'schools', description: 'IB, KHDA Outstanding. 15 min drive.' },
  { name: 'Blossom Nursery (Business Bay)', lat: 25.1889, lng: 55.2655, category: 'schools', description: 'British EYFS nursery. 5 min drive.' },
  { name: 'Redwood Montessori Nursery', lat: 25.2060, lng: 55.2490, category: 'schools', description: 'Montessori. 10 min drive.' },
  { name: 'Kids First Group Nursery', lat: 25.1870, lng: 55.2650, category: 'schools', description: 'Business Bay. Multiple curricula.' },

  // Healthcare
  { name: 'Mediclinic Parkview Hospital', lat: 25.1720, lng: 55.2510, category: 'hospitals', description: '24/7 hospital. 10-12 min drive.' },
  { name: 'King\'s College Hospital London', lat: 25.1750, lng: 55.2440, category: 'hospitals', description: 'UK-affiliated. Dubai Hills. 12-15 min.' },
  { name: 'Emirates Hospital (Jumeirah)', lat: 25.2180, lng: 55.2500, category: 'hospitals', description: 'Multi-specialty. 12 min drive.' },
  { name: 'Rashid Hospital (A&E)', lat: 25.2300, lng: 55.3180, category: 'hospitals', description: 'Government hospital. 24/7 A&E. 10 min.' },
  { name: 'Dubai Mall Medical Centre', lat: 25.1986, lng: 55.2780, category: 'hospitals', description: 'Walk-in clinic inside Dubai Mall.' },
  { name: 'Aster Clinic (Boulevard Plaza)', lat: 25.1920, lng: 55.2740, category: 'hospitals', description: 'GP walk-in. Downtown.' },
  { name: 'HealthHub Clinic (Dubai Mall)', lat: 25.1983, lng: 55.2785, category: 'hospitals', description: 'General practice, Dubai Mall.' },
  { name: 'Life Pharmacy (Boulevard)', lat: 25.1925, lng: 55.2755, category: 'hospitals', description: 'Full-service pharmacy. Open late.' },
  { name: 'Boots Pharmacy (Dubai Mall)', lat: 25.1982, lng: 55.2788, category: 'hospitals', description: 'UK chain pharmacy.' },

  // Restaurants
  { name: 'At.mosphere (Burj Khalifa L122)', lat: 25.1972, lng: 55.2744, category: 'restaurants', description: 'Fine dining. Highest restaurant in the world.' },
  { name: 'Armani/Ristorante', lat: 25.1975, lng: 55.2747, category: 'restaurants', description: 'Italian fine dining, Armani Hotel.' },
  { name: 'Social by Heinz Beck', lat: 25.1957, lng: 55.2778, category: 'restaurants', description: 'Italian. Three-Michelin-star chef.' },
  { name: 'CÉ LA VI', lat: 25.1891, lng: 55.2747, category: 'restaurants', description: 'Pan-Asian rooftop. Address Sky View.' },
  { name: 'Katsuya (Dubai Mall)', lat: 25.1978, lng: 55.2785, category: 'restaurants', description: 'Japanese-American fusion.' },
  { name: 'Toko (Souk Al Bahar)', lat: 25.1960, lng: 55.2755, category: 'restaurants', description: 'Japanese robata. Fountain views.' },
  { name: 'Kinoya', lat: 25.1920, lng: 55.2750, category: 'restaurants', description: 'Japanese ramen. Casual, excellent.' },
  { name: 'Zuma (DIFC)', lat: 25.2148, lng: 55.2808, category: 'restaurants', description: 'Japanese. Dubai institution.' },
  { name: 'Mimi Mei Fair (DIFC)', lat: 25.2135, lng: 55.2818, category: 'restaurants', description: 'Chinese. Glamorous interiors.' },
  { name: 'Salvaje (DIFC)', lat: 25.2130, lng: 55.2815, category: 'restaurants', description: 'Latin-Asian fusion.' },
  { name: 'Tresind Studio (DIFC)', lat: 25.2142, lng: 55.2815, category: 'restaurants', description: 'Indian. One Michelin star.' },
  { name: 'Eataly (Dubai Mall)', lat: 25.1984, lng: 55.2790, category: 'restaurants', description: 'Italian food hall and restaurant.' },
  { name: 'Serafina (Souk Al Bahar)', lat: 25.1958, lng: 55.2752, category: 'restaurants', description: 'Italian. Terrace with fountain views.' },
  { name: 'Al Hallab (Dubai Mall)', lat: 25.1982, lng: 55.2792, category: 'restaurants', description: 'Lebanese. Grills and mezze.' },
  { name: 'Logma (Dubai Mall)', lat: 25.1980, lng: 55.2788, category: 'restaurants', description: 'Emirati cuisine. Casual format.' },
  { name: 'Bombay Borough', lat: 25.1923, lng: 55.2748, category: 'restaurants', description: 'Modern Indian. Address Boulevard.' },
  { name: 'Nusr-Et (Address Downtown)', lat: 25.1955, lng: 55.2776, category: 'restaurants', description: 'Turkish steakhouse. Salt Bae flagship.' },
  { name: 'The Maine Oyster Bar & Grill', lat: 25.1900, lng: 55.2720, category: 'restaurants', description: 'Seafood. DoubleTree by Hilton.' },
  { name: 'STK (Address Downtown)', lat: 25.1956, lng: 55.2774, category: 'restaurants', description: 'American steakhouse. Nightlife edge.' },
  { name: 'Tim Ho Wan (Dubai Mall)', lat: 25.1981, lng: 55.2793, category: 'restaurants', description: 'Dim sum. Michelin-starred HK chain.' },
  { name: 'Din Tai Fung (Dubai Mall)', lat: 25.1979, lng: 55.2794, category: 'restaurants', description: 'Taiwanese dumplings.' },
  { name: 'The Cheesecake Factory', lat: 25.1980, lng: 55.2790, category: 'restaurants', description: 'American. Huge portions. Dubai Mall.' },
  { name: 'Shake Shack (Dubai Mall)', lat: 25.1983, lng: 55.2791, category: 'restaurants', description: 'American burgers.' },
  { name: 'La Serre (Vida Downtown)', lat: 25.1898, lng: 55.2715, category: 'restaurants', description: 'French bistro. Popular Friday brunch.' },
  { name: 'La Petite Maison (DIFC)', lat: 25.2135, lng: 55.2821, category: 'restaurants', description: 'French Mediterranean.' },

  // Cafes
  { name: '% Arabica (Dubai Mall)', lat: 25.1980, lng: 55.2789, category: 'cafes', description: 'Kyoto-born specialty coffee.' },
  { name: 'Starbucks Reserve (Dubai Mall)', lat: 25.1985, lng: 55.2796, category: 'cafes', description: 'Largest Starbucks in ME.' },
  { name: 'Baker & Spice (Souk Al Bahar)', lat: 25.1959, lng: 55.2753, category: 'cafes', description: 'Bakery and cafe. Great for brunch.' },
  { name: 'Paul (Dubai Mall)', lat: 25.1982, lng: 55.2780, category: 'cafes', description: 'French bakery and bistro.' },
  { name: 'The Sum of Us', lat: 25.1889, lng: 55.2607, category: 'cafes', description: 'Specialty coffee & brunch.' },
  { name: 'Nightjar Coffee', lat: 25.1912, lng: 55.2669, category: 'cafes', description: 'Boutique roastery.' },
  { name: 'RAW Coffee Company', lat: 25.1845, lng: 55.2598, category: 'cafes', description: 'Al Quoz specialty roasters.' },
  { name: 'Costa Coffee (Boulevard)', lat: 25.1960, lng: 55.2730, category: 'cafes', description: 'Casual cafe on the Boulevard.' },

  // Bars & Nightlife
  { name: 'CÉ LA VI Lounge (Address Sky View L54)', lat: 25.1892, lng: 55.2748, category: 'nightlife', description: 'Rooftop bar. Panoramic Burj Khalifa views.' },
  { name: 'Neos (Address Downtown L63)', lat: 25.1957, lng: 55.2779, category: 'nightlife', description: 'Cocktail bar. Intimate, upscale.' },
  { name: 'Treehouse (Taj Dubai)', lat: 25.1990, lng: 55.2680, category: 'nightlife', description: 'Rooftop bar surrounded by trees.' },
  { name: 'Zeta (Address Downtown)', lat: 25.1956, lng: 55.2777, category: 'nightlife', description: 'Lounge bar. Relaxed evening drinks.' },
  { name: 'Privilege (Address Boulevard)', lat: 25.1925, lng: 55.2754, category: 'nightlife', description: 'Rooftop bar and lounge.' },
  { name: 'The Loft at Dubai Opera', lat: 25.1938, lng: 55.2696, category: 'nightlife', description: 'Wine and cocktail bar.' },
  { name: 'At.mosphere Lounge (Burj Khalifa L122)', lat: 25.1973, lng: 55.2745, category: 'nightlife', description: 'Cocktails at 442 metres.' },

  // Gyms & Fitness
  { name: 'Fitness First (Dubai Mall)', lat: 25.1984, lng: 55.2782, category: 'gyms', description: 'Large chain gym. From AED 350/mo.' },
  { name: 'GymNation (Al Quoz)', lat: 25.1832, lng: 55.2483, category: 'gyms', description: '24/7 budget gym. From AED 99/mo.' },
  { name: 'Warehouse Gym (Al Quoz)', lat: 25.1869, lng: 55.2513, category: 'gyms', description: 'Serious lifting gym. No frills.' },
  { name: 'F45 Training (Business Bay)', lat: 25.1865, lng: 55.2645, category: 'gyms', description: 'Functional fitness classes.' },
  { name: 'Barry\'s (DIFC)', lat: 25.2118, lng: 55.2798, category: 'gyms', description: 'HIIT bootcamp studio.' },
  { name: 'Yoga La Vie (City Walk)', lat: 25.2090, lng: 55.2610, category: 'gyms', description: 'Yoga and wellness studio.' },

  // Supermarkets
  { name: 'Waitrose (Dubai Mall)', lat: 25.1981, lng: 55.2783, category: 'supermarkets', description: 'Premium grocery. UK/intl brands.' },
  { name: 'Carrefour Market (Dubai Mall)', lat: 25.1984, lng: 55.2795, category: 'supermarkets', description: 'Hypermarket. Open until midnight.' },
  { name: 'Spinneys (Vida Residences)', lat: 25.1912, lng: 55.2729, category: 'supermarkets', description: 'Mid-range. Boulevard location.' },
  { name: 'Zoom (various locations)', lat: 25.1935, lng: 55.2760, category: 'supermarkets', description: 'Convenience store. Open 24/7.' },
  { name: 'Geant Express (Old Town)', lat: 25.1945, lng: 55.2720, category: 'supermarkets', description: 'Budget-friendly option.' },

  // Shopping / Malls
  { name: 'The Dubai Mall', lat: 25.1985, lng: 55.2796, category: 'malls', description: '1,200+ stores. World\'s most visited.' },
  { name: 'Souk Al Bahar', lat: 25.1960, lng: 55.2755, category: 'malls', description: 'Arabian-themed. Waterfront dining.' },
  { name: 'Fashion Avenue (Dubai Mall)', lat: 25.1978, lng: 55.2801, category: 'malls', description: 'Luxury designer brands wing.' },
  { name: 'City Walk', lat: 25.2095, lng: 55.2620, category: 'malls', description: 'Open-air lifestyle district.' },
  { name: 'Box Park (Al Wasl)', lat: 25.2148, lng: 55.2558, category: 'malls', description: 'Container-style F&B and retail.' },
  { name: 'Bay Avenue (Business Bay)', lat: 25.1855, lng: 55.2660, category: 'malls', description: 'Retail and dining complex.' },

  // Parks & Outdoor
  { name: 'Burj Park', lat: 25.1955, lng: 55.2735, category: 'parks', description: 'Landscaped gardens at Burj Khalifa base.' },
  { name: 'Dubai Fountain Boardwalk', lat: 25.1953, lng: 55.2748, category: 'parks', description: 'Floating walkway. AED 20/person.' },
  { name: 'Dubai Canal Promenade', lat: 25.1850, lng: 55.2650, category: 'parks', description: 'Running/cycling path. Canal views.' },
  { name: 'Old Town Island', lat: 25.1948, lng: 55.2735, category: 'parks', description: 'Pedestrianised. Palm trees, Arabic design.' },
  { name: 'Safa Park', lat: 25.2140, lng: 55.2450, category: 'parks', description: 'Large park. Running tracks, sports courts.' },
  { name: 'Dubai Opera Garden', lat: 25.1938, lng: 55.2700, category: 'parks', description: 'Landscaped gardens at the opera.' },
  { name: 'Jumeirah Beach (nearest)', lat: 25.2115, lng: 55.2350, category: 'parks', description: 'Nearest beach. ~15-20 min drive.' },
  { name: 'La Mer Beach', lat: 25.2350, lng: 55.2615, category: 'parks', description: 'Beachfront lifestyle destination.' },

  // Metro Stations
  { name: 'Burj Khalifa / Dubai Mall Metro', lat: 25.2000, lng: 55.2693, category: 'metro', description: 'Red Line. Connects to DXB airport.' },
  { name: 'Business Bay Metro', lat: 25.1905, lng: 55.2612, category: 'metro', description: 'Red Line.' },
  { name: 'Financial Centre Metro (DIFC)', lat: 25.2105, lng: 55.2790, category: 'metro', description: 'Red Line.' },
  { name: 'Al Jafiliya Metro', lat: 25.2285, lng: 55.2865, category: 'metro', description: 'Red Line. Near Dubai Frame.' },
  { name: 'World Trade Centre Metro', lat: 25.2240, lng: 55.2850, category: 'metro', description: 'Red & Green Line interchange.' },

  // Landmarks
  { name: 'Burj Khalifa', lat: 25.1972, lng: 55.2744, category: 'landmarks', description: 'World\'s tallest building, 828m.' },
  { name: 'Dubai Fountain', lat: 25.1953, lng: 55.2750, category: 'landmarks', description: 'World\'s largest fountain. Shows from 6pm.' },
  { name: 'Dubai Opera', lat: 25.1938, lng: 55.2696, category: 'landmarks', description: '2,000-seat performing arts venue.' },
  { name: 'Dubai Aquarium (Dubai Mall)', lat: 25.1984, lng: 55.2793, category: 'landmarks', description: '10-million litre aquarium.' },
  { name: 'VR Park (Dubai Mall)', lat: 25.1986, lng: 55.2798, category: 'landmarks', description: 'Virtual reality theme park.' },
  { name: 'KidZania (Dubai Mall)', lat: 25.1987, lng: 55.2800, category: 'landmarks', description: 'Interactive kids city. Ages 2-16.' },
  { name: 'DIFC Gate Building', lat: 25.2170, lng: 55.2830, category: 'landmarks', description: 'Financial centre landmark.' },
  { name: 'Museum of the Future', lat: 25.2197, lng: 55.2809, category: 'landmarks', description: 'Iconic torus-shaped museum.' },
  { name: 'Dubai Frame', lat: 25.2354, lng: 55.3005, category: 'landmarks', description: '150m picture frame landmark.' },
];

function getGoogleMapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}&query_place_id=${encodeURIComponent(place.name + ' Dubai')}`;
}

function getDirectionsUrl(place: Place): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
}

export default function DowntownMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set(CATEGORIES.map(c => c.id)));
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
    if (activeCategories.size === CATEGORIES.length) {
      setActiveCategories(new Set());
    } else {
      setActiveCategories(new Set(CATEGORIES.map(c => c.id)));
    }
  };

  const filteredPlaces = useMemo(() => {
    let places = PLACES.filter(p => activeCategories.has(p.category));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      places = places.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        CATEGORIES.find(c => c.id === p.category)?.label.toLowerCase().includes(q)
      );
    }
    return places;
  }, [activeCategories, searchQuery]);

  const flyTo = (place: Place) => {
    setSelectedPlace(place);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([place.lat, place.lng], 16, { duration: 0.8 });
      // Open popup for this marker
      markersRef.current.forEach(m => {
        if (m._latlng.lat === place.lat && m._latlng.lng === place.lng) {
          m.openPopup();
        }
      });
    }
  };

  // Initialize map
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
        center: CENTER,
        zoom: ZOOM,
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

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      filteredPlaces.forEach(place => {
        const cat = CATEGORIES.find(c => c.id === place.category);
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
          ">${cat?.icon || '📍'}</div>`,
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
                  View on Maps ↗
                </a>
                <a href="${getDirectionsUrl(place)}" target="_blank" rel="noopener noreferrer"
                   style="font-size:11px;color:#c9a96e;text-decoration:none;font-weight:500;">
                  Directions ↗
                </a>
              </div>
            </div>`,
            {
              closeButton: false,
              className: 'dark-popup',
            }
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
  }, [filteredPlaces, mapLoaded]);

  const groupedPlaces = useMemo(() => {
    const groups: Record<string, Place[]> = {};
    CATEGORIES.forEach(c => { groups[c.id] = []; });
    filteredPlaces.forEach(p => {
      if (groups[p.category]) groups[p.category].push(p);
    });
    return groups;
  }, [filteredPlaces]);

  return (
    <div>
      {/* Inject dark popup styles */}
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

      {/* Map + Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-0 border border-[var(--color-border)] overflow-hidden" style={{ height: '700px' }}>

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
                placeholder="Search places..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">Categories</span>
              <button onClick={toggleAll} className="text-[10px] tracking-wider uppercase text-[#c9a96e] hover:text-[#e0c98a] transition-colors">
                {activeCategories.size === CATEGORIES.length ? 'Hide All' : 'Show All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => {
                const isActive = activeCategories.has(cat.id);
                const count = PLACES.filter(p => p.category === cat.id).length;
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
                    <span style={{
                      fontSize: '10px',
                      opacity: 0.6,
                      marginLeft: '2px',
                    }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Places List */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
            {CATEGORIES.filter(c => activeCategories.has(c.id) && groupedPlaces[c.id]?.length > 0).map(cat => (
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

          {/* Place count */}
          <div className="px-4 py-3 border-t border-white/10 text-[11px] text-white/30">
            Showing {filteredPlaces.length} of {PLACES.length} places
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {/* Sidebar toggle */}
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

          {/* Reset view button */}
          <button
            onClick={() => mapInstanceRef.current?.flyTo(CENTER, ZOOM, { duration: 0.8 })}
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
