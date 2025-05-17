import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import SlidingWindowRateLimiter from '../../src/algorithms/slidingWindowRateLimiter'

describe('SlidingWindowRateLimiter', () => {
  let limiter: SlidingWindowRateLimiter;
  const key = 'test-key';

  beforeEach(() => {
    vi.useFakeTimers();
    limiter = new SlidingWindowRateLimiter(60_000, 3, 'in-memory');
  });

  test('allows requests within limit', async () => {
    expect(await limiter.allowAccess(key)).toBe(true); // 1
    vi.advanceTimersByTime(15_000);
    expect(await limiter.allowAccess(key)).toBe(true); // 2
    vi.advanceTimersByTime(15_000);
    expect(await limiter.allowAccess(key)).toBe(true); // 3
  });

  test('rejects excess requests', async () => {
    for (let i = 0; i < 3; i++) await limiter.allowAccess(key);
    expect(await limiter.allowAccess(key)).toBe(false); // 4
  });

  test('slides window correctly', async () => {
    // Fill window
    await limiter.allowAccess(key); // t=0
    vi.advanceTimersByTime(30_000);
    await limiter.allowAccess(key); // t=30
    vi.advanceTimersByTime(31_000); // t=61 (first request expires)
    expect(await limiter.allowAccess(key)).toBe(true); // New allowed
  });
});