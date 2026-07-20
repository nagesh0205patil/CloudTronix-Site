import { ArrowRight, Phone } from 'lucide-react';
import Button from '../Buttons/Button';

export default function CTA() {
  return (
    <section className="bg-primary py-14 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-100">Build with CloudTronix</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">Ready to automate, connect, or train your team?</h2>
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
