import { siteConfig } from '../constants/site';

export function createSeo(title, description = siteConfig.description, path = '/') {
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.name} | ${siteConfig.motto}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description,
    canonical: url,
    keywords:
      'IoT solutions, embedded systems, industrial automation, technical training, PCB design, ESP32, Arduino, cloud solutions',
  };
}
