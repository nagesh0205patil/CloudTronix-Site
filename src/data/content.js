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
  { value: 100, suffix: '+', label: 'Projects' },
  { value: 500, suffix: '+', label: 'Students Trained' },
  { value: 50, suffix: '+', label: 'Clients' },
  { value: 10, suffix: '+', label: 'Products' },
];

export const services = [
  { title: 'IoT Product Development', icon: Network, text: 'End-to-end connected device design from concept to production-ready MVP.' },
  { title: 'Embedded System Design', icon: Cpu, text: 'Microcontroller, sensor, communication, and edge firmware architecture.' },
  { title: 'PCB Design', icon: Zap, text: 'Schematic design, PCB layout, prototyping, and board bring-up support.' },
  { title: 'Firmware Development', icon: Wrench, text: 'Reliable embedded firmware for production and lab-grade electronics.' },
  { title: 'Cloud Integration', icon: RadioTower, text: 'Device telemetry, dashboards, alerts, APIs, and remote monitoring.' },
  { title: 'AWS IoT & Azure IoT', icon: Building2, text: 'Cloud-native architecture for secure industrial and agricultural IoT.' },
  { title: 'Industrial Automation', icon: Factory, text: 'Automation panels, controls, monitoring, and custom electronics interfaces.' },
  { title: 'Consulting & AMC', icon: ShieldCheck, text: 'Technical consulting, custom electronics, prototypes, and maintenance.' },
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
    quote: 'Their engineering expertise delivered scalable, reliable, and production-ready technology solutions.',
  },
  {
    name: 'Shubham Patil',
    role: 'T&P Head',
    quote: 'Their industry-focused training prepared students with practical, job-ready technical skills.',
  },
  {
    name: 'Tanvi Warankar',
    role: 'Operation Head',
    quote: 'CloudTronix streamlined operations with efficient workflows and dependable technical support.',
  },
  {
    name: 'Chaitanya Oja',
    role: 'Marketing Head',
    quote: 'CloudTronix transformed our vision into a compelling and impactful technology brand presence..',
  },
  {
    name: 'Rehan Kapadia',
    role: 'Design Head',
    quote: 'Their clean, innovative designs perfectly balanced usability, branding, and modern aesthetics.',
  },
  {
    name: 'Dilip Dolia',
    role: 'Account Head',
    quote: 'Transparent communication and dependable execution made every project financially predictable.',
  },
  {
    name: 'Mit Damani',
    role: 'Development Head',
    quote: 'Their development approach ensured scalable, maintainable, and high-quality software delivery.',
  },
];

export const faqs = [
  { q: 'Do you build custom IoT products?', a: 'Yes. We support concept design, embedded electronics, firmware, cloud dashboards, and pilot deployment.' },
  { q: 'Can training programs be customized for colleges?', a: 'Yes. Courses can be aligned with academic schedules, lab infrastructure, and project outcomes.' },
  { q: 'Do your solutions support cloud dashboards?', a: 'Yes. We integrate device telemetry with cloud dashboards, alerts, reports, and APIs.' },
  { q: 'Do you provide maintenance?', a: 'Yes. Annual maintenance and consulting support are available for eligible products and deployments.' },
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
  { title: 'Practical Innovation', icon: Lightbulb, text: 'Technology that solves field-level problems, not just demo-room problems.' },
  { title: 'Reliable Engineering', icon: ShieldCheck, text: 'Design choices grounded in durability, maintainability, and safety.' },
  { title: 'Hands-on Learning', icon: Award, text: 'Training with real hardware, live labs, projects, and deployment context.' },
];
