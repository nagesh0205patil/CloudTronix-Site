import { motion, useReducedMotion } from 'framer-motion';
import { Check, Layers3, ShieldCheck } from 'lucide-react';
import CTA from '../../components/CTA/CTA';
import PageHero from '../../components/PageHero';
import ProductResources from '../../components/ProductResources/ProductResources';
import Seo from '../../components/Seo';
import { products } from '../../data/productsData';

const seoDescription = 'Explore CloudTronix smart laboratory, agriculture, and water automation products, with product applications, manuals, guides, and software resources.';

export default function Products() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo title="Smart IoT Products & Downloads" description={seoDescription} path="/products" />
      <PageHero
        eyebrow="Connected Product Portfolio"
        title="Smart products built for measurable, real-world outcomes."
        text="Systems for electronics laboratories, agriculture, and water infrastructure, with software and documentation managed in one dependable resource hub."
        actions={
          <>
            <TrustPoint icon={Layers3}>Modular platforms</TrustPoint>
            <TrustPoint icon={ShieldCheck}>Deployment focused</TrustPoint>
            <TrustPoint icon={Check}>Centralized resources</TrustPoint>
          </>
        }
      />

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
      className="scroll-mt-24 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.04]"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.12) }}
    >
      <div className="min-w-0 p-6 sm:p-8 lg:p-10">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10 dark:bg-secondary/15 dark:text-secondary dark:ring-secondary/20">
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
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-slate-200 backdrop-blur-sm">
      <Icon aria-hidden="true" className="h-4 w-4 text-accent" /> {children}
    </span>
  );
}
