import {
  LandingPageData,
  HREFLANG_LOCALES,
  ENGLISH_GUIDE_LINKS,
  INTL_LINKS,
  SITE_ORIGIN,
} from './landingPages';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHreflangLinks(page: LandingPageData): string {
  if (page.category === 'intl') {
    const tags = HREFLANG_LOCALES.map(
      (loc) => `    <link rel="alternate" hreflang="${loc.code}" href="${loc.href}" />`
    );
    tags.push(`    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`);
    return tags.join('\n');
  }
  return `    <link rel="alternate" hreflang="en" href="${page.canonicalUrl}" />`;
}

function buildJsonLd(page: LandingPageData): string {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'QuickTok',
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/icon-512x512.png`,
        width: 512,
        height: 512,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'QuickTok',
      url: `${SITE_ORIGIN}/`,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${page.canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: page.homeLabel,
          item: `${SITE_ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.h1,
          item: page.canonicalUrl,
        },
      ],
    },
    {
      '@type': page.schemaType,
      '@id': `${page.canonicalUrl}#page`,
      url: page.canonicalUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      inLanguage: page.lang,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      ...(page.schemaType === 'Article'
        ? {
            author: { '@id': `${SITE_ORIGIN}/#organization` },
            publisher: { '@id': `${SITE_ORIGIN}/#organization` },
            mainEntityOfPage: { '@id': `${page.canonicalUrl}#page` },
          }
        : {}),
    },
    {
      '@type': 'HowTo',
      '@id': `${page.canonicalUrl}#howto`,
      name: page.stepsHeading,
      description: page.intro,
      inLanguage: page.lang,
      step: page.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
        url: `${SITE_ORIGIN}/#downloader`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${page.canonicalUrl}#faq`,
      inLanguage: page.lang,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function buildStaticRootFallback(page: LandingPageData): string {
  const stepsHtml = page.steps
    .map(
      (s) =>
        `<li><strong>${escapeHtml(s.title)}</strong>: ${escapeHtml(s.description)}</li>`
    )
    .join('\n          ');

  const sectionsHtml = page.sections
    .map((sec) => {
      const ps = sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n        ');
      const ul = sec.bullets
        ? `<ul>\n          ${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n          ')}\n        </ul>`
        : '';
      return `      <section style="margin-bottom: 24px;">
        <h2>${escapeHtml(sec.heading)}</h2>
        ${ps}
        ${ul}
      </section>`;
    })
    .join('\n');

  const faqsHtml = page.faqs
    .map(
      (f) =>
        `<div><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></div>`
    )
    .join('\n        ');

  const relatedHtml = page.relatedLinks
    .map((l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`)
    .join('\n          ');

  const allGuidesHtml = ENGLISH_GUIDE_LINKS.map(
    (g) => `<a href="${escapeHtml(g.href)}">${escapeHtml(g.label)}</a>`
  ).join(' · ');

  const allLangsHtml = INTL_LINKS.map(
    (l) => `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`
  ).join(' · ');

  return `<main style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: system-ui, -apple-system, sans-serif;">
      <nav aria-label="Breadcrumb"><a href="/">${escapeHtml(page.homeLabel)}</a> / <span>${escapeHtml(page.h1)}</span></nav>
      <header style="padding: 16px 0 24px;">
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <p><a href="/#downloader">${escapeHtml(page.ctaLabel)}</a> — ${escapeHtml(page.ctaSubtext)}</p>
      </header>
      <section style="margin-bottom: 24px;">
        <h2>${escapeHtml(page.stepsHeading)}</h2>
        <ol>
          ${stepsHtml}
        </ol>
      </section>
${sectionsHtml}
      <section style="margin-bottom: 24px;">
        <h2>${escapeHtml(page.faqHeading)}</h2>
        ${faqsHtml}
      </section>
      <nav aria-label="${escapeHtml(page.relatedHeading)}">
        <h2>${escapeHtml(page.relatedHeading)}</h2>
        <ul>
          ${relatedHtml}
        </ul>
      </nav>
      <footer>
        <p>${allGuidesHtml}</p>
        <p>${allLangsHtml}</p>
      </footer>
    </main>`;
}

export function renderLandingPageHtml(baseHtml: string, page: LandingPageData): string {
  let html = baseHtml;

  // 1. Replace <html ...> with page lang & dir
  html = html.replace(
    /<html[^>]*>/i,
    `<html lang="${escapeHtml(page.lang)}" dir="${escapeHtml(page.dir)}">`
  );

  // 2. Replace <title>...</title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`
  );

  // 3. Replace <meta name="description" ...>
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  // 4. Replace canonical + hreflang block
  const canonicalAndHreflang = `<link rel="canonical" href="${escapeHtml(page.canonicalUrl)}" />\n${buildHreflangLinks(page)}`;
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>(?:\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>)*/i,
    canonicalAndHreflang
  );

  // 5. Update Open Graph tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(page.canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${escapeHtml(page.ogLocale)}" />`
  );

  // 6. Update Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${escapeHtml(page.canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
  );

  // 7. Replace JSON-LD Schema script
  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n    ${buildJsonLd(page)}\n    </script>`
  );

  // 8. Replace <div id="root">...</div> fallback content cleanly
  html = html.replace(
    /<div\s+id="root">[\s\S]*?<\/div>\s*(?=<script\s+type="module")/i,
    `<div id="root">\n      ${buildStaticRootFallback(page)}\n    </div>\n\n    `
  );

  return html;
}
