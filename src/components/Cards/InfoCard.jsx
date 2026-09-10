import { motion } from 'framer-motion';

export default function InfoCard({ icon: Icon, title, text, children, className = '' }) {
  return (
    <motion.article
      className={`group rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
    >
      {Icon ? (
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </div>
      ) : null}
      <h3 className="font-heading text-xl font-bold text-ink dark:text-white">{title}</h3>
      {text ? <p className="mt-3 leading-7 text-muted dark:text-slate-300">{text}</p> : null}
      {children}
    </motion.article>
  );
}
