import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BadgeIndianRupee, Cpu, GraduationCap, ListChecks, RadioTower } from 'lucide-react';
import CTA from '../../components/CTA/CTA';
import Seo from '../../components/Seo';
import { PROJECTS_PER_PAGE, iotProjects } from '../../data/iotProjectsData';

const seoDescription =
  'Explore final year engineering IoT project ideas with practical use cases, modules, monitoring scope, controls, and estimated complete project pricing.';

export default function IoTProjects() {
  const reduceMotion = useReducedMotion();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(iotProjects.length / PROJECTS_PER_PAGE);
  const pageProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return iotProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <Seo title="Final Year IoT Projects" description={seoDescription} path="/iot-projects" />
      <header className="relative overflow-hidden bg-night py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,87,217,0.20),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(0,200,150,0.18),transparent_30%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]" />
        <motion.div
          className="container-page relative"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur">
            <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" /> Engineering Final Year Projects
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Industrial IoT project catalog for final year engineering students.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Browse practical ESP32 and IoT project ideas with clear use cases, monitoring scope, control options, and estimated complete project cost.
          </p>
          <div className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-3 lg:max-w-3xl">
            <Stat label="Projects" value={iotProjects.length} />
            <Stat label="Per Page" value={PROJECTS_PER_PAGE} />
            <Stat label="Audience" value="Final Year" />
          </div>
        </motion.div>
      </header>

      <main className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-secondary">Project List</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink dark:text-white">Select a project with real implementation value</h2>
            </div>
            <p className="text-sm font-semibold text-muted dark:text-slate-300">
              Showing {pageProjects.length} of {iotProjects.length} projects, page {currentPage} of {totalPages}
            </p>
          </div>

          <motion.div
            key={currentPage}
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {pageProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} serial={(currentPage - 1) * PROJECTS_PER_PAGE + index + 1} />
            ))}
          </motion.div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            visiblePages={getVisiblePages(currentPage, totalPages)}
            onPageChange={goToPage}
          />
        </div>
      </main>
      <CTA />
    </>
  );
}

function ProjectCard({ project, serial }) {
  const meta = [
    project.module ? { icon: Cpu, label: 'Module', value: project.module } : null,
    project.function ? { icon: RadioTower, label: 'Function', value: project.function } : null,
    project.mainMonitoring ? { icon: RadioTower, label: 'Monitoring', value: project.mainMonitoring } : null,
    project.remoteControl ? { icon: ListChecks, label: 'Control', value: project.remoteControl } : null,
    project.price ? { icon: BadgeIndianRupee, label: 'Est. Price', value: formatPrice(project.price) } : null,
  ].filter(Boolean);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary dark:bg-secondary/15 dark:text-secondary">
          {serial.toString().padStart(2, '0')}
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted dark:border-white/10 dark:text-slate-300">
          {project.sourceSheet}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-xl font-bold leading-7 text-ink dark:text-white">{project.title}</h3>

      <div className="mt-5 grid gap-3">
        {meta.slice(0, 3).map((item) => {
          const Icon = item.icon;
          return (
            <div key={`${project.id}-${item.label}`} className="flex gap-3 text-sm">
              <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="min-w-0 text-muted dark:text-slate-300">
                <span className="font-semibold text-ink dark:text-white">{item.label}:</span> {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex-1 border-t border-slate-200 pt-5 dark:border-white/10">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary dark:text-secondary">Use Cases</p>
        <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted dark:text-slate-300">
          {project.useCases.map((useCase) => (
            <li key={useCase} className="flex gap-2.5">
              <ListChecks aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Pagination({ currentPage, totalPages, visiblePages, onPageChange }) {
  return (
    <nav className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-white/10 sm:flex-row" aria-label="IoT projects pagination">
      <button
        type="button"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Previous
      </button>

      <div className="flex flex-wrap justify-center gap-2">
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={`focus-ring h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${
              page === currentPage
                ? 'bg-primary text-white shadow-lift'
                : 'border border-slate-200 text-muted hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-300 dark:hover:border-secondary dark:hover:text-secondary'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </nav>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
    </div>
  );
}

function getVisiblePages(currentPage, totalPages) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function formatPrice(price) {
  const value = Number(price);
  if (!Number.isFinite(value)) {
    return price;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}
