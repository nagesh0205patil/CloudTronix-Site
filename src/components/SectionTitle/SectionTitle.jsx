import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  const centered = align === 'center';

  return (
    <motion.div
      className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary dark:text-secondary">{eyebrow}</p> : null}
      <h2 className="font-heading text-3xl font-bold leading-tight text-ink dark:text-white sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-muted dark:text-slate-300">{text}</p> : null}
    </motion.div>
  );
}
