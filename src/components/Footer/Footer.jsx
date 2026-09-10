import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { navLinks, siteConfig } from '../../constants/site';
import { products, services, trainingCourses } from '../../data/content';

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-heading text-lg font-bold">CT</span>
            <span className="font-heading text-xl font-bold">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-md leading-7 text-slate-300">
            Engineering connected products, automation systems, cloud dashboards, and hands-on technical programs for practical deployment.
          </p>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <a className="flex gap-2 hover:text-secondary" href={siteConfig.mapUrl} target="_blank" rel="noreferrer" aria-label="Open CloudTronix location in Google Maps">
              <MapPin className="h-5 w-5 text-secondary" /> {siteConfig.address}
            </a>
            <a className="flex gap-2 hover:text-secondary" href={siteConfig.phoneHref} aria-label="Call CloudTronix">
              <Phone className="h-5 w-5 text-secondary" /> {siteConfig.phone}
            </a>
            <a className="flex gap-2 hover:text-secondary" href={`mailto:${siteConfig.email}`} aria-label="Email CloudTronix">
              <Mail className="h-5 w-5 text-secondary" /> {siteConfig.email}
            </a>
            <a className="flex gap-2 hover:text-secondary" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact CloudTronix on WhatsApp">
              <MessageCircle className="h-5 w-5 text-secondary" /> WhatsApp
            </a>
          </div>
        </div>
        <FooterList title="Quick Links" items={navLinks.map((item) => ({ label: item.label, to: item.path }))} />
        <FooterList title="Products" items={products.map((item) => ({ label: item.name, to: `/products#${item.slug}` }))} />
        <FooterList
          title="Explore"
          items={[
            ...services.slice(0, 3).map((item) => ({ label: item.title, to: '/services' })),
            ...trainingCourses.slice(0, 3).map((item) => ({ label: item.title, to: '/training' })),
          ]}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-5 text-sm text-slate-400 md:flex-row">
          <p>Copyright {new Date().getFullYear()} CloudTronix Solutions Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-3">
            {[Linkedin, Facebook, Instagram].map((Icon, index) => (
              <a key={index} href="#" className="focus-ring rounded-lg p-2 hover:bg-white/10" aria-label="Social profile">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }) {
  return (
    <div>
      <h3 className="font-heading text-base font-bold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-300">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link className="hover:text-secondary" to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
