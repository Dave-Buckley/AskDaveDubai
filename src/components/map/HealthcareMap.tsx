import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const HEALTHCARE_CATEGORIES: Category[] = [
  { id: 'hospitals', label: 'Hospitals', icon: '🏥', color: '#ef4444' },
  { id: 'clinics', label: 'Clinics & GPs', icon: '🩺', color: '#3b82f6' },
  { id: 'dental', label: 'Dental', icon: '🦷', color: '#06b6d4' },
  { id: 'pharmacies', label: 'Pharmacies', icon: '💊', color: '#22c55e' },
];

export const HEALTHCARE_PLACES: Place[] = [
  // Hospitals (within 20 min drive)
  { name: 'Mediclinic Parkview Hospital', lat: 25.1720, lng: 55.2510, category: 'hospitals', description: '24/7 hospital. Al Barsha South. 12 min drive from Downtown.' },
  { name: 'King\'s College Hospital London', lat: 25.1123, lng: 55.2552, category: 'hospitals', description: 'UK-affiliated. Dubai Hills Estate. A&E and specialist care. 15 min drive.' },
  { name: 'Emirates Hospital (Jumeirah)', lat: 25.2180, lng: 55.2500, category: 'hospitals', description: 'Multi-specialty private hospital. 12 min drive.' },
  { name: 'Rashid Hospital', lat: 25.2442, lng: 55.3181, category: 'hospitals', description: 'Government hospital. 24/7 A&E. Oud Metha. 10 min drive.' },
  { name: 'Mediclinic City Hospital (DHCC)', lat: 25.2340, lng: 55.3190, category: 'hospitals', description: 'Major private hospital. Dubai Healthcare City. 10 min drive.' },
  { name: 'American Hospital (Oud Metha)', lat: 25.2355, lng: 55.3130, category: 'hospitals', description: 'Premium private hospital. 24/7 A&E. 10 min drive.' },
  { name: 'Al Jalila Children\'s Hospital', lat: 25.2240, lng: 55.3260, category: 'hospitals', description: 'Specialist paediatric hospital. Al Jadaf. 12 min drive.' },
  { name: 'Saudi German Hospital', lat: 25.0971, lng: 55.1842, category: 'hospitals', description: 'Multi-specialty hospital. Al Barsha 3, Hessa Street. 20 min drive.' },

  // Clinics & GPs
  { name: 'Dubai Mall Medical Centre', lat: 25.1986, lng: 55.2780, category: 'clinics', description: 'Walk-in clinic inside Dubai Mall. Downtown.' },
  { name: 'Aster Clinic (Boulevard Plaza)', lat: 25.1920, lng: 55.2740, category: 'clinics', description: 'GP walk-in. Downtown Dubai. Walking distance.' },
  { name: 'HealthHub Clinic (Dubai Mall)', lat: 25.1983, lng: 55.2785, category: 'clinics', description: 'General practice. Dubai Mall. Downtown.' },
  { name: 'Mediclinic (City Walk)', lat: 25.2049, lng: 55.2632, category: 'clinics', description: 'Walk-in clinic. City Walk. 8 min drive.' },
  { name: 'London Centre for Aesthetic Surgery (DHCC)', lat: 25.2317, lng: 55.3240, category: 'clinics', description: 'UK-standard aesthetics. Al Razi Building, Healthcare City. 10 min drive.' },
  { name: 'Mediclinic (Al Sufouh)', lat: 25.1016, lng: 55.1605, category: 'clinics', description: 'GP and specialist. Dubai Knowledge Village. 20 min drive.' },

  // Dental
  { name: 'Dr. Michael\'s Dental Clinic (Jumeirah)', lat: 25.2170, lng: 55.2485, category: 'dental', description: 'Premium cosmetic and general dentistry. 10 min drive.' },
  { name: 'German Dental Oasis (DHCC)', lat: 25.2339, lng: 55.3182, category: 'dental', description: 'German-standard dentistry. Healthcare City. 10 min drive.' },
  { name: 'Dr. Joy Dental Clinic (Jumeirah)', lat: 25.2160, lng: 55.2490, category: 'dental', description: 'Premium dental clinic. Jumeirah. 10 min drive.' },
  { name: 'Versailles Dental Clinic (DHCC)', lat: 25.2339, lng: 55.3182, category: 'dental', description: 'Cosmetic and specialist dental. Al Razi Building. 10 min drive.' },
  { name: 'Dr. Nicolas & ASP (Jumeirah)', lat: 25.2100, lng: 55.2490, category: 'dental', description: 'French dental practice. Jumeirah Beach Road. 10 min drive.' },
  { name: 'Hollywood Smile Dental Clinic (Jumeirah)', lat: 25.2165, lng: 55.2505, category: 'dental', description: 'Cosmetic dentistry specialist. 10 min drive.' },

  // Pharmacies
  { name: 'Life Pharmacy (Boulevard)', lat: 25.1925, lng: 55.2755, category: 'pharmacies', description: 'Full-service pharmacy. Open late. Downtown.' },
  { name: 'Boots Pharmacy (Dubai Mall)', lat: 25.1982, lng: 55.2788, category: 'pharmacies', description: 'UK chain pharmacy. Dubai Mall.' },
  { name: 'Aster Pharmacy (Business Bay)', lat: 25.1875, lng: 55.2650, category: 'pharmacies', description: '24/7 pharmacy. Business Bay. 5 min drive.' },
  { name: 'BinSina Pharmacy (Dubai Mall)', lat: 25.1984, lng: 55.2791, category: 'pharmacies', description: 'Major chain. Dubai Mall.' },
  { name: 'SuperCare Pharmacy (City Walk)', lat: 25.2049, lng: 55.2632, category: 'pharmacies', description: 'Premium pharmacy. City Walk. 8 min drive.' },
  { name: 'Health First Pharmacy (DIFC)', lat: 25.2142, lng: 55.2812, category: 'pharmacies', description: 'DIFC pharmacy. 8 min drive.' },
];

export default function HealthcareMap() {
  return <NeighbourhoodMap categories={HEALTHCARE_CATEGORIES} places={HEALTHCARE_PLACES} center={[25.205, 55.272]} zoom={13} />;
}
