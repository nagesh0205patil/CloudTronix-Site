import { motion } from 'framer-motion';
import { ArrowRight, Gauge, PlayCircle, ShieldCheck, Zap } from 'lucide-react';
import heroImage from '../../assets/images/cloudtronix-hero.png';
import Button from '../Buttons/Button';

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-night text-white">
      <img
        src={heroImage}
        alt="Smart IoT electronics, automation, and agriculture technology"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/82 to-night/35" />
      <div className="container-page relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-16">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-accent">Embedded IoT, automation, and technical training</p>
          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
            Next-generation IoT systems for products, labs, farms, and facilities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            CloudTronix designs connected hardware, embedded firmware, cloud dashboards, and deployment-ready automation solutions with practical engineering discipline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/products" icon={ArrowRight}>Explore Products</Button>
            <Button to="/contact" variant="secondary" icon={PlayCircle}>Start a Project</Button>
          </div>
          <div className="mt-10 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <HeroPoint icon={ShieldCheck} title="Field-ready" />
            <HeroPoint icon={Gauge} title="Dashboard-driven" />
            <HeroPoint icon={Zap} title="Prototype to pilot" />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent dark:from-night" />
    </section>
  );
}

function HeroPoint({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
      <Icon aria-hidden="true" className="h-5 w-5 text-accent" />
      <span className="font-semibold">{title}</span>
    </div>
  );
}
