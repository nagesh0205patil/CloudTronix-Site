import Seo from '../../components/Seo';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { galleryItems } from '../../data/content';

export default function Gallery() {
  return (
    <>
      <Seo title="Gallery" path="/gallery" />
      <section className="bg-night py-20 text-white">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Gallery</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Labs, workshops, products, training programs, events, and field demos.</p>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page">
          <SectionTitle eyebrow="Photos" title="Project and training moments" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <figure key={item} className="group overflow-hidden rounded-lg bg-white shadow-sm dark:bg-white/5">
                <div className={`aspect-[4/3] bg-gradient-to-br ${index % 2 ? 'from-primary/20 to-accent/20' : 'from-secondary/20 to-primary/20'}`} />
                <figcaption className="p-4 font-semibold text-ink dark:text-white">{item}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
