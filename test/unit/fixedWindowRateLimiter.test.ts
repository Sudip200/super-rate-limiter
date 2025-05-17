import { describe, expect, test, beforeEach, vi } from 'vitest';
import FixedWindowRateLimiter from '../../dist/algorithms/fixedWindowRateLimiter';

describe('FixedWindowRateLimiter', () => {
  let limiter: FixedWindowRateLimiter;
  const key = 'test-key';
  
  beforeEach(() => {
    limiter = new FixedWindowRateLimiter(1000, 5, 'in-memory');
  });

  test('should allow requests within limit', async () => {
    for (let i = 0; i < 5; i++) {
      expect(await limiter.allowAccess(key)).toBe(true);
    }
  });

  test('should reject requests over limit', async () => {
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('should reset after window expires', async () => {
    // Fill the window
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    
    // Mock time passing
    vi.useFakeTimers();
    vi.advanceTimersByTime(1001);
    
    // Should allow again
    expect(await limiter.allowAccess(key)).toBe(true);
    vi.useRealTimers();
  });
});