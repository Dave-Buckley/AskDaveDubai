import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

interface Props {
  stats: Stat[];
}

export function StatsCounter({ stats }: Props) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        stats.forEach((stat, i) => {
          const duration = 2000;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, stat.value);
            setCounts(prev => prev.map((v, idx) => idx === i ? Math.round(current) : v));
            if (current >= stat.value) clearInterval(timer);
          }, duration / steps);
        });

        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stats]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center"
    >
      {stats.map((stat, i) => (
        <div key={i}>
          <div className="font-heading text-5xl sm:text-6xl font-bold text-paper leading-none">
            {stat.prefix}{counts[i]}{stat.suffix}
          </div>
          <div className="mt-2 text-sm tracking-widest uppercase text-paper/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
