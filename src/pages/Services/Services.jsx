import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { services } from '../../data/content';

export default function Services() {
  return (
    <>
      <Seo title="Engineering Services" path="/services" />
      <PageHero
        eyebrow="Engineering Services"
        title="From embedded prototypes to cloud-connected automation systems."
        text="CloudTronix supports product teams, institutions, and operators with electronics design, firmware, IoT dashboards, automation controls, and ongoing technical support."
      />
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Capabilities" title="A complete delivery stack for connected systems" />
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
              <p className="mt-3 leading-7 text-muted dark:text-slate-300">Defined scope, measurable milestones, technical documentation, testing records, and practical handover support.</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
