import { Award, Briefcase, FlaskConical, GraduationCap } from 'lucide-react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import InfoCard from '../../components/Cards/InfoCard';
import CTA from '../../components/CTA/CTA';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { trainingCourses } from '../../data/content';

export default function Training() {
  return (
    <>
      <Seo title="Technical Training" path="/training" />
      <PageHero
        eyebrow="Technical Training"
        title="Hands-on programs for embedded, IoT, cloud, and DevOps careers."
        text="Structured courses for students, colleges, and professionals who need practical skills, live lab exposure, project confidence, and deployment context."
      />
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Courses" title="Practical curriculum with hardware, cloud, and mentor guidance" />
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
          ].map((item) => <InfoCard key={item.title} {...item} text="Outcome-focused support with real hardware, cloud workflows, documentation, and guided practice." />)}
        </div>
      </section>
      <CTA />
    </>
  );
}
