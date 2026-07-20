import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
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
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/78 to-night/20" />
      <div className="container-page relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-16">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-accent">CloudTronix</p> */}
          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
            Innovative IoT Solutions for Smart Industries & Smart Agriculture
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Building intelligent electronics, IoT solutions, industrial automation, and professional technical training.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/products" icon={ArrowRight}>Explore Products</Button>
            <Button to="/contact" variant="secondary" icon={PlayCircle}>Contact Us</Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent dark:from-night" />
    </section>
  );
}
