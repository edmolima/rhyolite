// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  // Set the site and base for correct asset URLs on GitHub Pages
  site: 'https://edmolima.github.io/rhyolite/',
  base: '/rhyolite',
  integrations: [
    starlight({
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Docs',
          items: [
            { label: 'Home', slug: 'index' },
            { label: 'Getting Started', slug: 'intro/getting-started' },
            { label: 'CLI Reference', slug: 'cli' },
            { label: 'Monorepo Guide', slug: 'monorepo' },
            { label: 'Packages & Templates', slug: 'packages' },
            { label: 'Contributing', slug: 'contributing' },
            { label: 'CI/CD & Publishing', slug: 'ci-cd' },
            { label: 'FAQ', slug: 'faq' },
            { label: 'Advanced', slug: 'advanced' },
          ],
        },
      ],
    }),
  ],
});
