import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const EDUCATION_CATEGORIES: Category[] = [
  { id: 'british', label: 'British Curriculum', icon: '🇬🇧', color: '#3b82f6' },
  { id: 'international', label: 'International (IB/American)', icon: '🌍', color: '#8b5cf6' },
  { id: 'nurseries', label: 'Nurseries & Early Years', icon: '🧒', color: '#22c55e' },
];

export const EDUCATION_PLACES: Place[] = [
  // British Curriculum Schools (KHDA Outstanding / Very Good, within 20 min drive)
  { name: 'Safa British School', lat: 25.1779, lng: 55.2412, category: 'british', description: 'British curriculum. KHDA Outstanding. Al Safa. 10 min drive.' },
  { name: 'Jumeirah English Speaking School (JESS)', lat: 25.1799, lng: 55.2436, category: 'british', description: 'British curriculum. KHDA Outstanding. Al Safa. 10 min drive.' },
  { name: 'Horizon English School', lat: 25.1790, lng: 55.2420, category: 'british', description: 'British curriculum. KHDA Very Good. Al Safa. 10 min drive.' },
  { name: 'Hartland International School', lat: 25.1785, lng: 55.3035, category: 'british', description: 'British curriculum. KHDA Very Good. Sobha Hartland, MBR City. 10 min drive.' },
  { name: 'Kings\' School Dubai (Umm Suqeim)', lat: 25.1570, lng: 55.2120, category: 'british', description: 'British curriculum. Primary. KHDA Outstanding. 15 min drive.' },
  { name: 'Kings\' School Al Barsha', lat: 25.0880, lng: 55.2250, category: 'british', description: 'British curriculum. KHDA Outstanding. Al Barsha South. 15 min drive.' },
  { name: 'GEMS Wellington International', lat: 25.1120, lng: 55.1834, category: 'british', description: 'British curriculum. KHDA Outstanding. Al Sufouh. 18 min drive.' },
  { name: 'Dubai College', lat: 25.1099, lng: 55.1694, category: 'british', description: 'British curriculum. KHDA Outstanding. Al Sufouh. 20 min drive.' },
  { name: 'Repton School', lat: 25.1453, lng: 55.3790, category: 'british', description: 'British curriculum. KHDA Outstanding. Nad Al Sheba. 20 min drive.' },

  // International Schools (IB / American / French, KHDA Outstanding / Very Good)
  { name: 'Swiss International Scientific School', lat: 25.2086, lng: 55.3313, category: 'international', description: 'Swiss/IB curriculum. Dubai Healthcare City. 12 min drive.' },
  { name: 'Lycee Francais Jean Mermoz', lat: 25.1752, lng: 55.2512, category: 'international', description: 'French curriculum. Al Quoz. 10 min drive.' },
  { name: 'Raffles World Academy', lat: 25.1403, lng: 55.1966, category: 'international', description: 'IB curriculum. KHDA Outstanding. Umm Suqeim. 18 min drive.' },
  { name: 'Raffles International School', lat: 25.1420, lng: 55.1970, category: 'international', description: 'IB curriculum. KHDA Very Good. Umm Suqeim. 18 min drive.' },
  { name: 'GEMS Dubai American Academy', lat: 25.1031, lng: 55.1810, category: 'international', description: 'American curriculum. KHDA Outstanding. Al Barsha. 18 min drive.' },
  { name: 'GEMS World Academy', lat: 25.0796, lng: 55.2286, category: 'international', description: 'IB curriculum. KHDA Outstanding. Al Barsha South. 20 min drive.' },

  // Nurseries & Early Years (within 20 min drive)
  { name: 'Blossom Downtown Nursery', lat: 25.1930, lng: 55.2790, category: 'nurseries', description: 'British EYFS. Yansoon 7, Downtown Dubai. Walking distance.' },
  { name: 'Blossom Nursery (Business Bay)', lat: 25.1889, lng: 55.2655, category: 'nurseries', description: 'British EYFS. Business Bay. 5 min drive.' },
  { name: 'Kids First Group Nursery (Business Bay)', lat: 25.1870, lng: 55.2650, category: 'nurseries', description: 'Multiple curricula. Business Bay. 5 min drive.' },
  { name: 'Maple Bear (Business Bay)', lat: 25.1865, lng: 55.2640, category: 'nurseries', description: 'Canadian curriculum. Burlington Tower. 5 min drive.' },
  { name: 'Chubby Cheeks Nursery (Al Quoz)', lat: 25.1850, lng: 55.2530, category: 'nurseries', description: 'British EYFS. Al Quoz. 8 min drive.' },
  { name: 'Ladybird Nursery (Jumeirah)', lat: 25.2150, lng: 55.2500, category: 'nurseries', description: 'British EYFS. Jumeirah 1. 10 min drive.' },
  { name: 'Willow Children\'s Nursery (Umm Suqeim)', lat: 25.1530, lng: 55.2100, category: 'nurseries', description: 'British EYFS. Umm Suqeim 2. 15 min drive.' },
  { name: 'Little Feet Nursery (Al Quoz)', lat: 25.1257, lng: 55.2086, category: 'nurseries', description: 'British EYFS. Gold and Diamond Park. 15 min drive.' },
];

export default function EducationMap() {
  return <NeighbourhoodMap categories={EDUCATION_CATEGORIES} places={EDUCATION_PLACES} center={[25.195, 55.265]} zoom={13} />;
}
