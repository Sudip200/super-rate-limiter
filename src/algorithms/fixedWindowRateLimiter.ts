import { count } from "console";
import {fixedWindowRateLimiterEntryType} from "../types/entryType";
import { KeyType } from "../types/keyType";
import { storeType } from "../types/storeType";
import RateLimiter from "./rateLimiterInterface";

class FixedWindowRateLimiter extends RateLimiter<fixedWindowRateLimiterEntryType> {
  private maxWindowSize: number;
  private maxRequests: number;
  constructor(
    maxWindowSize: number,
    maxRequests: number,
    storeType: storeType
  ) {
    super(storeType);
    this.maxRequests = maxRequests;
    this.maxWindowSize = maxWindowSize;
  }
  public async allowAccess(key: KeyType): Promise<boolean> {
    let currentTime = Date.now();
    let entry: fixedWindowRateLimiterEntryType | null = await this.store.getData(key);
    if ((!entry || (currentTime - entry.startTime) >= this.maxWindowSize)) {
      entry = { count: 1, startTime: currentTime };
      await this.store.setData(key, entry);
      return true;
    }
    if (entry.count >= this.maxRequests) {
      return false;
    }
    await this.store.setData(key, { ...entry, count: entry.count + 1 });
    return true;
  }
}
export default FixedWindowRateLimiter;
