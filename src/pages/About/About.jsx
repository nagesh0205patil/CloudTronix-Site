import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { timeline, values } from '../../data/content';

export default function About() {
  return (
    <>
      <Seo title="About Us" path="/about" />
      <PageHero
        eyebrow="About CloudTronix"
        title="Engineering practical connected systems for real operating environments."
        text="We combine embedded electronics, firmware, cloud platforms, automation workflows, and training programs to help teams build technology that can be tested, deployed, and supported."
      />
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <InfoCard title="Vision" text="Make connected technology reliable, accessible, and valuable for education, agriculture, industry, and everyday infrastructure." />
          <InfoCard title="Mission" text="Design deployable products, deliver automation systems, and train engineers with practical, hardware-led learning." />
          <InfoCard title="Operating Style" text="Clear discovery, disciplined prototyping, transparent documentation, and support-minded engineering from the first conversation." />
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Core Values" title="The principles behind our work" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => <InfoCard key={value.title} {...value} />)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Journey" title="A steady path from electronics labs to connected platforms" />
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="font-heading text-3xl font-bold text-primary dark:text-secondary">{item.year}</p>
                <h3 className="mt-4 font-heading text-xl font-bold text-ink dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <InfoCard title="Leadership" text="A focused team for planning, execution, partner coordination, and technical decision-making." />
          <InfoCard title="Infrastructure" text="Practical lab capacity for electronics prototyping, board testing, firmware validation, and project demos." />
          <InfoCard title="Research Mindset" text="Continuous exploration of sensors, cloud platforms, automation patterns, and learning outcomes." />
        </div>
      </section>
      <CTA />
    </>
  );
}
