import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const ESSENTIALS_CATEGORIES: Category[] = [
  { id: 'supermarkets', label: 'Supermarkets', icon: '🛒', color: '#22c55e' },
  { id: 'convenience', label: 'Convenience Stores', icon: '🏪', color: '#3b82f6' },
  { id: 'laundry', label: 'Laundry & Dry Cleaning', icon: '👔', color: '#8b5cf6' },
  { id: 'services', label: 'Home Services & Banks', icon: '🏦', color: '#f97316' },
];

export const ESSENTIALS_PLACES: Place[] = [
  // Supermarkets
  { name: 'Waitrose (Dubai Mall)', lat: 25.1981, lng: 55.2783, category: 'supermarkets', description: 'Premium grocery. UK and international brands. Downtown.' },
  { name: 'Spinneys (Vida Residences)', lat: 25.1912, lng: 55.2729, category: 'supermarkets', description: 'Mid-range. Boulevard location. Good bakery. Downtown.' },
  { name: 'Geant Express (Burj Vista)', lat: 25.1970, lng: 55.2725, category: 'supermarkets', description: 'Budget-friendly. Mohammed Bin Rashid Boulevard. Downtown.' },
  { name: 'Spinneys (Business Bay)', lat: 25.1870, lng: 55.2648, category: 'supermarkets', description: 'Full-size Spinneys. Bay Avenue. 5 min drive.' },
  { name: 'Carrefour Market (DIFC Gate Avenue)', lat: 25.2098, lng: 55.2783, category: 'supermarkets', description: 'Mid-size Carrefour. Gate Avenue, DIFC. 8 min drive.' },
  { name: 'Carrefour (City Walk)', lat: 25.2049, lng: 55.2632, category: 'supermarkets', description: 'Mid-size Carrefour. City Walk. 8 min drive.' },

  // Convenience Stores
  { name: 'Zoom (Boulevard)', lat: 25.1935, lng: 55.2760, category: 'convenience', description: '24/7 convenience store. Multiple Downtown locations.' },
  { name: 'Zoom (Souk Al Bahar)', lat: 25.1950, lng: 55.2772, category: 'convenience', description: '24/7. Near Dubai Fountain. Downtown.' },
  { name: 'Grandiose (Address Downtown)', lat: 25.1897, lng: 55.2741, category: 'convenience', description: 'Premium mini-supermarket. Open late. Downtown.' },
  { name: 'West Zone (Business Bay)', lat: 25.1865, lng: 55.2645, category: 'convenience', description: '24/7 grocery. Business Bay. 5 min drive.' },
  { name: 'Choithrams (Al Safa)', lat: 25.2055, lng: 55.2480, category: 'convenience', description: 'Indian/International groceries. 8 min drive.' },

  // Laundry & Dry Cleaning
  { name: 'Champion Cleaners (Dubai Mall)', lat: 25.1983, lng: 55.2790, category: 'laundry', description: 'Premium dry cleaning. Dubai Mall collection point. Downtown.' },
  { name: 'Pressto (Old Town)', lat: 25.1940, lng: 55.2785, category: 'laundry', description: 'Spanish dry cleaning chain. Al Manzil District, Downtown.' },
  { name: 'Washmen (App-based)', lat: 25.1955, lng: 55.2760, category: 'laundry', description: 'App-based pickup and delivery laundry. Serves Downtown. 24hr turnaround.' },
  { name: '5asec (Business Bay)', lat: 25.1870, lng: 55.2645, category: 'laundry', description: 'French dry cleaning chain. Business Bay. 5 min drive.' },

  // Home Services & Banks
  { name: 'Emirates NBD (Boulevard)', lat: 25.1928, lng: 55.2752, category: 'services', description: 'Full branch with ATMs. Downtown.' },
  { name: 'HSBC (DIFC)', lat: 25.2110, lng: 55.2793, category: 'services', description: 'Expat banking. Gate Precinct, DIFC. 8 min drive.' },
  { name: 'ENBD ATM (Dubai Mall)', lat: 25.1985, lng: 55.2792, category: 'services', description: 'Multiple ATMs inside Dubai Mall. Downtown.' },
  { name: 'ADCB (Boulevard Plaza)', lat: 25.1922, lng: 55.2748, category: 'services', description: 'Banking branch. Downtown.' },
  { name: 'du Store (Dubai Mall)', lat: 25.1973, lng: 55.2799, category: 'services', description: 'Telecom store. SIM cards, internet plans. Downtown.' },
  { name: 'Etisalat (Dubai Mall)', lat: 25.1982, lng: 55.2790, category: 'services', description: 'Telecom store. SIM cards, internet plans. Downtown.' },
  { name: 'Typing Centre (Business Bay)', lat: 25.1868, lng: 55.2652, category: 'services', description: 'Document typing, visa services, notary. 5 min drive.' },
  { name: 'UAE Exchange (Dubai Mall)', lat: 25.1981, lng: 55.2788, category: 'services', description: 'Currency exchange and remittance. Dubai Mall. Downtown.' },
  { name: 'Al Ansari Exchange (Dubai Mall)', lat: 25.1983, lng: 55.2792, category: 'services', description: 'Currency exchange. Competitive rates. Dubai Mall.' },
  { name: 'ACE Hardware (Al Quoz)', lat: 25.1440, lng: 55.2240, category: 'services', description: 'Hardware and home improvement store. Al Quoz. 15 min drive.' },
  { name: 'Emirates Post (Downtown)', lat: 25.1930, lng: 55.2745, category: 'services', description: 'Post office services. Boulevard area. Downtown.' },
  { name: 'FAB ATM (Dubai Mall)', lat: 25.1984, lng: 55.2790, category: 'services', description: 'First Abu Dhabi Bank ATM. Dubai Mall.' },
  { name: 'Mashreq Bank (Boulevard)', lat: 25.1920, lng: 55.2742, category: 'services', description: 'Full banking branch. Boulevard Plaza area. Downtown.' },
];

export default function EssentialsMap() {
  return <NeighbourhoodMap categories={ESSENTIALS_CATEGORIES} places={ESSENTIALS_PLACES} center={[25.198, 55.272]} zoom={14} />;
}
