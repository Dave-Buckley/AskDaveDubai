import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const TRANSPORT_CATEGORIES: Category[] = [
  { id: 'metro', label: 'Metro Stations', icon: '🚇', color: '#ef4444' },
  { id: 'tram', label: 'Tram & Water Bus', icon: '🚊', color: '#3b82f6' },
  { id: 'bus', label: 'Bus Stops', icon: '🚌', color: '#22c55e' },
  { id: 'parking', label: 'Parking & Taxi', icon: '🅿️', color: '#f97316' },
];

export const TRANSPORT_PLACES: Place[] = [
  // Metro Stations (Red Line)
  { name: 'Burj Khalifa / Dubai Mall Metro', lat: 25.1977, lng: 55.2694, category: 'metro', description: 'Red Line. 10-15 min walk to Downtown via covered bridge. Connects to DXB.' },
  { name: 'Business Bay Metro', lat: 25.1913, lng: 55.2604, category: 'metro', description: 'Red Line. Closest to southern Downtown towers. 5 min walk.' },
  { name: 'Financial Centre Metro (DIFC)', lat: 25.2111, lng: 55.2756, category: 'metro', description: 'Red Line. Direct access to DIFC. 10 min from Downtown.' },
  { name: 'Al Jafiliya Metro', lat: 25.2336, lng: 55.2922, category: 'metro', description: 'Red Line. Near Dubai Frame and Zabeel Park.' },
  { name: 'World Trade Centre Metro', lat: 25.2248, lng: 55.2851, category: 'metro', description: 'Red Line and Green Line interchange. Exhibition centre.' },
  { name: 'Emirates Towers Metro', lat: 25.2173, lng: 55.2798, category: 'metro', description: 'Red Line. Sheikh Zayed Road. 8 min from Downtown.' },
  { name: 'Onpassive Metro (Al Safa)', lat: 25.1557, lng: 55.2285, category: 'metro', description: 'Red Line. Al Safa area. 15 min drive from Downtown.' },

  // Tram & Water Bus
  { name: 'Dubai Water Canal Ferry', lat: 25.1855, lng: 55.2645, category: 'tram', description: 'RTA ferry along the Water Canal. Business Bay boarding point.' },
  { name: 'Dubai Creek Water Bus', lat: 25.2654, lng: 55.2911, category: 'tram', description: 'Traditional abra and water bus. Al Ghubaiba station. 15 min drive.' },
  { name: 'Dubai Marina Tram (DMCC)', lat: 25.0670, lng: 55.1400, category: 'tram', description: 'Tram stop connecting to Marina and JBR. 25 min drive.' },

  // Bus Stops
  { name: 'Dubai Mall Bus Station', lat: 25.1988, lng: 55.2690, category: 'bus', description: 'Main bus station. Routes to Deira, Bur Dubai, and Marina.' },
  { name: 'Boulevard Bus Stop', lat: 25.1930, lng: 55.2760, category: 'bus', description: 'RTA bus stop on the Boulevard. Multiple routes.' },
  { name: 'Business Bay Bus Stop (Bay Avenue)', lat: 25.1855, lng: 55.2658, category: 'bus', description: 'Multiple routes. Business Bay area.' },
  { name: 'DIFC Bus Stop', lat: 25.2145, lng: 55.2810, category: 'bus', description: 'Routes connecting DIFC to Downtown and beyond.' },

  // Parking & Taxi
  { name: 'Dubai Mall Parking', lat: 25.1975, lng: 55.2800, category: 'parking', description: '14,000 spaces. First 4 hours free on weekdays. Grand, Cinema, Fashion.' },
  { name: 'Souk Al Bahar Parking', lat: 25.1950, lng: 55.2772, category: 'parking', description: 'Multi-storey. First 2 hours free. Near fountain.' },
  { name: 'Boulevard Plaza Parking', lat: 25.1925, lng: 55.2745, category: 'parking', description: 'Public paid parking. RTA rates.' },
  { name: 'RTA Taxi Stand (Dubai Mall)', lat: 25.1990, lng: 55.2695, category: 'parking', description: 'Official taxi rank. Ground floor, mall entrance.' },
  { name: 'RTA Taxi Stand (Address Downtown)', lat: 25.1955, lng: 55.2775, category: 'parking', description: 'Hotel taxi rank. Metered taxis.' },
  { name: 'Careem/Uber Pickup (Dubai Mall)', lat: 25.1992, lng: 55.2698, category: 'parking', description: 'Designated ride-hailing pickup. Lower ground Cinema Parking.' },
  { name: 'Visitor Parking (Boulevard)', lat: 25.1915, lng: 55.2750, category: 'parking', description: 'Street parking. RTA paid zones. AED 2-4/hour.' },
  { name: 'Dubai Opera Parking', lat: 25.1945, lng: 55.2705, category: 'parking', description: 'Multi-storey. Direct access to Dubai Opera. First 3 hours free with ticket.' },
  { name: 'DEWA EV Charging (Dubai Mall)', lat: 25.1976, lng: 55.2802, category: 'parking', description: 'Electric vehicle charging stations. Dubai Mall car park.' },
  { name: 'DEWA EV Charging (Boulevard)', lat: 25.1920, lng: 55.2745, category: 'parking', description: 'EV charging. Boulevard parking area. Downtown.' },
  { name: 'Hertz Car Rental (Dubai Mall)', lat: 25.1988, lng: 55.2692, category: 'parking', description: 'Car rental. Dubai Mall area. Downtown.' },
  { name: 'Budget Car Rental (SZR)', lat: 25.2170, lng: 55.2800, category: 'parking', description: 'Car rental. Sheikh Zayed Road. 8 min drive.' },
  { name: 'Careem Bike Station (Downtown)', lat: 25.1955, lng: 55.2760, category: 'tram', description: 'E-bike rental station. App-based. Boulevard area.' },
  { name: 'Careem Bike Station (DIFC)', lat: 25.2110, lng: 55.2790, category: 'tram', description: 'E-bike rental station. DIFC area.' },
];

export default function TransportMap() {
  return <NeighbourhoodMap categories={TRANSPORT_CATEGORIES} places={TRANSPORT_PLACES} center={[25.205, 55.275]} zoom={13} />;
}
