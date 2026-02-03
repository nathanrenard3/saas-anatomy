import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/', '/legal', '/privacy'],
      },
    ],
    sitemap: 'https://saas-anatomy.com/sitemap.xml',
  };
}
