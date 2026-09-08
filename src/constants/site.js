export const siteConfig = {
  name: 'CloudTronix',
  shortName: 'CloudTronix',
  motto: 'Innovating Tomorrow Through Smart Technology',
  description:
    'CloudTronix designs IoT products, embedded electronics, cloud-connected automation, and professional technical training programs.',
  url: 'https://cloudtronix.in',
  email: 'info@cloudtronix.in',
  phone: '+91 8329351507',
  phoneHref: 'tel:+918329351507',
  whatsappUrl: 'https://wa.me/918329351507',
  address: 'Mumbai, Maharashtra, India',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=CloudTronix%20Mumbai%20Maharashtra%20India',
  hours: 'Mon - Sat, 9:30 AM - 6:30 PM',
  emailJs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    customerServiceId: import.meta.env.VITE_EMAILJS_CUSTOMER_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    customerTemplateId: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || '',
    internalServiceId: import.meta.env.VITE_EMAILJS_INTERNAL_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    internalTemplateId: import.meta.env.VITE_EMAILJS_INTERNAL_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    internalRecipient: import.meta.env.VITE_INTERNAL_NOTIFICATION_EMAIL || 'info@cloudtronix.in',
  },
  recaptcha: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '',
    enabled: import.meta.env.VITE_RECAPTCHA_ENABLED !== 'false',
  },
};

export const legacyEmailJsConfig = {
  emailJs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'IoT Projects', path: '/iot-projects' },
  { label: 'Services', path: '/services' },
  { label: 'Training', path: '/training' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Careers', path: '/careers' },
  { label: 'Shopping', path: '/shopping' },
  { label: 'Contact', path: '/contact' },
];
