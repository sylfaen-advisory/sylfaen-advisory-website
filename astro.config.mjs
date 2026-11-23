import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sylfaenadvisory.co.uk',
  output: 'static',
  build: { format: 'file' },
  integrations: [
    react(),
    sitemap({
      // The sitemap integration derives URLs from Astro's internal route
      // pattern, which ignores build.format:'file' — so /privacy.astro
      // comes out as "/privacy", not the "/privacy.html" that's actually
      // served. Drop that mismatched entry and add the real URL instead.
      filter: (page) =>
        page !== 'https://sylfaenadvisory.co.uk/privacy' &&
        page !== 'https://sylfaenadvisory.co.uk/terms' &&
        page !== 'https://sylfaenadvisory.co.uk/ethical-employment-policy',
      // rics-ai-governance is left in as /rics-ai-governance (no .html):
      // that is its public URL, and GitHub Pages serves the .html file there.
      customPages: [
        'https://sylfaenadvisory.co.uk/privacy.html',
        'https://sylfaenadvisory.co.uk/terms.html',
        'https://sylfaenadvisory.co.uk/ethical-employment-policy.html',
      ],
    }),
  ],
});
