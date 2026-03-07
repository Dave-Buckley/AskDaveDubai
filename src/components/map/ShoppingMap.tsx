import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const SHOPPING_CATEGORIES: Category[] = [
  { id: 'malls', label: 'Malls & Shopping', icon: '🛍️', color: '#a855f7' },
  { id: 'fashion', label: 'Fashion & Boutiques', icon: '👗', color: '#ec4899' },
  { id: 'grooming', label: 'Salons & Grooming', icon: '💈', color: '#f97316' },
  { id: 'homeware', label: 'Homeware & Interiors', icon: '🏠', color: '#14b8a6' },
];

export const SHOPPING_PLACES: Place[] = [
  // Malls & Shopping
  { name: 'The Dubai Mall', lat: 25.1985, lng: 55.2796, category: 'malls', description: '1,200+ stores. World\'s most visited mall. Downtown.' },
  { name: 'Fashion Avenue (Dubai Mall)', lat: 25.1978, lng: 55.2801, category: 'malls', description: 'Luxury designer wing. Chanel, Dior, Louis Vuitton. Downtown.' },
  { name: 'Souk Al Bahar', lat: 25.1950, lng: 55.2772, category: 'malls', description: 'Arabian-themed. Waterfront dining and boutiques. Downtown.' },
  { name: 'City Walk', lat: 25.2049, lng: 55.2632, category: 'malls', description: 'Open-air lifestyle district. Fashion, dining, cinema. 8 min drive.' },
  { name: 'Box Park (Al Wasl)', lat: 25.2030, lng: 55.2512, category: 'malls', description: 'Container-style F&B and retail hub. 10 min drive.' },
  { name: 'Bay Avenue (Business Bay)', lat: 25.1887, lng: 55.2651, category: 'malls', description: 'Retail and dining complex. Business Bay. 5 min drive.' },
  { name: 'Galleria Mall (Al Wasl)', lat: 25.2081, lng: 55.2548, category: 'malls', description: 'Boutique mall. Al Wasl Road. 10 min drive.' },
  { name: 'Mercato Mall (Jumeirah)', lat: 25.2163, lng: 55.2530, category: 'malls', description: 'Italian-themed mall. Jumeirah Beach Road. 10 min drive.' },

  // Fashion & Boutiques
  { name: 'Galeries Lafayette (Dubai Mall)', lat: 25.1982, lng: 55.2798, category: 'fashion', description: 'French department store. Fashion, beauty, home. Downtown.' },
  { name: 'Bloomingdale\'s (Dubai Mall)', lat: 25.1980, lng: 55.2796, category: 'fashion', description: 'American department store. Fashion and home. Downtown.' },
  { name: 'Level Shoe District (Dubai Mall)', lat: 25.1978, lng: 55.2794, category: 'fashion', description: '96,000 sqft shoe retail. 200+ brands. Downtown.' },
  { name: 'S*uce (City Walk)', lat: 25.2049, lng: 55.2632, category: 'fashion', description: 'UAE-born concept store. Emerging designers. 8 min drive.' },
  { name: 'Comptoir 102 (Jumeirah)', lat: 25.2260, lng: 55.2587, category: 'fashion', description: 'Concept store. Sustainable fashion and cafe. Beach Road. 12 min drive.' },
  { name: 'The Designers\' Room (DIFC)', lat: 25.2138, lng: 55.2810, category: 'fashion', description: 'Regional designer showcase. DIFC. 8 min drive.' },

  // Salons & Grooming
  { name: 'Tips & Toes (Dubai Mall)', lat: 25.1982, lng: 55.2787, category: 'grooming', description: 'Nails, waxing, facials. Multiple locations. Downtown.' },
  { name: 'Sisters Beauty Lounge (City Walk)', lat: 25.2049, lng: 55.2632, category: 'grooming', description: 'Premium ladies salon. 8 min drive.' },
  { name: 'The Grooming Company (DIFC)', lat: 25.2136, lng: 55.2818, category: 'grooming', description: 'Men\'s grooming. Barber, skincare. 8 min drive.' },
  { name: 'Toni & Guy (Dubai Mall)', lat: 25.1984, lng: 55.2789, category: 'grooming', description: 'UK hair salon chain. Cut, colour, styling. Downtown.' },
  { name: 'Pastels Salon (Umm Suqeim)', lat: 25.1524, lng: 55.2062, category: 'grooming', description: 'Premium ladies salon. Al Wasl Road. 15 min drive.' },
  { name: 'Chaps & Co (DIFC)', lat: 25.2132, lng: 55.2808, category: 'grooming', description: 'Barbershop. Beard trims, hot towel shaves. 8 min drive.' },

  // Homeware & Interiors
  { name: 'Pottery Barn (Dubai Mall)', lat: 25.1980, lng: 55.2792, category: 'homeware', description: 'American home furnishing. Dubai Mall. Downtown.' },
  { name: 'West Elm (Dubai Mall)', lat: 25.1978, lng: 55.2790, category: 'homeware', description: 'Modern furniture and decor. Dubai Mall. Downtown.' },
  { name: 'Crate & Barrel (Dubai Mall)', lat: 25.1976, lng: 55.2788, category: 'homeware', description: 'Furniture, kitchen, home decor. Downtown.' },
  { name: 'IKEA (Festival City)', lat: 25.2233, lng: 55.3555, category: 'homeware', description: 'Full IKEA store. Festival City. 15 min drive.' },
  { name: 'THE One (City Walk)', lat: 25.2049, lng: 55.2632, category: 'homeware', description: 'UAE-born interiors brand. City Walk. 8 min drive.' },
  { name: 'Marina Home (Al Quoz)', lat: 25.1301, lng: 55.2223, category: 'homeware', description: 'Home furnishing showroom. Umm Suqeim Street. 15 min drive.' },
  { name: 'Al Quoz Art & Design District', lat: 25.1431, lng: 55.2246, category: 'homeware', description: 'Galleries, custom furniture, bespoke interiors. Alserkal Avenue. 15 min drive.' },

  // Electronics
  { name: 'Apple Store (Dubai Mall)', lat: 25.1982, lng: 55.2794, category: 'malls', description: 'Flagship Apple Store. Products, Genius Bar, workshops. Downtown.' },
  { name: 'Samsung (Dubai Mall)', lat: 25.1980, lng: 55.2792, category: 'malls', description: 'Samsung experience store. Phones, tablets, wearables. Downtown.' },
  { name: 'Virgin Megastore (Dubai Mall)', lat: 25.1978, lng: 55.2790, category: 'malls', description: 'Electronics, books, music, gifts. Dubai Mall. Downtown.' },
  { name: 'Sharaf DG (Dubai Mall)', lat: 25.1976, lng: 55.2788, category: 'malls', description: 'Electronics retailer. Appliances, phones, accessories. Downtown.' },

  // More fashion
  { name: 'Harvey Nichols (Mall of the Emirates)', lat: 25.1177, lng: 55.2000, category: 'fashion', description: 'British luxury department store. 20 min drive.' },
  { name: 'Kinokuniya (Dubai Mall)', lat: 25.1984, lng: 55.2796, category: 'fashion', description: 'Japanese bookstore. Largest in the Middle East. Downtown.' },

  // More grooming
  { name: '1847 (DIFC)', lat: 25.2130, lng: 55.2810, category: 'grooming', description: 'Premium men\'s grooming and barbershop. DIFC. 8 min drive.' },
  { name: 'N.Bar (Dubai Mall)', lat: 25.1983, lng: 55.2791, category: 'grooming', description: 'Express nail bar. Walk-ins welcome. Downtown.' },
];

export default function ShoppingMap() {
  return <NeighbourhoodMap categories={SHOPPING_CATEGORIES} places={SHOPPING_PLACES} center={[25.200, 55.272]} zoom={14} />;
}
