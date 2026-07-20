import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownToLine, Clock3, ExternalLink, PackageOpen } from 'lucide-react';
import { RESOURCE_STATUS } from '../../data/productsData';

const isValidResourceUrl = (url) =>
  typeof url === 'string' && (/^https:\/\//i.test(url) || (url.startsWith('/') && !url.startsWith('//')));

const ProductResources = memo(function ProductResources({ productName, intro, resources = [] }) {
  const reduceMotion = useReducedMotion();
  const visibleResources = useMemo(
    () => resources.filter((resource) => (
      resource.status === RESOURCE_STATUS.comingSoon
      || (resource.status === RESOURCE_STATUS.available && isValidResourceUrl(resource.url))
    )),
    [resources],
  );
  const headingId = `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-resources`;

  return (
    <section className="border-t border-slate-200/80 bg-slate-950 px-5 py-7 sm:px-8 sm:py-8 lg:px-10" aria-labelledby={headingId}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary ring-1 ring-secondary/25">
              <PackageOpen aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Downloads &amp; documentation</p>
              <h3 id={headingId} className="mt-0.5 font-heading text-2xl font-bold text-white">Product Resources</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            {intro || `Applications, documentation, and downloads for ${productName}.`}
          </p>
        </div>
        <p className="shrink-0 text-xs font-medium text-slate-400">Only published resources are shown</p>
      </div>

      {visibleResources.length ? (
        <ul className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={`${productName} resources`}>
          {visibleResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} reduceMotion={reduceMotion} productName={productName} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-6 text-sm leading-6 text-slate-300">
          Resources for {productName} are being prepared. Downloads will appear here when they are published.
        </p>
      )}
    </section>
  );
});

function ResourceCard({ resource, index, reduceMotion, productName }) {
  const Icon = resource.icon || ArrowDownToLine;
  const isComingSoon = resource.status === RESOURCE_STATUS.comingSoon;
  const isExternal = Boolean(resource.external);
  const ActionIcon = isExternal ? ExternalLink : ArrowDownToLine;
  const metadata = [resource.platform, resource.fileType, resource.version, resource.fileSize].filter(Boolean);

  return (
    <motion.li
      className="min-w-0"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.32, delay: reduceMotion ? 0 : index * 0.05 }}
    >
      <article className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:border-secondary/30 hover:bg-white/[0.075]">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-secondary/15 text-secondary ring-1 ring-white/10">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          {isComingSoon ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300 ring-1 ring-inset ring-amber-300/20">
              <Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> Coming Soon
            </span>
          ) : null}
        </div>
        <h4 className="mt-5 font-heading text-lg font-bold leading-6 text-white">{resource.title}</h4>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{resource.description}</p>
        {metadata.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Resource details">
            {metadata.map((item) => (
              <li key={item} className="rounded-md bg-white/[0.07] px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10">{item}</li>
            ))}
          </ul>
        ) : null}
        {isComingSoon ? (
          <p className="mt-5 border-t border-white/10 pt-4 text-sm font-semibold text-amber-300" aria-label={`${resource.title} for ${productName} is coming soon`}>
            Planned release
          </p>
        ) : (
          <a
            href={resource.url}
            download={isExternal ? undefined : true}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={`${resource.actionLabel} for ${productName}`}
            className="focus-ring group mt-5 inline-flex min-h-11 items-center justify-between gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            <span>{resource.actionLabel}</span>
            <ActionIcon aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </article>
    </motion.li>
  );
}

export default ProductResources;
