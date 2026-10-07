import React, { useEffect } from 'react';

/**
 * Lightweight, zero-dependency SEO head manager for React SPA.
 * Dynamically updates document title, meta tags, canonical link, OpenGraph tags,
 * and JSON-LD structured data on client-side route transitions.
 */
export const SEO = ({
  title = 'Cognisys AI | AI, Software, CCTV Surveillance & Project Development',
  description = 'Cognisys is an MSME-recognized engineering entity pioneering autonomous AI CCTV surveillance, face recognition systems, modern web platforms, and university engineering capstones.',
  keywords = 'Cognisys, Cognisys AI, AI CCTV surveillance, face recognition attendance, computer vision, web development, Python projects, final year projects India',
  canonical = 'https://cognisys.org.in/',
  ogType = 'website',
  ogImage = 'https://cognisys.org.in/cognisys-logo-full.png',
  schema = null,
  breadcrumbs = null
}) => {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create a meta tag by name
    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update or create a meta tag by property (Open Graph)
    const setOgMeta = (property, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('title', title);

    // 3. Canonical Link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // 4. Open Graph Tags
    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:url', canonical);
    setOgMeta('og:type', ogType);
    setOgMeta('og:image', ogImage);
    setOgMeta('og:site_name', 'Cognisys Technologies');

    // 5. Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:url', canonical);
    setMeta('twitter:image', ogImage);

    // 6. Dynamic JSON-LD Structured Data
    const schemasToInject = [];

    // Optional BreadcrumbList Schema
    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      schemasToInject.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': crumb.name,
          'item': crumb.url.startsWith('http') ? crumb.url : `https://cognisys.org.in${crumb.url}`
        }))
      });
    }

    // Custom Schema (Service, FAQPage, etc.)
    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema);
      } else {
        schemasToInject.push(schema);
      }
    }

    let scriptEl = document.getElementById('dynamic-route-schema');
    if (schemasToInject.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'dynamic-route-schema';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject,
        null,
        2
      );
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Clean up dynamic schema when leaving the component
      const dynScript = document.getElementById('dynamic-route-schema');
      if (dynScript) dynScript.remove();
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema, breadcrumbs]);

  return null;
};

export default SEO;
