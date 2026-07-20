import { Award, Briefcase, FlaskConical, GraduationCap } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import Seo from '../../components/Seo';
import { trainingCourses } from '../../data/content';

export default function Training() {
  return (
    <>
      <Seo title="Training" path="/training" />
      <section className="bg-night py-20 text-white">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Technical Training</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Hands-on courses for students, colleges, and professionals who want practical embedded, IoT, cloud, and DevOps skills.</p>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Courses" title="Live labs, projects, certification, and career support" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainingCourses.map((course) => {
              const Icon = course.icon;
              return (
                <InfoCard key={course.title} icon={Icon} title={course.title}>
                  <div className="mt-5 grid gap-2 text-sm text-muted dark:text-slate-300">
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Level:</strong> {course.level}</p>
                    <p><strong>Projects:</strong> {course.projects} hands-on builds</p>
                    <p><strong>Certificate:</strong> Included</p>
                  </div>
                </InfoCard>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white dark:bg-night">
        <div className="container-page grid gap-6 md:grid-cols-4">
          {[
            { title: 'Hands-on Projects', icon: FlaskConical },
            { title: 'Live Labs', icon: GraduationCap },
            { title: 'Internship', icon: Briefcase },
            { title: 'Placement Assistance', icon: Award },
          ].map((item) => <InfoCard key={item.title} {...item} text="Structured learning support with real hardware, cloud platforms, and mentor guidance." />)}
        </div>
      </section>
      <CTA />
    </>
  );
}
