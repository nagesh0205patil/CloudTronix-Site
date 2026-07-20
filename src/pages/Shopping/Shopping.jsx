import { motion, useReducedMotion } from 'framer-motion';
import {
  BatteryCharging,
  Cpu,
  Droplets,
  Gauge,
  Leaf,
  Microscope,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Wifi,
  Zap,
} from 'lucide-react';
import Button from '../../components/Buttons/Button';
import Seo from '../../components/Seo';

const categories = [
  { title: 'Development Boards', count: '18 items', icon: Cpu },
  { title: 'Sensors', count: '32 items', icon: Gauge },
  { title: 'IoT Modules', count: '24 items', icon: Wifi },
  { title: 'Power & Batteries', count: '15 items', icon: BatteryCharging },
  { title: 'Electronic Components', count: '70+ items', icon: Zap },
  { title: 'Automation Controllers', count: '12 items', icon: SlidersHorizontal },
];

const featuredProducts = [
  {
    name: 'Plotronix Lab Kit',
    category: 'CloudTronix Product',
    price: 'Request Price',
    mrp: 'Academic bundle',
    badge: 'Featured',
    icon: Microscope,
    color: 'from-sky-500 to-cyan-400',
    specs: ['VI curve plotting', 'USB interface', 'Lab manual ready'],
  },
  {
    name: 'Krashitronix Pump Controller',
    category: 'Agriculture IoT',
    price: 'Request Price',
    mrp: 'Field install kit',
    badge: 'Popular',
    icon: Leaf,
    color: 'from-emerald-500 to-lime-400',
    specs: ['Mobile control', 'Dry-run safety', 'Cloud alerts'],
  },
  {
    name: 'Aquatronix Water Controller',
    category: 'Water Automation',
    price: 'Request Price',
    mrp: 'Site survey available',
    badge: 'New',
    icon: Droplets,
    color: 'from-blue-500 to-teal-400',
    specs: ['Tank monitoring', 'Motor automation', 'Overflow protection'],
  },
  {
    name: 'ESP32 IoT Starter Module',
    category: 'Wireless Module',
    price: 'Rs. 349',
    mrp: 'Incl. GST',
    badge: 'In Stock',
    icon: Wifi,
    color: 'from-indigo-500 to-sky-400',
    specs: ['Wi-Fi + BLE', 'USB-C', 'Arduino IDE support'],
  },
  {
    name: 'Soil Moisture Sensor Pack',
    category: 'Sensor Module',
    price: 'Rs. 180',
    mrp: 'Pack of 2',
    badge: 'Best Seller',
    icon: Gauge,
    color: 'from-amber-500 to-emerald-400',
    specs: ['Analog output', 'Corrosion guarded', 'Farm prototypes'],
  },
  {
    name: 'Relay Driver Module 4CH',
    category: 'Controller Module',
    price: 'Rs. 260',
    mrp: 'Incl. GST',
    badge: 'Ready Stock',
    icon: SlidersHorizontal,
    color: 'from-slate-600 to-cyan-500',
    specs: ['5V logic', 'Opto-isolated', 'Automation projects'],
  },
];

const productRows = [
  ['Arduino compatible boards', 'Raspberry Pi accessories', 'Motor drivers', 'LCD and OLED displays'],
  ['Temperature sensors', 'Humidity sensors', 'pH sensors', 'Ultrasonic modules'],
  ['Breadboards', 'Jumpers and connectors', 'Power adapters', 'PCB prototyping boards'],
];

const trustItems = [
  { title: 'Fast Dispatch', text: 'Priority packing for stocked modules and components.', icon: Truck },
  { title: 'Tested Stock', text: 'Modules checked for practical classroom and field use.', icon: ShieldCheck },
  { title: 'Project Support', text: 'Guidance for product selection, kits, and deployment.', icon: PackageCheck },
];

const seoDescription =
  'Shop CloudTronix electronics products, components, modules, sensors, IoT controllers, Plotronix, Krashitronix, Aquatronix, and automation kits.';

export default function Shopping() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo title="Shopping - Electronics Components & IoT Products" description={seoDescription} path="/shopping" />
      <main className="bg-surface text-ink dark:bg-night dark:text-white">
        <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-night">
          <div className="container-page grid gap-8 py-8 lg:grid-cols-[260px_1fr] lg:py-10">
            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <h1 className="font-heading text-xl font-bold">Shopping</h1>
                <ShoppingCart className="h-5 w-5 text-primary dark:text-secondary" />
              </div>
              <div className="mt-5 space-y-2">
                {categories.map(({ title, count, icon: Icon }) => (
                  <a
                    key={title}
                    href={`#${title.toLowerCase().replaceAll(' ', '-')}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-primary dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-secondary"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span className="truncate">{title}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted dark:text-slate-400">{count}</span>
                  </a>
                ))}
              </div>
            </aside>

            <motion.div
              className="min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                <div className="rounded-lg bg-night p-5 text-white shadow-soft sm:p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Electronics Store
                  </div>
                  <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-4xl">
                    Components, modules, sensors, and CloudTronix smart products for real projects.
                  </h2>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <label className="relative min-w-0 flex-1">
                      <span className="sr-only">Search products</span>
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className="focus-ring h-12 w-full rounded-lg border border-white/10 bg-white px-12 text-sm font-semibold text-ink placeholder:text-muted"
                        placeholder="Search sensors, controllers, kits..."
                        type="search"
                      />
                    </label>
                    <Button to="/contact" variant="secondary" icon={ShoppingCart}>Bulk Enquiry</Button>
                  </div>
                </div>
                <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  {trustItems.map(({ title, text, icon: Icon }) => (
                    <div key={title} className="flex gap-3">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="font-heading text-sm font-bold">{title}</p>
                        <p className="text-sm leading-6 text-muted dark:text-slate-300">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-secondary">Featured Products</p>
                <h2 className="mt-2 font-heading text-3xl font-bold">Shop electronics and CloudTronix systems</h2>
              </div>
              <Button to="/contact" variant="secondary">Ask for Quote</Button>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <ProductTile key={product.name} product={product} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-white dark:bg-white/[0.03]">
          <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-secondary">Categories</p>
              <h2 className="mt-2 font-heading text-3xl font-bold">Everything for electronics labs, IoT builds, and automation panels.</h2>
              <p className="mt-4 max-w-xl leading-8 text-muted dark:text-slate-300">
                Browse by category, build a project kit, or send a component list for fast sourcing.
              </p>
            </div>
            <div className="grid gap-4">
              {productRows.map((row) => (
                <div key={row.join('-')} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {row.map((item) => (
                    <a
                      key={item}
                      href="/contact"
                      className="rounded-lg border border-slate-200 bg-surface p-4 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-soft dark:border-white/10 dark:bg-night dark:text-slate-200 dark:hover:text-secondary"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ProductTile({ product, index, reduceMotion }) {
  const Icon = product.icon;

  return (
    <motion.article
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.14) }}
    >
      <div className={`relative grid aspect-[4/3] place-items-center bg-gradient-to-br ${product.color} p-6`}>
        <span className="absolute left-4 top-4 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-sm">{product.badge}</span>
        <div className="grid h-28 w-28 place-items-center rounded-lg border border-white/40 bg-white/20 shadow-lift backdrop-blur">
          <Icon aria-hidden="true" className="h-14 w-14 text-white" />
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary dark:text-secondary">{product.category}</p>
        <h3 className="mt-2 min-h-14 font-heading text-xl font-bold leading-7 text-ink dark:text-white">{product.name}</h3>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted dark:text-slate-300">
          {product.specs.map((spec) => (
            <li key={spec} className="flex gap-2">
              <PackageCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
          <div>
            <p className="font-heading text-lg font-bold text-ink dark:text-white">{product.price}</p>
            <p className="text-xs font-semibold text-muted dark:text-slate-400">{product.mrp}</p>
          </div>
          <Button to="/contact" className="px-4" icon={ShoppingCart}>Enquire</Button>
        </div>
      </div>
    </motion.article>
  );
}
