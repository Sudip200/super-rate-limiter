import { KeyType } from "../types/keyType";
import { BaseRateLimiterOptions, RateLimiterOptions } from "../types/middlewareOptionsType";
import FixedWindowRateLimiter from "./fixedWindowRateLimiter";
import LeakyBucketRateLimiter from "./leakyBucketRateLimiter";
import IRateLimiter from "./rateLimiterInterface";
import SlidingWindowRateLimiter from "./slidingWindowRateLimiter";
import TokenBucketRateLimiter from "./tokenBucketRateLimiter";

class RateLimiter{
    private algoStrategy:IRateLimiter<any>;
    constructor(options:RateLimiterOptions){
     switch(options.algorithm){
        case 'fixed-window':
              this.algoStrategy= new FixedWindowRateLimiter(options.windowSizeInMS,options.maxRequests,options.storeType);
              break;
        case 'leaky-bucket':
              this.algoStrategy = new LeakyBucketRateLimiter(options.capacity,options.leakRatePerSec,options.storeType);
              break;
        case 'token-bucket':
              this.algoStrategy = new TokenBucketRateLimiter(options.capacity,options.refillRatePerSec,options.storeType);
              break;
        case  'sliding-window':
              this.algoStrategy = new SlidingWindowRateLimiter(options.windowSizeInMS,options.maxRequests,options.storeType);
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