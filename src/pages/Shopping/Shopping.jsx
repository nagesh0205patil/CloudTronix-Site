import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Cpu,
  ListChecks,
  PackageCheck,
  RadioTower,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Button from '../../components/Buttons/Button';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { PROJECTS_PER_PAGE, iotProjects } from '../../data/iotProjectsData';

const allFilters = ['All', 'Monitor', 'Control', 'Monitor + Control'];

const seoDescription =
  'Browse CloudTronix final year IoT project listings with modules, monitoring scope, control options, use cases, and estimated complete project pricing.';

export default function Shopping() {
  const reduceMotion = useReducedMotion();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return iotProjects.filter((project) => {
      const searchableText = [
        project.title,
        project.module,
        project.function,
        project.mainMonitoring,
        project.remoteControl,
        project.sourceSheet,
        ...project.useCases,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesFilter = activeFilter === 'All' || project.function === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageProjects = useMemo(() => {
    const start = (safePage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, safePage]);

  const updateSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const updateFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    document.getElementById('project-listings')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Seo title="Shopping - Final Year IoT Project Listings" description={seoDescription} path="/shopping" />
      <main className="bg-surface text-ink dark:bg-night dark:text-white">
        <PageHero
          eyebrow="IoT Project Shopping"
          title="Final year IoT projects ready for real implementation."
          text="Browse project-ready ESP32 and industrial IoT builds with module details, monitoring scope, control options, use cases, and estimated complete project cost."
          meta={
            <>
              <Stat icon={PackageCheck} label="Total Listings" value={iotProjects.length} />
              <Stat icon={Cpu} label="Primary Modules" value={countUnique(iotProjects, 'module')} />
              <Stat icon={RadioTower} label="Project Types" value={countUnique(iotProjects, 'function')} />
            </>
          }
        />

        <section id="project-listings" className="section-pad scroll-mt-24">
          <div className="container-page">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <label className="relative min-w-0">
                  <span className="sr-only">Search IoT projects</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    className="focus-ring h-12 w-full rounded-lg border border-slate-200 bg-surface px-12 text-sm font-semibold text-ink placeholder:text-muted dark:border-white/10 dark:bg-night dark:text-white"
                    placeholder="Search project title, module, monitoring, control..."
                    type="search"
                    value={searchTerm}
                    onChange={updateSearch}
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      className="focus-ring absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-slate-200 dark:hover:bg-white/10"
                      aria-label="Clear search"
                      onClick={() => {
                        setSearchTerm('');
                        setCurrentPage(1);
                      }}
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  ) : null}
                </label>

                <div className="flex flex-wrap gap-2" aria-label="Project type filters">
                  {allFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      className={`focus-ring inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                        activeFilter === filter
                          ? 'bg-primary text-white shadow-lift'
                          : 'border border-slate-200 bg-surface text-muted hover:border-primary hover:text-primary dark:border-white/10 dark:bg-night dark:text-slate-300 dark:hover:border-secondary dark:hover:text-secondary'
                      }`}
                      onClick={() => updateFilter(filter)}
                    >
                      <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm font-semibold text-muted dark:border-white/10 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
                <p>Showing {pageProjects.length} of {filteredProjects.length} projects</p>
                <Button to="/contact" icon={BadgeIndianRupee}>Request Project Quote</Button>
              </div>
            </div>

            {pageProjects.length ? (
              <motion.div
                key={`${safePage}-${activeFilter}-${searchTerm}`}
                className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {pageProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    serial={(safePage - 1) * PROJECTS_PER_PAGE + index + 1}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-heading text-xl font-bold">No matching projects found</p>
                <p className="mt-2 text-muted dark:text-slate-300">Try a different keyword or select the All filter.</p>
              </div>
            )}

            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </section>
      </main>
    </>
  );
}

function ProjectCard({ project, serial }) {
  const meta = [
    project.module ? { icon: Cpu, label: 'Module', value: project.module } : null,
    project.function ? { icon: RadioTower, label: 'Type', value: project.function } : null,
    project.mainMonitoring ? { icon: RadioTower, label: 'Monitoring', value: project.mainMonitoring } : null,
    project.remoteControl ? { icon: ListChecks, label: 'Control', value: project.remoteControl } : null,
  ].filter(Boolean);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary dark:bg-secondary/15 dark:text-secondary">
          {serial.toString().padStart(2, '0')}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-surface px-2.5 py-1 text-xs font-bold text-muted dark:border-white/10 dark:bg-night dark:text-slate-300">
          <BadgeIndianRupee aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
          {formatPrice(project.price)}
        </span>
      </div>

      <h2 className="mt-5 font-heading text-lg font-bold leading-7 text-ink dark:text-white">{project.title}</h2>

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

      <div className="mt-5 flex-1 border-t border-slate-200 pt-5 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary dark:text-secondary">Use Cases</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted dark:text-slate-300">
          {project.useCases.slice(0, 3).map((useCase) => (
            <li key={useCase} className="flex gap-2.5">
              <ListChecks aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button to="/contact" variant="secondary" className="mt-5" icon={PackageCheck}>Enquire Now</Button>
    </article>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-white backdrop-blur-sm">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <div>
        <p className="font-heading text-2xl font-bold text-white">{value}</p>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-white/10 sm:flex-row" aria-label="IoT projects pagination">
      <button
        type="button"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
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
                : 'border border-slate-200 bg-white text-muted hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-secondary dark:hover:text-secondary'
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
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-secondary dark:hover:text-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </nav>
  );
}

function getVisiblePages(currentPage, totalPages) {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function countUnique(items, key) {
  return new Set(items.map((item) => item[key]).filter(Boolean)).size;
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
