import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import ContactForm from '../../components/ContactForm/ContactForm';
import InfoCard from '../../components/Cards/InfoCard';
import Seo from '../../components/Seo';
import { siteConfig } from '../../constants/site';

export default function Contact() {
  return (
    <>
      <Seo title="Contact" path="/contact" />
      <section className="bg-night py-20 text-white">
        <div className="container-page">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">Contact</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Request a demo, discuss a custom IoT product, or plan a technical training program.</p>
        </div>
      </section>
      <section className="section-pad bg-surface dark:bg-night">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <InfoCard icon={MapPin} title="Address">
              <a className="mt-3 block leading-7 text-slate-300 hover:text-secondary" href={siteConfig.mapUrl} target="_blank" rel="noreferrer" aria-label="Open CloudTronix location in Google Maps">
                {siteConfig.address}
              </a>
            </InfoCard>
            <InfoCard icon={Phone} title="Phone">
              <a className="mt-3 block leading-7 text-slate-300 hover:text-secondary" href={siteConfig.phoneHref} aria-label="Call CloudTronix">
                {siteConfig.phone}
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a className="mt-3 block leading-7 text-slate-300 hover:text-secondary" href={`mailto:${siteConfig.email}`} aria-label="Email CloudTronix">
                {siteConfig.email}
              </a>
            </InfoCard>
            <InfoCard icon={MessageCircle} title="Business Hours" text={siteConfig.hours} />
            <InfoCard icon={MessageCircle} title="WhatsApp">
              <a className="mt-3 block leading-7 text-slate-300 hover:text-secondary" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact CloudTronix on WhatsApp">
                Chat with CloudTronix
              </a>
            </InfoCard>
          </div>
          <ContactForm />
        </div>
      </section>
      <a
        href={siteConfig.whatsappUrl}
        className="focus-ring fixed bottom-20 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white shadow-lift"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact CloudTronix on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={siteConfig.phoneHref}
        className="focus-ring fixed bottom-36 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shadow-lift"
        aria-label="Call CloudTronix"
      >
        <Phone className="h-5 w-5" />
      </a>
    </>
  );
}
