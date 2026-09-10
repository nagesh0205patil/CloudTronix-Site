import CountUp from 'react-countup';
import { stats } from '../data/content';

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-night py-10 text-white">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center shadow-sm">
            <div className="font-heading text-4xl font-bold text-white">
              <CountUp end={item.value} enableScrollSpy scrollSpyOnce duration={2} />
              {item.suffix}
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-300">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
