import { KeyType } from "../types/keyType";
import { BaseRateLimiterOptions, RateLimiterOptions } from "../types/middlewareOptionsType";
import FixedWindowRateLimiter from "./fixedWindowRateLimiter";
import LeakyBucketRateLimiter from "./leakyBucketRateLimiter";
import IRateLimiter from "./rateLimiterInterface";

class RateLimiter{
    private algoStrategy:IRateLimiter;
    constructor(options:RateLimiterOptions){
     switch(options.algorithm){
        case 'fixed-window':
              this.algoStrategy= new FixedWindowRateLimiter(options.windowSizeInMS,options.maxRequests,options.storeType);
              break;
        case 'leaky-bucket':
              this.algoStrategy = new LeakyBucketRateLimiter(options.capacity,options.leakRatePerSec,options.storeType);
              break;
        default:
              throw new Error("Invalid algorithm provided");      
     }
    }
    public async allowAccess(key: KeyType): Promise<boolean> {
      return await this.algoStrategy.allowAccess(key);
    }
    
}
export default RateLimiter;