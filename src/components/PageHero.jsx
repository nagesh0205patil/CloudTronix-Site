import { motion, useReducedMotion } from 'framer-motion';

export default function PageHero({ eyebrow, title, text, actions, meta }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-night py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
      <motion.div
        className="container-page relative"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          ) : null}
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {text ? <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{text}</p> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {meta ? <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">{meta}</div> : null}
      </motion.div>
    </section>
  );
}
