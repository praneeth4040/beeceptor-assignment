import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://praneethchakka.free.beeceptor.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
});
