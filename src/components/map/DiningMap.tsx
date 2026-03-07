import NeighbourhoodMap, { type Category, type Place } from './NeighbourhoodMap';

export const DINING_CATEGORIES: Category[] = [
  { id: 'asian', label: 'Japanese & Asian', icon: '🥢', color: '#ef4444' },
  { id: 'indian-arabic', label: 'Indian & Arabic', icon: '🍛', color: '#f97316' },
  { id: 'european', label: 'European & Latin', icon: '🍷', color: '#c9a96e' },
  { id: 'cafes', label: 'Cafes & Brunch', icon: '☕', color: '#a16207' },
  { id: 'nightlife', label: 'Bars & Nightlife', icon: '🍸', color: '#ec4899' },
];

export const DINING_PLACES: Place[] = [
  // === JAPANESE & ASIAN ===

  // Downtown
  { name: 'Armani/Hashi (Burj Khalifa)', lat: 25.1968, lng: 55.2746, category: 'asian', description: 'Fine dining. Japanese omakase and robatayaki. Gault & Millau listed.' },
  { name: 'Thiptara (Palace Downtown)', lat: 25.1937, lng: 55.2756, category: 'asian', description: 'Fine dining. Thai. Overwater terrace on Burj Lake.' },
  { name: 'Ce La Vi (Address Sky View L54)', lat: 25.1891, lng: 55.2748, category: 'asian', description: 'Premium. Pan-Asian rooftop. Breathtaking Burj Khalifa views.' },
  { name: 'Salvaje (Opera District)', lat: 25.1947, lng: 55.2712, category: 'asian', description: 'Premium. Japanese-Latin fusion. Burj Khalifa terrace views.' },
  { name: 'Inti (The Dubai EDITION L23)', lat: 25.1958, lng: 55.2728, category: 'asian', description: 'Premium. Peruvian-Japanese Nikkei. Terrace with Burj views.' },
  { name: 'Miss Tess (Taj Dubai)', lat: 25.1925, lng: 55.2673, category: 'asian', description: 'Premium. Asian street food fusion. Chinese, Japanese, Thai.' },
  { name: 'MiMi Mei Fair (Address Residences Opera)', lat: 25.1947, lng: 55.2712, category: 'asian', description: 'Fine dining. Contemporary Chinese. Michelin Guide Selected. LSL Capital from Mayfair.' },
  { name: 'Karma Kafe (Souk Al Bahar)', lat: 25.1950, lng: 55.2772, category: 'asian', description: 'Casual. Pan-Asian. Overlooks fountain show.' },
  { name: 'Din Tai Fung (Dubai Mall)', lat: 25.1987, lng: 55.2798, category: 'asian', description: 'Casual. Taiwanese. World-famous xiao long bao dumplings.' },

  // DIFC
  { name: 'Zuma (DIFC)', lat: 25.2133, lng: 55.2807, category: 'asian', description: 'Fine dining. Contemporary Japanese. Michelin Guide selected.' },
  { name: 'Hutong (DIFC)', lat: 25.2134, lng: 55.2808, category: 'asian', description: 'Premium. Northern Chinese. Dim sum. Red lanterns. Terrace views.' },
  { name: 'Sexy Fish (DIFC)', lat: 25.2116, lng: 55.2801, category: 'asian', description: 'Premium. Japanese. London import. Damien Hirst art. City views.' },
  { name: 'Amazonica (DIFC)', lat: 25.2126, lng: 55.2806, category: 'asian', description: 'Premium. Latin American with sushi bar. Rooftop terrace.' },

  // Downtown - more
  { name: 'Katsuya (Address Downtown)', lat: 25.1955, lng: 55.2780, category: 'asian', description: 'Premium. LA-style Japanese. Crispy rice with spicy tuna.' },
  { name: 'Long Teng (Address Downtown)', lat: 25.1953, lng: 55.2778, category: 'asian', description: 'Premium. Chinese. Dim sum, Peking duck. Hotel setting.' },
  { name: 'Noodle House (Souk Al Bahar)', lat: 25.1951, lng: 55.2773, category: 'asian', description: 'Casual. Southeast Asian noodles, stir-fries. Dubai staple.' },
  { name: 'P.F. Chang\'s (Dubai Mall)', lat: 25.1986, lng: 55.2795, category: 'asian', description: 'Casual. American-Chinese chain. Lettuce wraps, kung pao.' },
  { name: 'Wakame (Sofitel Downtown)', lat: 25.1920, lng: 55.2680, category: 'asian', description: 'Premium. Pan-Asian sharing plates. Fountain terrace views.' },

  // DIFC - more
  { name: 'Toko (DIFC)', lat: 25.2129, lng: 55.2807, category: 'asian', description: 'Premium. Contemporary Japanese. Omakase counter. Gate Village.' },

  // Business Bay
  { name: 'ROKA (The Opus)', lat: 25.1862, lng: 55.2648, category: 'asian', description: 'Fine dining. Japanese robatayaki. Globally acclaimed.' },

  // === INDIAN & ARABIC ===

  // Downtown
  { name: 'Jamavar (Address Residences Opera)', lat: 25.1945, lng: 55.2710, category: 'indian-arabic', description: 'Fine dining. Indian. Michelin 1 Star. LSL Capital from Mayfair. Royal Brunch AED 395.' },
  { name: 'Armani/Amal (Burj Khalifa)', lat: 25.1964, lng: 55.2741, category: 'indian-arabic', description: 'Fine dining. Modern Indian. Top-rated. Armani Hotel.' },
  { name: 'Masti (The Dubai EDITION)', lat: 25.1962, lng: 55.2732, category: 'indian-arabic', description: 'Premium. Award-winning modern Indian concept.' },
  { name: 'Ewaan (Palace Downtown)', lat: 25.1937, lng: 55.2758, category: 'indian-arabic', description: 'Premium. Arabic cuisine. Fountain and Burj Khalifa views.' },
  { name: 'Gunaydin (Souk Al Bahar)', lat: 25.1952, lng: 55.2774, category: 'indian-arabic', description: 'Premium. Turkish steaks, kebabs, grills. Since 1965.' },
  { name: 'Abdul Wahab (Souk Al Bahar)', lat: 25.1954, lng: 55.2776, category: 'indian-arabic', description: 'Casual. Lebanese. Authentic mezze and grilled meats.' },
  { name: 'Al Hallab (Dubai Mall)', lat: 25.1983, lng: 55.2794, category: 'indian-arabic', description: 'Casual. Lebanese. Grills, mezze, and traditional sweets.' },
  { name: 'Bombay Brasserie (Taj Dubai)', lat: 25.1927, lng: 55.2675, category: 'indian-arabic', description: 'Premium. Classic Indian. Tandoor oven, open kitchen.' },

  // Downtown - more
  { name: 'Baker & Spice (Souk Al Bahar)', lat: 25.1949, lng: 55.2771, category: 'indian-arabic', description: 'Casual. Mediterranean-Arabic. Fresh seasonal salads. Souk setting.' },
  { name: 'Operation: Falafel (Dubai Mall)', lat: 25.1984, lng: 55.2793, category: 'indian-arabic', description: 'Casual. Falafel wraps and Middle Eastern street food. Great value.' },

  // DIFC
  { name: 'Bombay Borough (DIFC)', lat: 25.2128, lng: 55.2808, category: 'indian-arabic', description: 'Premium. Modern Indian. Chic setting. Gate Village 3.' },
  { name: 'Tresind Studio (DIFC)', lat: 25.2124, lng: 55.2802, category: 'indian-arabic', description: 'Fine dining. Modern Indian. Michelin 1 Star. Multi-course tasting.' },
  { name: 'Coya (DIFC)', lat: 25.2127, lng: 55.2806, category: 'indian-arabic', description: 'Premium. Peruvian. Ceviche, tiradito, pisco sours. Gate Village.' },

  // Business Bay
  { name: 'Rang Mahal (JW Marriott Marquis)', lat: 25.1872, lng: 55.2667, category: 'indian-arabic', description: 'Premium. Indian. Award-winning. Lamb kebab, Mangalorean prawns.' },

  // === EUROPEAN & LATIN ===

  // Downtown
  { name: 'At.mosphere (Burj Khalifa L122)', lat: 25.1972, lng: 55.2744, category: 'european', description: 'Fine dining. European. World\'s highest restaurant.' },
  { name: 'Armani/Ristorante (Burj Khalifa)', lat: 25.1966, lng: 55.2743, category: 'european', description: 'Fine dining. Italian degustation. Michelin Guide listed.' },
  { name: 'KRASOTA (Address Downtown)', lat: 25.1953, lng: 55.2780, category: 'european', description: 'Fine dining. Immersive art-and-gastronomy experience.' },
  { name: 'Duomo (The Dubai EDITION)', lat: 25.1960, lng: 55.2730, category: 'european', description: 'Fine dining. Modern Italian. Sicilian influences.' },
  { name: 'Belcanto (Dubai Opera)', lat: 25.1956, lng: 55.2719, category: 'european', description: 'Fine dining. European. Rooftop of Dubai Opera.' },
  { name: 'Billionaire (Mandarin Oriental L61)', lat: 25.1938, lng: 55.2750, category: 'european', description: 'Fine dining. Italian-Japanese. World-class entertainment.' },
  { name: 'Lion in the Sun (Mandarin Oriental L62)', lat: 25.1940, lng: 55.2752, category: 'european', description: 'Fine dining. Open-fire Mediterranean. 360-degree views.' },
  { name: 'Urla (Address Downtown)', lat: 25.1955, lng: 55.2782, category: 'european', description: 'Premium. Aegean Mediterranean. Fountain terrace views.' },
  { name: 'BiCE Mare (Souk Al Bahar)', lat: 25.1948, lng: 55.2770, category: 'european', description: 'Premium. Italian seafood. Award-winning. Fountain views.' },
  { name: 'The Eloquent Elephant (Taj Dubai)', lat: 25.1923, lng: 55.2671, category: 'european', description: 'Casual. British gastropub. Creative international menu.' },
  { name: 'Eataly (Dubai Mall)', lat: 25.1985, lng: 55.2796, category: 'european', description: 'Casual. Italian food hall. Pizza, pasta, fresh products.' },
  { name: 'Social House (Dubai Mall)', lat: 25.1989, lng: 55.2800, category: 'european', description: 'Casual. International. Fountain-view terrace.' },

  // DIFC
  { name: 'La Petite Maison (DIFC)', lat: 25.2135, lng: 55.2815, category: 'european', description: 'Fine dining. French. Time Out Restaurant of the Decade.' },
  { name: 'Roberto\'s (DIFC)', lat: 25.2130, lng: 55.2810, category: 'european', description: 'Fine dining. Italian. DIFC staple since 2012.' },
  { name: 'Cipriani (DIFC)', lat: 25.2128, lng: 55.2812, category: 'european', description: 'Fine dining. Italian. Venice Harry\'s Bar lineage.' },
  { name: 'Bull & Bear (Waldorf Astoria DIFC)', lat: 25.2138, lng: 55.2820, category: 'european', description: 'Fine dining. Steakhouse. Art Deco. Burj Khalifa views.' },
  { name: 'Josette (ICD Brookfield Place)', lat: 25.2120, lng: 55.2804, category: 'european', description: 'Fine dining. French with cabaret shows.' },
  { name: 'Barrafina (DIFC)', lat: 25.2131, lng: 55.2811, category: 'european', description: 'Premium. Spanish tapas. London cult favourite.' },
  { name: 'Sucre (DIFC)', lat: 25.2132, lng: 55.2810, category: 'european', description: 'Premium. Argentinian. Open-fire cooking. Michelin Guide.' },
  { name: 'Avli by tashas (DIFC)', lat: 25.2137, lng: 55.2813, category: 'european', description: 'Premium. Greek/Mediterranean. Vibrant interiors.' },

  // Downtown - more
  { name: 'Fouquet\'s (Burj Plaza)', lat: 25.1973, lng: 55.2738, category: 'european', description: 'Fine dining. French brasserie. Paris institution since 1899.' },
  { name: 'Scalini (Al Murooj Downtown)', lat: 25.1915, lng: 55.2735, category: 'european', description: 'Premium. Italian. Celebrity favourite. Truffle pasta.' },

  // DIFC - more
  { name: 'STK (DIFC)', lat: 25.2119, lng: 55.2800, category: 'european', description: 'Premium. New York steakhouse. DJ, cocktails, party atmosphere.' },
  { name: 'Brasserie Boulud (Sofitel DIFC)', lat: 25.2098, lng: 55.2783, category: 'european', description: 'Fine dining. French by Daniel Boulud. Michelin-starred chef.' },

  // Business Bay
  { name: 'Prime68 (JW Marriott Marquis L68)', lat: 25.1870, lng: 55.2665, category: 'european', description: 'Fine dining. Steakhouse. Panoramic skyline views.' },
  { name: 'La Table du MusicHall (SLS Dubai L74)', lat: 25.1859, lng: 55.2641, category: 'european', description: 'Premium. Mediterranean. Live music and entertainment.' },
  { name: 'Fi\'lia (SLS Dubai L70)', lat: 25.1858, lng: 55.2640, category: 'european', description: 'Fine dining. Italian. Handmade pasta. Michelin Guide.' },
  { name: 'Carna (SLS Dubai L74)', lat: 25.1860, lng: 55.2642, category: 'european', description: 'Fine dining. Steakhouse by Dario Cecchini.' },
  { name: 'Couqley (Business Bay)', lat: 25.1870, lng: 55.2660, category: 'european', description: 'Casual. French brasserie. Most affordable French in Dubai.' },

  // === CAFES & BRUNCH ===

  // Downtown
  { name: '% Arabica (Dubai Mall)', lat: 25.1985, lng: 55.2792, category: 'cafes', description: 'Kyoto-born specialty coffee. Minimal design.' },
  { name: 'Angelina Paris (Dubai Mall)', lat: 25.1988, lng: 55.2797, category: 'cafes', description: 'French patisserie. Famous hot chocolate and tarts.' },
  { name: 'Boon Coffee Roasters (Boulevard)', lat: 25.1930, lng: 55.2752, category: 'cafes', description: 'Ethiopian specialty roastery. Outdoor terrace, Burj views.' },
  { name: 'BRIX Cafe (Boulevard)', lat: 25.1925, lng: 55.2755, category: 'cafes', description: 'By the 3 Fils team. Quality specialty coffee and desserts.' },
  { name: 'Apricot (Old Town)', lat: 25.1940, lng: 55.2760, category: 'cafes', description: 'European-Mediterranean cafe. V60 coffee. Burj Khalifa views.' },
  { name: 'BohoX (Boulevard)', lat: 25.1928, lng: 55.2758, category: 'cafes', description: 'All-day breakfast. Shakshuka, Mediterranean bowls.' },
  { name: 'Secret Garden by L\'ETO (Opera District)', lat: 25.1945, lng: 55.2714, category: 'cafes', description: 'Floral-themed cafe. French pastries. Specialty coffee.' },
  { name: 'Armani/Deli (Burj Khalifa)', lat: 25.1970, lng: 55.2742, category: 'cafes', description: 'Italian deli. Al fresco terrace. Dubai Fountain views.' },

  // DIFC
  { name: 'Orijins (DIFC)', lat: 25.2131, lng: 55.2812, category: 'cafes', description: 'Minimalist specialty cafe. Three coffee types plus pastries.' },
  { name: 'EL&N (DIFC)', lat: 25.2130, lng: 55.2814, category: 'cafes', description: 'Instagram-famous cafe. Flower wall. Plant-based options.' },
  { name: 'Common Grounds (DIFC)', lat: 25.2126, lng: 55.2809, category: 'cafes', description: 'Melbourne-inspired all-day cafe. Health-conscious.' },
  { name: 'Duck & Waffle (DIFC)', lat: 25.2115, lng: 55.2800, category: 'cafes', description: 'London import. Weekend brunch. Creative twists.' },

  // Downtown - more
  { name: 'Jones the Grocer (Boulevard)', lat: 25.1928, lng: 55.2750, category: 'cafes', description: 'Australian-style all-day cafe. Cheese platters. Good coffee.' },
  { name: 'Shakespeare and Co (Boulevard)', lat: 25.1926, lng: 55.2748, category: 'cafes', description: 'Vintage French decor. Huge menu. Open late. Downtown staple.' },
  { name: 'Paul (Dubai Mall)', lat: 25.1987, lng: 55.2796, category: 'cafes', description: 'French bakery-cafe chain. Croissants, sandwiches, coffee.' },
  { name: 'Tim Hortons (Boulevard)', lat: 25.1930, lng: 55.2755, category: 'cafes', description: 'Canadian chain. Quick coffee and donuts. Multiple locations.' },

  // Business Bay
  { name: 'La Farine (JW Marriott Marquis)', lat: 25.1868, lng: 55.2663, category: 'cafes', description: 'Artisan bakery-cafe. Best baguettes in Dubai.' },
  { name: 'Circle Cafe (Bay Square)', lat: 25.1875, lng: 55.2650, category: 'cafes', description: 'All-day cafe. All-you-can-eat breakfast.' },
  { name: 'Risen Cafe (First Collection)', lat: 25.1845, lng: 55.2630, category: 'cafes', description: 'Artisanal bakery. Fresh bread, cakes, specialty coffee.' },

  // === BARS & NIGHTLIFE ===

  // Downtown
  { name: 'At.mosphere Lounge (Burj Khalifa L122)', lat: 25.1973, lng: 55.2745, category: 'nightlife', description: 'Cocktails at 442 metres. Dress code enforced.' },
  { name: 'Nazcaa (Address Dubai Mall L12)', lat: 25.1990, lng: 55.2800, category: 'nightlife', description: 'Peruvian-Japanese rooftop. Cocktails. Burj Khalifa views.' },
  { name: 'Amelia Lounge (Address Sky View L54)', lat: 25.1893, lng: 55.2750, category: 'nightlife', description: 'Nikkei cocktails. Steampunk-inspired.' },
  { name: 'Le Toit (Burj Plaza)', lat: 25.1975, lng: 55.2740, category: 'nightlife', description: 'Parisian rooftop lounge above Fouquet\'s. Live DJ.' },
  { name: 'Treehouse (Taj Dubai)', lat: 25.1925, lng: 55.2671, category: 'nightlife', description: 'Rooftop bar. Lush greenery. Two decks. Burj views.' },
  { name: 'Himitsu (Opera District)', lat: 25.1950, lng: 55.2715, category: 'nightlife', description: 'Hidden speakeasy. 1,200 cocktail combinations.' },
  { name: 'The Loft at Dubai Opera', lat: 25.1956, lng: 55.2719, category: 'nightlife', description: 'Wine and cocktail bar. Pre-show drinks.' },

  // DIFC
  { name: 'Galaxy Bar (DIFC)', lat: 25.2137, lng: 55.2813, category: 'nightlife', description: 'World\'s 50 Best Bars. 30 seats. Cosmic cocktails.' },
  { name: 'Moonshine (DIFC)', lat: 25.2132, lng: 55.2811, category: 'nightlife', description: 'Speakeasy behind a fridge door. Best in Dubai.' },
  { name: 'CLAP (DIFC L9)', lat: 25.2125, lng: 55.2805, category: 'nightlife', description: 'Rooftop. 180-degree views. Best bar with a view.' },
  { name: '1920 (ICD Brookfield L52)', lat: 25.2122, lng: 55.2803, category: 'nightlife', description: 'Jazz-age cocktails. Art Deco. Panoramic skyline.' },
  { name: 'Zuma Lounge (DIFC)', lat: 25.2134, lng: 55.2808, category: 'nightlife', description: 'Above Zuma restaurant. Japanese-craft cocktails.' },

  // Downtown - more
  { name: 'Moon Bar by MiMi (Address Residences Opera)', lat: 25.1948, lng: 55.2713, category: 'nightlife', description: 'Cocktail bar above MiMi Mei Fair. Pre-dinner drinks.' },
  { name: 'Vault (JW Marriott Marquis L71)', lat: 25.1871, lng: 55.2666, category: 'nightlife', description: 'Sky bar. Cocktails with panoramic skyline views.' },

  // Business Bay
  { name: 'Privilege (SLS Dubai Rooftop)', lat: 25.1857, lng: 55.2639, category: 'nightlife', description: 'Rooftop. Two infinity pools. Creative cocktails. Light bites.' },
  { name: 'Salmon Guru (The Opus)', lat: 25.1864, lng: 55.2650, category: 'nightlife', description: 'Madrid import. Award-winning creative cocktails.' },
  { name: 'High Society (The Lana)', lat: 25.1880, lng: 55.2660, category: 'nightlife', description: 'Luxury rooftop. Infinity pool. Burj Khalifa views.' },
  { name: 'Honeycomb Hi-Fi (Pullman)', lat: 25.1855, lng: 55.2655, category: 'nightlife', description: 'Speakeasy. Vinyl store. Live DJs. Cocktails.' },
];

export default function DiningMap() {
  return <NeighbourhoodMap categories={DINING_CATEGORIES} places={DINING_PLACES} center={[25.200, 55.274]} zoom={14} />;
}
