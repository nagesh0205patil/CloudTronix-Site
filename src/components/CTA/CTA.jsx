import { ArrowRight, Phone } from 'lucide-react';
import Button from '../Buttons/Button';

export default function CTA() {
  return (
    <section className="border-y border-white/10 bg-night py-14 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Build with CloudTronix</p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-bold leading-tight">Plan your next connected product, automation system, or training lab.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" variant="secondary" icon={ArrowRight}>
            Get Quote
          </Button>
          <Button href="tel:+918329351507" variant="ghost" icon={Phone} className="text-white hover:bg-white/10">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}
