import { useState, useMemo } from 'react';
import type { AreaData } from './AreaCompare';

const base = import.meta.env.BASE_URL;

interface Props {
  areas: AreaData[];
}

type PriceRange = 'any' | 'under-1500' | '1500-2500' | '2500-3500' | 'over-3500';
type PropertyType = 'any' | 'apartment' | 'villa' | 'mixed';

function parsePriceRange(priceStr: string): [number, number] {
  const nums = priceStr.replace(/[^0-9,.-]/g, '').split(/[-,]/).map(s => parseInt(s.replace(/,/g, ''), 10)).filter(n => !isNaN(n));
  if (nums.length >= 2) return [Math.min(...nums), Math.max(...nums)];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [0, 99999];
}

function parseYieldRange(yieldStr: string): [number, number] {
  const nums = yieldStr.replace(/[^0-9.%-]/g, '').split(/[-]/).map(s => parseFloat(s)).filter(n => !isNaN(n));
  if (nums.length >= 2) return [Math.min(...nums), Math.max(...nums)];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [0, 0];
}

function matchesPriceFilter(area: AreaData, filter: PriceRange): boolean {
  if (filter === 'any') return true;
  const [low, high] = parsePriceRange(area.avgPricePerSqft);
  switch (filter) {
    case 'under-1500': return low < 1500;
    case '1500-2500': return low <= 2500 && high >= 1500;
    case '2500-3500': return low <= 3500 && high >= 2500;
    case 'over-3500': return high > 3500;
    default: return true;
  }
}

const TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartments',
  villa: 'Villas',
  mixed: 'Mixed',
};

export default function AreaFinder({ areas }: Props) {
  const [priceRange, setPriceRange] = useState<PriceRange>('any');
  const [propertyType, setPropertyType] = useState<PropertyType>('any');
  const [beachfront, setBeachfront] = useState<'any' | 'yes' | 'no'>('any');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'yield'>('name');
  const [similarTo, setSimilarTo] = useState('');

  const filteredAreas = useMemo(() => {
    let results = [...areas];

    // Similar-to mode
    if (similarTo) {
      const sourceArea = areas.find(a => a.id === similarTo);
      if (sourceArea) {
        const [srcLow, srcHigh] = parsePriceRange(sourceArea.avgPricePerSqft);
        const srcMidPrice = (srcLow + srcHigh) / 2;
        results = results
          .filter(a => a.id !== similarTo)
          .map(a => {
            const [aLow, aHigh] = parsePriceRange(a.avgPricePerSqft);
            const aMidPrice = (aLow + aHigh) / 2;
            const priceDiff = Math.abs(srcMidPrice - aMidPrice) / srcMidPrice;
            const typeMatch = a.propertyType === sourceArea.propertyType ? 0 : 0.3;
            const beachMatch = a.beachfront === sourceArea.beachfront ? 0 : 0.2;
            return { ...a, similarity: priceDiff + typeMatch + beachMatch };
          })
          .sort((a, b) => (a as any).similarity - (b as any).similarity);
        return results;
      }
    }

    // Standard filters
    if (priceRange !== 'any') {
      results = results.filter(a => matchesPriceFilter(a, priceRange));
    }
    if (propertyType !== 'any') {
      results = results.filter(a => a.propertyType === propertyType);
    }
    if (beachfront !== 'any') {
      results = results.filter(a => a.beachfront === (beachfront === 'yes'));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => parsePriceRange(a.avgPricePerSqft)[0] - parsePriceRange(b.avgPricePerSqft)[0]);
        break;
      case 'price-high':
        results.sort((a, b) => parsePriceRange(b.avgPricePerSqft)[0] - parsePriceRange(a.avgPricePerSqft)[0]);
        break;
      case 'yield':
        results.sort((a, b) => parseYieldRange(b.rentalYield)[1] - parseYieldRange(a.rentalYield)[1]);
        break;
      default:
        results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [areas, priceRange, propertyType, beachfront, sortBy, similarTo]);

  const clearFilters = () => {
    setPriceRange('any');
    setPropertyType('any');
    setBeachfront('any');
    setSortBy('name');
    setSimilarTo('');
  };

  const hasFilters = priceRange !== 'any' || propertyType !== 'any' || beachfront !== 'any' || similarTo !== '';

  return (
    <div>
      {/* Filter Bar */}
      <div className="p-6 border border-white/10 bg-white/[0.02] mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium">Filters</span>
          {hasFilters && (
            <button onClick={clearFilters} className="text-[10px] tracking-wider uppercase text-white/40 hover:text-white/60 transition-colors">
              Clear All
            </button>
          )}
        </div>

        {/* Similar-to selector */}
        <div className="mb-4">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">Find areas similar to...</label>
          <select
            value={similarTo}
            onChange={e => setSimilarTo(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0f0f0f]">None (use filters below)</option>
            {areas.map(a => (
              <option key={a.id} value={a.id} className="bg-[#0f0f0f]">{a.name}</option>
            ))}
          </select>
        </div>

        {!similarTo && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">Price Range (AED/sqft)</label>
              <select
                value={priceRange}
                onChange={e => setPriceRange(e.target.value as PriceRange)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="any" className="bg-[#0f0f0f]">Any Price</option>
                <option value="under-1500" className="bg-[#0f0f0f]">Under AED 1,500</option>
                <option value="1500-2500" className="bg-[#0f0f0f]">AED 1,500 - 2,500</option>
                <option value="2500-3500" className="bg-[#0f0f0f]">AED 2,500 - 3,500</option>
                <option value="over-3500" className="bg-[#0f0f0f]">Over AED 3,500</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">Property Type</label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value as PropertyType)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="any" className="bg-[#0f0f0f]">Any Type</option>
                <option value="apartment" className="bg-[#0f0f0f]">Apartments</option>
                <option value="villa" className="bg-[#0f0f0f]">Villas</option>
                <option value="mixed" className="bg-[#0f0f0f]">Mixed (Apartments & Villas)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">Beachfront</label>
              <select
                value={beachfront}
                onChange={e => setBeachfront(e.target.value as 'any' | 'yes' | 'no')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="any" className="bg-[#0f0f0f]">Any</option>
                <option value="yes" className="bg-[#0f0f0f]">Beachfront Only</option>
                <option value="no" className="bg-[#0f0f0f]">Non-Beachfront</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="name" className="bg-[#0f0f0f]">Name (A-Z)</option>
                <option value="price-low" className="bg-[#0f0f0f]">Price: Low to High</option>
                <option value="price-high" className="bg-[#0f0f0f]">Price: High to Low</option>
                <option value="yield" className="bg-[#0f0f0f]">Highest Yield</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] text-white/40">
          {filteredAreas.length} area{filteredAreas.length !== 1 ? 's' : ''} found
          {similarTo && ` similar to ${areas.find(a => a.id === similarTo)?.name}`}
        </span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAreas.map((area, idx) => (
          <a
            key={area.id}
            href={`${base}areas/${area.id}`}
            className="group block p-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c9a96e]/30 transition-all duration-300"
          >
            {similarTo && (
              <div className="text-[10px] tracking-wider uppercase text-[#c9a96e]/60 mb-2">
                #{idx + 1} closest match
              </div>
            )}
            <h3 className="font-heading text-base font-bold text-white group-hover:text-[#c9a96e] transition-colors">
              {area.name}
            </h3>
            <p className="text-white/30 text-xs mt-1 mb-4">{area.tagline}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Price/sqft</span>
                <span className="text-white/70">{area.avgPricePerSqft}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Rental Yield</span>
                <span className="text-white/70">{area.rentalYield}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Service Charge</span>
                <span className="text-white/70">{area.serviceCharge}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Type</span>
                <span className="text-white/70">{TYPE_LABELS[area.propertyType] || area.propertyType}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {area.beachfront && (
                <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400">Beachfront</span>
              )}
              {area.freehold && (
                <span className="text-[10px] px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400">Freehold</span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-1 text-[11px] text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors">
              View area guide
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {filteredAreas.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <p className="text-sm mb-2">No areas match your filters.</p>
          <button onClick={clearFilters} className="text-[#c9a96e] text-sm hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  );
}
