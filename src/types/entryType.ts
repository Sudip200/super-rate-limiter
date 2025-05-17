export type fixedWindowRateLimiterEntryType={
  count:number,
  startTime:number
}
export interface LeakyBucketEntry {
  lastLeakTime: number;
  queue: number[]; 
}
export interface SlidingWindowEntry {
  timestamps: number[]; 
}
export interface TokenBucketEntryType{
    lastRefillTime:number
    tokens:number
}

