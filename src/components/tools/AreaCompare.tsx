import { useState, useMemo } from 'react';

export interface AreaData {
  id: string;
  name: string;
  tagline: string;
  propertyType: 'apartment' | 'villa' | 'mixed';
  avgPricePerSqft: string;
  rentalYield: string;
  serviceCharge: string;
  beachfront: boolean;
  freehold: boolean;
  highlights: string[];
  pros: string[];
  cons: string[];
  lifestyle: string;
  nearbyAreas: string[];
}

interface Props {
  areas: AreaData[];
  comparisons: { areaOne: string; areaTwo: string; slug: string }[];
}

function StatRow({ label, valueA, valueB }: { label: string; valueA: string; valueB: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-3 px-4 text-[11px] tracking-wider uppercase text-white/40 font-medium w-1/3">{label}</td>
      <td className="py-3 px-4 text-sm text-white/80">{valueA}</td>
      <td className="py-3 px-4 text-sm text-white/80">{valueB}</td>
    </tr>
  );
}

function BoolRow({ label, valueA, valueB }: { label: string; valueA: boolean; valueB: boolean }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-3 px-4 text-[11px] tracking-wider uppercase text-white/40 font-medium">{label}</td>
      <td className="py-3 px-4 text-sm">
        <span className={valueA ? 'text-green-400' : 'text-white/30'}>{valueA ? 'Yes' : 'No'}</span>
      </td>
      <td className="py-3 px-4 text-sm">
        <span className={valueB ? 'text-green-400' : 'text-white/30'}>{valueB ? 'Yes' : 'No'}</span>
      </td>
    </tr>
  );
}

const TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartments',
  villa: 'Villas',
  mixed: 'Mixed (Apartments & Villas)',
};

export default function AreaCompare({ areas, comparisons }: Props) {
  const [areaOneId, setAreaOneId] = useState('');
  const [areaTwoId, setAreaTwoId] = useState('');

  const areaOne = useMemo(() => areas.find(a => a.id === areaOneId), [areas, areaOneId]);
  const areaTwo = useMemo(() => areas.find(a => a.id === areaTwoId), [areas, areaTwoId]);

  const writtenComparison = useMemo(() => {
    if (!areaOneId || !areaTwoId) return null;
    return comparisons.find(c =>
      (c.areaOne === areaOneId && c.areaTwo === areaTwoId) ||
      (c.areaOne === areaTwoId && c.areaTwo === areaOneId)
    );
  }, [areaOneId, areaTwoId, comparisons]);

  const swapAreas = () => {
    setAreaOneId(areaTwoId);
    setAreaTwoId(areaOneId);
  };

  return (
    <div>
      {/* Selectors */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="flex-1 w-full">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium mb-2">Area One</label>
          <select
            value={areaOneId}
            onChange={e => setAreaOneId(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0f0f0f]">Select an area...</option>
            {areas.map(a => (
              <option key={a.id} value={a.id} disabled={a.id === areaTwoId} className="bg-[#0f0f0f]">
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swapAreas}
          disabled={!areaOneId || !areaTwoId}
          className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 mt-5"
          title="Swap areas"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>

        <div className="flex-1 w-full">
          <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium mb-2">Area Two</label>
          <select
            value={areaTwoId}
            onChange={e => setAreaTwoId(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0f0f0f]">Select an area...</option>
            {areas.map(a => (
              <option key={a.id} value={a.id} disabled={a.id === areaOneId} className="bg-[#0f0f0f]">
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Content */}
      {areaOne && areaTwo ? (
        <div>
          {/* Written comparison link */}
          {writtenComparison && (
            <div className="mb-6 p-4 border border-[#c9a96e]/30 bg-[#c9a96e]/5">
              <div className="flex items-center gap-2 text-[#c9a96e] text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <a href={`/comparisons/${writtenComparison.slug}`} className="hover:underline">
                  Read the full written comparison for these two areas
                </a>
              </div>
            </div>
          )}

          {/* Headers */}
          <div className="grid grid-cols-3 gap-0 mb-0">
            <div></div>
            <div className="p-4 border-b border-[#c9a96e]/30">
              <h3 className="font-heading text-lg font-bold text-white">{areaOne.name}</h3>
              <p className="text-white/40 text-xs mt-1">{areaOne.tagline}</p>
            </div>
            <div className="p-4 border-b border-[#c9a96e]/30">
              <h3 className="font-heading text-lg font-bold text-white">{areaTwo.name}</h3>
              <p className="text-white/40 text-xs mt-1">{areaTwo.tagline}</p>
            </div>
          </div>

          {/* Stats Table */}
          <table className="w-full">
            <tbody>
              <StatRow label="Avg Price/sqft" valueA={areaOne.avgPricePerSqft} valueB={areaTwo.avgPricePerSqft} />
              <StatRow label="Rental Yield" valueA={areaOne.rentalYield} valueB={areaTwo.rentalYield} />
              <StatRow label="Service Charge" valueA={areaOne.serviceCharge} valueB={areaTwo.serviceCharge} />
              <StatRow label="Property Type" valueA={TYPE_LABELS[areaOne.propertyType] || areaOne.propertyType} valueB={TYPE_LABELS[areaTwo.propertyType] || areaTwo.propertyType} />
              <BoolRow label="Beachfront" valueA={areaOne.beachfront} valueB={areaTwo.beachfront} />
              <BoolRow label="Freehold" valueA={areaOne.freehold} valueB={areaTwo.freehold} />
            </tbody>
          </table>

          {/* Highlights */}
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium mb-4">Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-2">
                {areaOne.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-[#c9a96e] mt-0.5 flex-shrink-0">+</span>
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {areaTwo.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-[#c9a96e] mt-0.5 flex-shrink-0">+</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pros */}
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-green-400/80 font-medium mb-4">Pros</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-2">
                {areaOne.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {areaTwo.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cons */}
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-red-400/80 font-medium mb-4">Cons</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-2">
                {areaOne.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">-</span>
                    {c}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {areaTwo.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">-</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] font-medium mb-4">Lifestyle</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p className="text-sm text-white/60 leading-relaxed">{areaOne.lifestyle}</p>
              <p className="text-sm text-white/60 leading-relaxed">{areaTwo.lifestyle}</p>
            </div>
          </div>

          {/* Links to area pages */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`/areas/${areaOne.id}`}
              className="flex-1 text-center px-4 py-3 border border-white/10 text-white/60 text-sm hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
            >
              Read full {areaOne.name} guide
            </a>
            <a
              href={`/areas/${areaTwo.id}`}
              className="flex-1 text-center px-4 py-3 border border-white/10 text-white/60 text-sm hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all"
            >
              Read full {areaTwo.name} guide
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-white/30">
          <svg className="w-12 h-12 mx-auto mb-4 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <p className="text-sm">Select two areas above to compare them side by side.</p>
        </div>
      )}
    </div>
  );
}
