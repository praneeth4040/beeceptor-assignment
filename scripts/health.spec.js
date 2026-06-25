import { test, expect } from '@playwright/test';

test.describe('Beeceptor Proxy Health Check Verification', () => {
  test('should forward request to Express server and return UP status', async ({ request }) => {
    const response = await request.get('/synchronous');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Received response:', JSON.stringify(body, null, 2));

    expect(body).toHaveProperty('status');
    expect(body.status).toBe('UP');

    expect(body).toHaveProperty('timestamp');
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

    expect(body).toHaveProperty('uptime');
    expect(typeof body.uptime).toBe('number');
    expect(body.uptime).toBeGreaterThan(0);
  });

  test('should return instant response for asynchronous callout', async ({ request }) => {
    const response = await request.get('/asynchronous');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Received response (asynchronous):', JSON.stringify(body, null, 2));

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('This is an instant response from beeceptor asynchronous callout');
  });
});

