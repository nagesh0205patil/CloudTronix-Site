import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductCard from '../../components/Cards/ProductCard';
import InfoCard from '../../components/Cards/InfoCard';
import Stats from '../../components/Stats';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTA from '../../components/CTA/CTA';
import FAQ from '../../components/FAQ';
import Seo from '../../components/Seo';
import Button from '../../components/Buttons/Button';
import { industries, services, trainingCourses, values } from '../../data/content';
import { products } from '../../data/productsData';

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionTitle
            align="left"
            eyebrow="Company Platform"
            title="Hardware engineering, cloud intelligence, and technical enablement in one delivery team."
            text="CloudTronix helps organizations move from idea to working system with embedded electronics, IoT connectivity, dashboards, automation logic, and hands-on training."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {values.map((item) => <InfoCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>
      <Stats />
      <SectionBlock eyebrow="Why CloudTronix" title="Built for practical deployment, not just demonstrations." text="Every engagement is shaped around reliability, maintainability, field usability, and clear knowledge transfer.">
        <div className="grid gap-5 md:grid-cols-3">
          {['Field-ready architecture', 'Academic and industrial expertise', 'Dashboards, alerts, and remote control'].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <CheckCircle2 className="h-7 w-7 text-accent" />
              <h3 className="mt-4 font-heading text-xl font-bold text-ink dark:text-white">{item}</h3>
            </div>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock eyebrow="Products" title="Connected products for labs, farms, and facilities">
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </SectionBlock>
      <SectionBlock eyebrow="Services" title="Engineering services from prototype to deployment">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service) => <InfoCard key={service.title} {...service} />)}
        </div>
      </SectionBlock>
      <SectionBlock eyebrow="Training" title="Live technical training for job-ready engineering skills">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainingCourses.slice(0, 8).map((course) => <TrainingMini key={course.title} course={course} />)}
        </div>
        <div className="mt-8 text-center">
          <Button to="/training" icon={ArrowRight}>View Courses</Button>
        </div>
      </SectionBlock>
      <SectionBlock eyebrow="Industries" title="Use cases across education, operations, and infrastructure">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map(({ title, icon: Icon }) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 text-center dark:border-white/10 dark:bg-white/5">
              <Icon className="mx-auto h-7 w-7 text-primary dark:text-secondary" />
              <p className="mt-3 font-semibold text-ink dark:text-white">{title}</p>
            </div>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock eyebrow="Testimonials" title="Trusted by teams that need dependable execution">
        <Testimonials />
      </SectionBlock>
      <SectionBlock eyebrow="FAQ" title="Common questions">
        <FAQ />
      </SectionBlock>
      <CTA />
    </>
  );
}

function SectionBlock({ eyebrow, title, text, children }) {
  return (
    <section className="section-pad bg-white odd:bg-surface dark:bg-night">
      <div className="container-page">
        <SectionTitle eyebrow={eyebrow} title={title} text={text} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function TrainingMini({ course }) {
  const Icon = course.icon;
  return (
    <InfoCard icon={Icon} title={course.title} text={`${course.duration} - ${course.level}`}>
      <p className="mt-4 text-sm font-semibold text-accent">{course.projects} hands-on projects + certificate</p>
    </InfoCard>
  );
}
