import ContactForm from '../../components/ContactForm/ContactForm';
import InfoCard from '../../components/Cards/InfoCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Seo from '../../components/Seo';
import { jobs } from '../../data/content';

export default function Careers() {
  return (
    <>
      <Seo title="Careers" path="/careers" />
      <section className="bg-night py-20 text-white">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Careers</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Work on practical IoT, electronics, automation, cloud dashboards, and technical education.</p>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Openings" title="Join a team that builds and teaches" />
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
