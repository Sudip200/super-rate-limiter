import { LeakyBucketEntry } from "../types/entryType";
import { KeyType } from "../types/keyType";
import { storeType } from "../types/storeType";
import IRateLimiter from "./rateLimiterInterface";

export default class LeakyBucketRateLimiter extends IRateLimiter<LeakyBucketEntry> {
  private capacity: number;
  private leakRatePerSec: number;
  
  constructor(capacity: number, leakRatePerSec: number, storeType: storeType) {
    super(storeType);
    this.capacity = capacity;
    this.leakRatePerSec = leakRatePerSec;
  }

  public async allowAccess(key: KeyType): Promise<boolean> {
    const currentTime = Date.now();
    let entry: LeakyBucketEntry | null = await this.store.getData(key);
    if (!entry) {
      const newEntry: LeakyBucketEntry = {
        lastLeakTime: currentTime,
        queue: [currentTime] 
      };
      await this.store.setData(key, newEntry);
      return true;
    }
    const timeElapsed = currentTime - entry.lastLeakTime;
    const leaks = Math.floor(timeElapsed * this.leakRatePerSec / 1000);
    const updatedQueue = leaks > 0 
      ? entry.queue.slice(leaks) 
      : [...entry.queue];
    if (updatedQueue.length < this.capacity) {
      const newEntry: LeakyBucketEntry = {
        lastLeakTime: currentTime,
        queue: [...updatedQueue, currentTime]
      };
      await this.store.setData(key, newEntry);
      return true;
    }
    return false;
  }
}