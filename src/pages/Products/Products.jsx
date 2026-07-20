import { motion, useReducedMotion } from 'framer-motion';
import { Check, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import CTA from '../../components/CTA/CTA';
import ProductResources from '../../components/ProductResources/ProductResources';
import Seo from '../../components/Seo';
import { products } from '../../data/productsData';

const seoDescription = 'Explore CloudTronix smart laboratory, agriculture, and water automation products, with product applications, manuals, guides, and software resources.';

export default function Products() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo title="Smart IoT Products & Downloads" description={seoDescription} path="/products" />
      <header className="relative overflow-hidden bg-night py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,180,216,0.18),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(0,87,217,0.22),transparent_35%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:48px_48px]" />
        <motion.div
          className="container-page relative"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary backdrop-blur">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Connected Product Portfolio
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Engineering products built for measurable, real-world outcomes.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Smart systems for electronics laboratories, agriculture, and water infrastructure—with software and documentation managed in one dependable resource hub.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
            <TrustPoint icon={Layers3}>Modular platforms</TrustPoint>
            <TrustPoint icon={ShieldCheck}>Deployment focused</TrustPoint>
            <TrustPoint icon={Check}>Centralized resources</TrustPoint>
          </div>
        </motion.div>
      </header>

      <main className="section-pad overflow-hidden bg-surface dark:bg-night">
        <div className="container-page space-y-8 lg:space-y-10">
          {products.map((product, index) => (
            <ProductPanel key={product.slug} product={product} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </main>
      <CTA />
    </>
  );
}

function ProductPanel({ product, index, reduceMotion }) {
  const Icon = product.icon;

  return (
    <motion.article
      id={product.slug}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.04]"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.12) }}
    >
      <div className="min-w-0 p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10 dark:bg-secondary/15 dark:text-secondary dark:ring-secondary/20">
              <Icon aria-hidden="true" className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-secondary">CloudTronix Product</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-ink dark:text-white sm:text-4xl">{product.name}</h2>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted dark:text-slate-300">{product.description}</p>

          <div className="mt-8 grid gap-7 sm:grid-cols-3">
            <FeatureList title="Features" items={product.features} />
            <FeatureList title="Applications" items={product.applications} />
            <FeatureList title="Specifications" items={product.specs} />
          </div>
      </div>
      <ProductResources productName={product.name} intro={product.resourceIntro} resources={product.resources} />
    </motion.article>
  );
}

function FeatureList({ title, items = [] }) {
  return (
    <section aria-label={title}>
      <h3 className="font-heading text-base font-bold text-ink dark:text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrustPoint({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-sm">
      <Icon aria-hidden="true" className="h-4 w-4 text-accent" /> {children}
    </span>
  );
}
