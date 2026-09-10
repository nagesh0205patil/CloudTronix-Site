import ContactForm from '../../components/ContactForm/ContactForm';
import InfoCard from '../../components/Cards/InfoCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { jobs } from '../../data/content';

export default function Careers() {
  return (
    <>
      <Seo title="Careers" path="/careers" />
      <PageHero
        eyebrow="Careers"
        title="Build practical technology with a team that values learning and ownership."
        text="Work across IoT, electronics, automation, cloud dashboards, technical education, and customer-facing engineering projects."
      />
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Openings" title="Roles for builders, trainers, and problem-solvers" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => <InfoCard key={job.title} icon={job.icon} title={job.title} text={`${job.type} - ${job.location}`} />)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionTitle align="left" eyebrow="Apply" title="Tell us how you want to contribute" text="Share your profile, area of interest, and relevant experience. Internships and project roles are welcome." />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
