import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import Seo from '../../components/Seo';
import { services } from '../../data/content';

export default function Services() {
  return (
    <>
      <Seo title="Services" path="/services" />
      <section className="bg-night py-20 text-white">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Services</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Embedded, cloud, automation, and consulting services for teams building practical connected systems.</p>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Capabilities" title="From board-level electronics to cloud dashboards" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => <InfoCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {['Discovery & Architecture', 'Prototype & Pilot', 'Deployment & Support'].map((step, index) => (
            <div key={step} className="rounded-lg border border-slate-200 p-6 dark:border-white/10">
              <p className="font-heading text-5xl font-bold text-primary/20">0{index + 1}</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink dark:text-white">{step}</h2>
              <p className="mt-3 leading-7 text-muted dark:text-slate-300">Clear milestones, technical documentation, testing, and practical handover support.</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
