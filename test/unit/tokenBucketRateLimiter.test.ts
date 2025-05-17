import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import TokenBucketRateLimiter from '../../src/algorithms/tokenBucketRateLimiter';


describe('TokenBucketRateLimiter', () => {
  let limiter: TokenBucketRateLimiter;
  const key = 'test-key';

  beforeEach(() => {
    vi.useFakeTimers();
    limiter = new TokenBucketRateLimiter(5, 2, 'in-memory'); // 5 capacity, 2 tokens/sec
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('allows requests up to capacity', async () => {
    for (let i = 0; i < 5; i++) {
      expect(await limiter.allowAccess(key)).toBe(true);
    }
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('refills tokens over time', async () => {
    // Exhaust all tokens
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    
    // Advance 1 second (2 tokens refilled)
    vi.advanceTimersByTime(1000);
    
    expect(await limiter.allowAccess(key)).toBe(true);
    expect(await limiter.allowAccess(key)).toBe(true);
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('never exceeds capacity when idle', async () => {
    vi.advanceTimersByTime(10_000); // 10 seconds idle
    let allowed = 0;
    for (let i = 0; i < 10; i++) {
      if (await limiter.allowAccess(key)) allowed++;
    }
    expect(allowed).toBe(5); // Still capped at capacity
  });

  test('handles concurrent requests', async () => {
    // Simulate parallel requests
    const results = await Promise.all([
      limiter.allowAccess(key),
      limiter.allowAccess(key),
      limiter.allowAccess(key)
    ]);
    expect(results.filter(Boolean).length).toBe(3);
  });
});