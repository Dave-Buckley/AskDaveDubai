import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const OUTDOORS_CATEGORIES: Category[] = [
  { id: 'parks', label: 'Parks & Gardens', icon: '🌴', color: '#22c55e' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️', color: '#3b82f6' },
  { id: 'running', label: 'Running & Cycling', icon: '🏃', color: '#f97316' },
  { id: 'pets', label: 'Pet-Friendly', icon: '🐕', color: '#8b5cf6' },
];

export const OUTDOORS_PLACES: Place[] = [
  // Parks & Gardens
  { name: 'Burj Park', lat: 25.1944, lng: 55.2736, category: 'parks', description: 'Landscaped gardens at the base of Burj Khalifa. Events space. In Downtown.' },
  { name: 'Dubai Fountain Boardwalk', lat: 25.1952, lng: 55.2751, category: 'parks', description: 'Floating walkway. AED 20/person. Fountain shows from 6pm. In Downtown.' },
  { name: 'Dubai Opera Garden', lat: 25.1956, lng: 55.2719, category: 'parks', description: 'Landscaped gardens around Dubai Opera. Quiet daytime spot. In Downtown.' },
  { name: 'Old Town Island', lat: 25.1950, lng: 55.2735, category: 'parks', description: 'Pedestrianised. Palm trees, Arabic design. Souk Al Bahar. In Downtown.' },
  { name: 'Safa Park', lat: 25.1856, lng: 55.2456, category: 'parks', description: 'Large park. Running tracks, sports courts, BBQ areas. 8 min drive.' },
  { name: 'Zabeel Park', lat: 25.2352, lng: 55.2980, category: 'parks', description: 'Large public park. Home of the Dubai Frame. Jogging tracks. 10 min drive.' },
  { name: 'Creek Park', lat: 25.2366, lng: 55.3271, category: 'parks', description: 'Waterfront park. Cable car, cycling, picnic areas. 15 min drive.' },
  { name: 'Al Barsha Pond Park', lat: 25.1086, lng: 55.1973, category: 'parks', description: 'Pond, jogging track, play areas. 20 min drive.' },

  // Beaches
  { name: 'Jumeirah Beach (Open Beach)', lat: 25.2115, lng: 55.2350, category: 'beaches', description: 'Nearest public beach to Downtown. Free access. 15 min drive.' },
  { name: 'La Mer Beach', lat: 25.2267, lng: 55.2558, category: 'beaches', description: 'Beachfront with dining, retail, waterpark. 12 min drive.' },
  { name: 'Kite Beach', lat: 25.1648, lng: 55.2073, category: 'beaches', description: 'Active beach. Kite surfing, volleyball, running track. 20 min drive.' },
  { name: 'Sunset Beach (Umm Suqeim)', lat: 25.1636, lng: 55.2145, category: 'beaches', description: 'Quiet beach. Burj Al Arab views. Free. 20 min drive.' },

  // Running & Cycling
  { name: 'Dubai Canal Promenade', lat: 25.1850, lng: 55.2650, category: 'running', description: '6.4km running/cycling path. Lit at night. Canal views. 5 min from Downtown.' },
  { name: 'Boulevard Walk', lat: 25.1920, lng: 55.2755, category: 'running', description: '3.5km pedestrian loop around the Boulevard. Flat, well-lit. In Downtown.' },
  { name: 'Safa Park Running Track', lat: 25.1856, lng: 55.2456, category: 'running', description: 'Dedicated running track. Shaded sections. 8 min drive.' },
  { name: 'Dubai Water Canal Cycling', lat: 25.1880, lng: 55.2620, category: 'running', description: 'Dedicated cycle path along Dubai Canal. Connects to Downtown. 5 min.' },
  { name: 'Meydan Track (Nad Al Sheba)', lat: 25.1487, lng: 55.2864, category: 'running', description: '4km, 6km, 8km running loops. Well-lit. Popular evening spot. 15 min drive.' },
  { name: 'Al Qudra Cycling Track', lat: 24.9993, lng: 55.3072, category: 'running', description: '86km desert cycling track. Popular early mornings. 35 min drive.' },

  // Pet-Friendly
  { name: 'Pet Zone (Dubai Mall)', lat: 25.1985, lng: 55.2795, category: 'pets', description: 'Pet supplies and accessories. Dubai Mall. In Downtown.' },
  { name: 'My Second Home (Al Quoz)', lat: 25.1308, lng: 55.2327, category: 'pets', description: 'Pet boarding and daycare. 15 min drive.' },
  { name: 'British Veterinary Centre (Jumeirah)', lat: 25.2170, lng: 55.2490, category: 'pets', description: 'UK-standard vet clinic. Al Wasl Road. 12 min drive.' },
  { name: 'Modern Vet (Jumeirah)', lat: 25.2165, lng: 55.2485, category: 'pets', description: '24/7 emergency vet. Premium care. Al Wasl Road. 12 min drive.' },
  { name: 'Petsville (Al Quoz)', lat: 25.1270, lng: 55.2176, category: 'pets', description: 'Pet shop, grooming, supplies. Al Quoz Industrial. 18 min drive.' },

  // More outdoors
  { name: 'Dubai Fountain Shows', lat: 25.1952, lng: 55.2751, category: 'parks', description: 'Free shows every 30 min from 6pm. Visible from Downtown. Best from Souk Al Bahar.' },
  { name: 'The Green Planet (City Walk)', lat: 25.2049, lng: 55.2635, category: 'parks', description: 'Indoor tropical bio-dome. 3,000 plants and animals. 8 min drive.' },
  { name: 'Dubai Frame', lat: 25.2352, lng: 55.2990, category: 'parks', description: '150m tall picture frame. Observation deck and museum. Zabeel Park. 10 min drive.' },
  { name: 'Ras Al Khor Wildlife Sanctuary', lat: 25.1870, lng: 55.3300, category: 'parks', description: 'Flamingo wetland reserve. Free entry. Binoculars provided. 15 min drive.' },
  { name: 'Nad Al Sheba Cycling Track', lat: 25.1480, lng: 55.2860, category: 'running', description: '4km, 6km, 8km loops. Well-lit. Water stations. Very popular. 15 min drive.' },
  { name: 'Jumeirah Beach Running Track', lat: 25.2100, lng: 55.2350, category: 'running', description: 'Beachfront running path. Flat, scenic. 15 min drive.' },
  { name: 'Dubai Golf - Emirates Golf Club', lat: 25.0830, lng: 55.1620, category: 'running', description: '36-hole championship golf. Home of Dubai Desert Classic. 20 min drive.' },
  { name: 'Dubai Golf - Jumeirah Golf Estates', lat: 25.0400, lng: 55.1550, category: 'running', description: 'Two championship courses. Home of DP World Tour. 25 min drive.' },
];

export default function OutdoorsMap() {
  return <NeighbourhoodMap categories={OUTDOORS_CATEGORIES} places={OUTDOORS_PLACES} center={[25.200, 55.270]} zoom={13} />;
}
