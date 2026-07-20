import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import Seo from '../../components/Seo';
import { timeline, values } from '../../data/content';

export default function About() {
  return (
    <>
      <Seo title="About Us" path="/about" />
      <PageHero title="About CloudTronix" text="A technology company focused on practical IoT solutions, embedded systems, industrial automation, and technical training." />
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <InfoCard title="Vision" text="To make smart technology accessible, reliable, and valuable for industries, agriculture, education, and everyday infrastructure." />
          <InfoCard title="Mission" text="To design connected products, deliver automation systems, and train engineers with hands-on technology that improves outcomes." />
          <InfoCard title="Why CloudTronix" text="We combine field context, electronics expertise, cloud architecture, and teaching clarity in every engagement." />
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
          <SectionTitle eyebrow="Journey" title="A steady path from labs to smart platforms" />
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
          {['Management Team', 'Infrastructure', 'Research Mindset'].map((title) => (
            <InfoCard key={title} title={title} text="Focused leadership, practical labs, product prototyping, testing workflows, and structured delivery practices." />
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

function PageHero({ title, text }) {
  return (
    <section className="bg-night py-20 text-white">
      <div className="container-page">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">CloudTronix</p>
        <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{text}</p>
      </div>
    </section>
  );
}
