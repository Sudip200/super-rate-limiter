import { SlidingWindowEntry } from "../types/entryType";
import { KeyType } from "../types/keyType";
import { storeType } from "../types/storeType";
import IRateLimiter from "./rateLimiterInterface";


export default class SlidingWindowRateLimiter extends IRateLimiter {
  private windowSizeMs: number;
  private maxRequests: number;

  constructor(windowSizeMs: number, maxRequests: number, storeType: storeType) {
    super(storeType);
    this.windowSizeMs = windowSizeMs;
    this.maxRequests = maxRequests;
  }

  public async allowAccess(key: KeyType): Promise<boolean> {
    const now = Date.now();
    const cutoff = now - this.windowSizeMs;
    let entry: SlidingWindowEntry = await this.store.getData(key) || {
      timestamps: []
    };
    entry.timestamps = entry.timestamps.filter(t => t > cutoff);
    if (entry.timestamps.length < this.maxRequests) {
      entry.timestamps.push(now);
      await this.store.setData(key, entry);
      return true;
    }

    return false;
  }
}