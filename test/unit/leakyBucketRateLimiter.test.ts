import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import LeakyBucketRateLimiter from '../../dist/algorithms/leakyBucketRateLimiter';

describe('LeakyBucketRateLimiter', () => {
  let limiter: LeakyBucketRateLimiter;
  const key = 'test-key';
  
  beforeEach(() => {
    // Capacity: 5, Leak rate: 2 requests/sec
    limiter = new LeakyBucketRateLimiter(5, 2, 'in-memory');
    vi.useFakeTimers(); // Enable time mocking for all tests
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers
  });

  test('should allow requests within capacity', async () => {
    // Fill bucket to just below capacity
    for (let i = 0; i < 5; i++) {
      expect(await limiter.allowAccess(key)).toBe(true);
    }
  });

  test('should reject requests when bucket is full', async () => {
    // Fill bucket to capacity
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    
    // Next request should be rejected
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('should leak requests at fixed rate', async () => {
    // Fill bucket completely
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    
    // Advance time by 500ms (should leak 1 request: 2 req/sec * 0.5 sec = 1)
    vi.advanceTimersByTime(500);
    
    // Should accept 1 more request (4 remaining + 1 new)
    expect(await limiter.allowAccess(key)).toBe(true);
    
    // Bucket should now be full again
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('should handle multiple leaks over time', async () => {
    // Fill bucket
    for (let i = 0; i < 5; i++) await limiter.allowAccess(key);
    
    // Advance time by 2 seconds (should leak 4 requests)
    vi.advanceTimersByTime(2000);
    
    // Should accept 4 new requests
    for (let i = 0; i < 4; i++) {
      expect(await limiter.allowAccess(key)).toBe(true);
    }
    
    // Next should reject (1 remaining + 4 new = 5)
    expect(await limiter.allowAccess(key)).toBe(false);
  });

  test('should reset completely if idle for full window', async () => {
    // Make one request
    await limiter.allowAccess(key);
    
    // Advance time by 2 seconds (more than needed to empty bucket)
    vi.advanceTimersByTime(2000);
    
    // Should accept full capacity again
    for (let i = 0; i < 5; i++) {
      expect(await limiter.allowAccess(key)).toBe(true);
    }
  });
});