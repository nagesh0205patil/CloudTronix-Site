import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Leaf,
  Lightbulb,
  Network,
  RadioTower,
  ShieldCheck,
  Smartphone,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

export { products } from './productsData';

export const stats = [
  { value: 100, suffix: '+', label: 'Delivered Projects' },
  { value: 500, suffix: '+', label: 'Engineers Trained' },
  { value: 50, suffix: '+', label: 'Institution & Industry Clients' },
  { value: 10, suffix: '+', label: 'Connected Product Lines' },
];

export const services = [
  { title: 'IoT Product Engineering', icon: Network, text: 'Connected device strategy, electronics, firmware, enclosure-ready prototypes, pilots, and production handover.' },
  { title: 'Embedded System Design', icon: Cpu, text: 'Sensor interfaces, communication stacks, microcontroller architecture, power design, and edge logic.' },
  { title: 'PCB Design & Bring-Up', icon: Zap, text: 'Schematics, board layout, BOM planning, prototype assembly support, testing, and revision closure.' },
  { title: 'Firmware Development', icon: Wrench, text: 'Maintainable embedded firmware with device states, diagnostics, OTA-ready patterns, and field reliability.' },
  { title: 'Cloud Dashboards', icon: RadioTower, text: 'Telemetry pipelines, dashboards, alerts, reports, APIs, and remote monitoring workflows.' },
  { title: 'AWS IoT & Azure IoT', icon: Building2, text: 'Secure cloud architecture for device identity, data ingestion, storage, visualization, and automation.' },
  { title: 'Industrial Automation', icon: Factory, text: 'Control panels, monitoring systems, relay logic, instrumentation, and operator-friendly interfaces.' },
  { title: 'Consulting & AMC', icon: ShieldCheck, text: 'Architecture reviews, prototype rescue, deployment planning, maintenance, and long-term technical support.' },
];

export const trainingCourses = [
  'IoT using ESP32',
  'Arduino Programming',
  'Embedded C',
  'STM32',
  'PCB Design',
  'Raspberry Pi',
  'Cloud Computing',
  'AWS',
  'Microsoft Azure',
  'Docker',
  'Kubernetes',
  'Linux',
  'DevOps',
  'Python',
  'Industrial IoT',
  'NodeMCU',
  'MQTT',
  'LoRaWAN',
  'ThingsBoard',
].map((title, index) => ({
  title,
  duration: index % 3 === 0 ? '6 weeks' : index % 3 === 1 ? '4 weeks' : '8 weeks',
  level: index % 2 === 0 ? 'Beginner to Advanced' : 'Intermediate',
  projects: index % 3 === 0 ? 5 : 3,
  certificate: true,
  icon: [BookOpen, Cpu, GraduationCap][index % 3],
}));

export const industries = [
  { title: 'Agriculture', icon: Leaf },
  { title: 'Education', icon: GraduationCap },
  { title: 'Healthcare', icon: HeartPulse },
  { title: 'Hospitality', icon: Hotel },
  { title: 'Industrial Automation', icon: Factory },
  { title: 'Manufacturing', icon: Building2 },
  { title: 'Residential', icon: Home },
  { title: 'Government', icon: Landmark },
];

export const testimonials = [

  {
    name: 'Apeksha Patil',
    role: 'Engineering Head',
    quote: 'CloudTronix brought structure, engineering depth, and reliable execution to a complex connected-device requirement.',
  },
  {
    name: 'Shubham Patil',
    role: 'T&P Head',
    quote: 'Their training programs gave students practical exposure to hardware, cloud workflows, and project delivery discipline.',
  },
  {
    name: 'Tanvi Varankar',
    role: 'Operation Head',
    quote: 'The team understood our operational needs quickly and delivered a dependable automation workflow.',
  },
  {
    name: 'Chaitanya Ojha',
    role: 'Marketing Head',
    quote: 'They translated a technical vision into a clear, credible product experience for customers and stakeholders.',
  },
  {
    name: 'Rehan Kapadia',
    role: 'Design Head',
    quote: 'Their clean, innovative designs perfectly balanced usability, branding, and modern aesthetics.',
  },
  {
    name: 'Dilip Doliya',
    role: 'Account Head',
    quote: 'Clear milestones, transparent communication, and dependable execution made planning straightforward.',
  },
  {
    name: 'Mit Damani',
    role: 'Development Head',
    quote: 'Their development approach produced maintainable software that our team could understand and extend.',
  },
];

export const faqs = [
  { q: 'Can CloudTronix build a custom IoT product from idea to pilot?', a: 'Yes. We support requirement discovery, electronics design, firmware, cloud dashboards, prototype testing, and pilot deployment.' },
  { q: 'Do you work with colleges for final year projects and training?', a: 'Yes. Programs can be aligned with academic calendars, lab capacity, student outcomes, and project demonstration requirements.' },
  { q: 'Can your systems include dashboards, alerts, and remote control?', a: 'Yes. We integrate telemetry dashboards, configurable alerts, reports, APIs, and secure remote operation where required.' },
  { q: 'Do you provide support after deployment?', a: 'Yes. Consulting, maintenance, upgrades, and annual support plans are available for eligible products and deployments.' },
];

export const timeline = [
  { year: '2019', title: 'Foundation', text: 'Started with embedded systems and academic electronics projects.' },
  { year: '2021', title: 'IoT Expansion', text: 'Launched connected automation solutions for agriculture and industry.' },
  { year: '2023', title: 'Training Labs', text: 'Expanded hands-on technical training for colleges and professionals.' },
  { year: '2026', title: 'Smart Platforms', text: 'Building scalable cloud-connected products for practical Indian use cases.' },
];

export const galleryItems = [
  'Electronics Lab',
  'IoT Workshop',
  'Product Prototype',
  'Training Session',
  'Automation Panel',
  'Smart Agriculture Demo',
  'Cloud Dashboard',
  'Student Project Expo',
];

export const jobs = [
  { title: 'Embedded Firmware Intern', type: 'Internship', location: 'Pune / Hybrid', icon: Cpu },
  { title: 'IoT Application Developer', type: 'Full-time', location: 'Pune', icon: Smartphone },
  { title: 'Technical Trainer', type: 'Part-time', location: 'On-site', icon: Users },
  { title: 'Business Development Executive', type: 'Full-time', location: 'Pune', icon: BriefcaseBusiness },
];

export const values = [
  { title: 'Practical Innovation', icon: Lightbulb, text: 'Solutions are shaped around field conditions, user workflows, and measurable operating value.' },
  { title: 'Reliable Engineering', icon: ShieldCheck, text: 'Design decisions prioritize durability, maintainability, safety, and supportability from day one.' },
  { title: 'Hands-on Enablement', icon: Award, text: 'Training and handover use real hardware, live labs, documentation, and deployment context.' },
];
