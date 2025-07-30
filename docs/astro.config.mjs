// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import starlightThemeRapide from 'starlight-theme-rapide';

// https://astro.build/config
export default defineConfig({
  // Set the site and base for correct asset URLs on GitHub Pages
  site: 'https://edmolima.github.io/rhyolite/',
  base: '/rhyolite',
  integrations: [
    starlight({
      title: 'Rhyolite',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/edmolima/rhyolite' }],
      sidebar: [
        {
          label: 'Rhyolite Docs',
          items: [
            { label: '🏠 Home', slug: 'index' },
            {
              label: '🚀 Getting Started',
              items: [
                { label: 'Installation', slug: 'getting-started/installation' },
                { label: 'Quick Start', slug: 'getting-started/quick-start' },
                { label: 'First Project', slug: 'getting-started/first-project' },
              ],
            },
            {
              label: '🖥️ CLI & Tooling',
              items: [
                { label: 'Flags & Options', slug: 'cli/flags' },
                { label: 'Advanced Usage', slug: 'cli/advanced' },
              ],
            },
            {
              label: '📦 Templates',
              items: [
                { label: 'Plugin Templates', slug: 'templates/plugins' },
                { label: 'Theme Templates', slug: 'templates/themes' },
                { label: 'Community Templates', slug: 'templates/community' },
                { label: 'Template Authoring', slug: 'templates/authoring' },
              ],
            },
            {
              label: '⚙️ Configuration',
              items: [
                { label: 'Extending Templates', slug: 'config/extending' },
                { label: 'Advanced Config', slug: 'config/advanced' },
              ],
            },
            {
              label: '🗂️ Monorepo & Workspace',
              items: [
                { label: 'Adding Packages', slug: 'monorepo/adding-packages' },
                { label: 'Workspace Scripts', slug: 'monorepo/scripts' },
              ],
            },
            {
              label: '🚢 CI/CD & Publishing',
              items: [
                { label: 'Automated Publishing', slug: 'ci-cd/publishing' },
                { label: 'Docs Deployment', slug: 'ci-cd/docs' },
                { label: 'Best Practices', slug: 'ci-cd/best-practices' },
              ],
            },
            {
              label: '👩‍💻 Developer Guide',
              items: [
                { label: 'Contributing', slug: 'contributing' },
                { label: 'Testing', slug: 'developer/testing' },
                { label: 'Linting & Formatting', slug: 'developer/linting' },
                { label: 'Debugging', slug: 'developer/debugging' },
                { label: 'Roadmap', slug: 'developer/roadmap' },
              ],
            },
            {
              label: '✨ Features',
              items: [{ label: 'Workflows', slug: 'features/workflows' }],
            },
            {
              label: '❓ Troubleshooting & FAQ',
              items: [
                { label: 'Common Issues', slug: 'troubleshooting/common-issues' },
                { label: 'Error Explanations', slug: 'troubleshooting/errors' },
                { label: 'FAQ', slug: 'faq' },
                { label: 'Community Support', slug: 'troubleshooting/community' },
              ],
            },
          ],
        },
      ],
      plugins: [starlightThemeRapide()],
    }),
  ],
});
