import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const FITNESS_CATEGORIES: Category[] = [
  { id: 'gyms', label: 'Gyms & Training', icon: '💪', color: '#22c55e' },
  { id: 'yoga', label: 'Yoga & Pilates', icon: '🧘', color: '#8b5cf6' },
  { id: 'pools', label: 'Swimming & Sports', icon: '🏊', color: '#3b82f6' },
  { id: 'spas', label: 'Spas & Wellness', icon: '🧖', color: '#ec4899' },
];

export const FITNESS_PLACES: Place[] = [
  // Gyms & Training
  { name: 'Fitness First (Dubai Mall)', lat: 25.1984, lng: 55.2782, category: 'gyms', description: 'Large chain gym. Classes, pool, sauna. From AED 350/mo. Downtown.' },
  { name: 'Barry\'s (DIFC)', lat: 25.2118, lng: 55.2798, category: 'gyms', description: 'HIIT bootcamp studio. Red Room concept. 8 min drive.' },
  { name: '1Rebel (DIFC)', lat: 25.2125, lng: 55.2805, category: 'gyms', description: 'Boutique fitness. Ride, reshape, rumble classes. 8 min drive.' },
  { name: 'Embody Fitness (DIFC)', lat: 25.2122, lng: 55.2800, category: 'gyms', description: 'Premium personal training. Body transformation. 8 min drive.' },
  { name: 'F45 Training (DIFC)', lat: 25.2085, lng: 55.2755, category: 'gyms', description: 'Functional group training. 45-minute classes. Park Towers. 8 min drive.' },
  { name: 'Bare (Business Bay)', lat: 25.1889, lng: 55.2697, category: 'gyms', description: 'Boutique fitness club. Personal training. Clover Bay Tower. 5 min drive.' },
  { name: 'GymNation (Al Quoz)', lat: 25.1440, lng: 55.2224, category: 'gyms', description: '24/7 budget gym. Huge floor space. From AED 99/mo. 15 min drive.' },
  { name: 'Warehouse Gym (Al Quoz)', lat: 25.1212, lng: 55.2188, category: 'gyms', description: 'Serious lifting gym. No frills. Umm Suqeim Road. 18 min drive.' },
  { name: 'Crank (Al Quoz)', lat: 25.1407, lng: 55.2265, category: 'gyms', description: 'Indoor cycling studio. Alserkal Avenue. 15 min drive.' },

  // Yoga & Pilates
  { name: 'Inspire Yoga (DIFC)', lat: 25.2085, lng: 55.2755, category: 'yoga', description: 'Yoga studio. Heated and non-heated classes. Gate Avenue. 8 min drive.' },
  { name: 'Wellbeing Clinic & Yoga (Umm Suqeim)', lat: 25.1488, lng: 55.2110, category: 'yoga', description: 'Yoga and holistic wellness. Al Wasl Road. 15 min drive.' },
  { name: 'Barre (DIFC)', lat: 25.2120, lng: 55.2800, category: 'yoga', description: 'Barre, Pilates, and yoga studio. Gate Avenue. 8 min drive.' },
  { name: 'Flex Pilates (City Walk)', lat: 25.2050, lng: 55.2635, category: 'yoga', description: 'Reformer Pilates studio. Small group classes. 8 min drive.' },
  { name: 'YogaOne (Al Quoz)', lat: 25.1440, lng: 55.2230, category: 'yoga', description: 'Yoga community space. Various styles. Alserkal area. 15 min drive.' },

  // Swimming & Sports
  { name: 'Fitness First Pool (Dubai Mall)', lat: 25.1984, lng: 55.2783, category: 'pools', description: 'Indoor pool. Gym membership required. Downtown.' },
  { name: 'Address Downtown Pool', lat: 25.1957, lng: 55.2778, category: 'pools', description: 'Hotel pool. Day passes available seasonally. Downtown.' },
  { name: 'Vida Downtown Pool', lat: 25.1905, lng: 55.2718, category: 'pools', description: 'Rooftop pool. Day passes available. Downtown.' },
  { name: 'Palace Downtown Pool', lat: 25.1937, lng: 55.2756, category: 'pools', description: 'Hotel pool overlooking Burj Lake. Day passes. Downtown.' },
  { name: 'Padel Dubai (Al Quoz)', lat: 25.1835, lng: 55.2505, category: 'pools', description: 'Padel tennis courts. Bookable sessions. 10 min drive.' },
  { name: 'Just Padel (Business Bay)', lat: 25.1845, lng: 55.2625, category: 'pools', description: 'Padel tennis. Indoor and outdoor courts. 5 min drive.' },
  { name: 'Dubai Ice Rink (Dubai Mall)', lat: 25.1980, lng: 55.2790, category: 'pools', description: 'Olympic-size ice rink. Public sessions and lessons. Downtown.' },
  { name: 'Hamdan Sports Complex', lat: 25.2350, lng: 55.3100, category: 'pools', description: 'Olympic pool, diving, indoor sports. 12 min drive.' },

  // Spas & Wellness
  { name: 'The Spa at Address Downtown', lat: 25.1956, lng: 55.2779, category: 'spas', description: 'Full-service hotel spa. Massage, facials, hammam. Downtown.' },
  { name: 'The Spa at Address Sky View', lat: 25.1891, lng: 55.2748, category: 'spas', description: 'Luxury spa with Burj Khalifa views. Downtown.' },
  { name: 'Vida Spa (Vida Downtown)', lat: 25.1905, lng: 55.2718, category: 'spas', description: 'Boutique wellness spa. Downtown.' },
  { name: 'Talise Spa (Emirates Towers)', lat: 25.2178, lng: 55.2819, category: 'spas', description: 'Premium Jumeirah hotel spa. Sheikh Zayed Road. 8 min drive.' },
  { name: 'Tips & Toes (Dubai Mall)', lat: 25.1982, lng: 55.2786, category: 'spas', description: 'Nails, waxing, facials. Dubai Mall. Downtown.' },
  { name: 'Armani/SPA (Burj Khalifa)', lat: 25.1968, lng: 55.2744, category: 'spas', description: 'Ultra-luxury spa in the Armani Hotel. Signature treatments. Downtown.' },
  { name: 'The Spa at Palace Downtown', lat: 25.1937, lng: 55.2757, category: 'spas', description: 'Traditional Arabian-inspired spa. Hammam treatments. Downtown.' },
  { name: 'ShuiQi Spa (Atlantis)', lat: 25.1310, lng: 55.1178, category: 'spas', description: 'Premium resort spa. Extensive treatment menu. 25 min drive.' },
];

export default function FitnessMap() {
  return <NeighbourhoodMap categories={FITNESS_CATEGORIES} places={FITNESS_PLACES} center={[25.200, 55.272]} zoom={14} />;
}
