import { TokenBucketEntryType } from "../types/entryType";
import { KeyType } from "../types/keyType";
import { storeType } from "../types/storeType";
import RateLimiter from "./rateLimiter";
import IRateLimiter from "./rateLimiterInterface";

export default class TokenBucketRateLimiter extends IRateLimiter{
    private capacity:number;
    private refillRatePerSec:number;
    constructor(capacity:number,refillRatePerSec:number,storeType:storeType){
        super(storeType);
        this.capacity=capacity;
        this.refillRatePerSec=refillRatePerSec;
    }
    public async allowAccess(key: KeyType): Promise<boolean> {
        let currentTime = Date.now();
        let entry:TokenBucketEntryType= await this.store.getData(key) ?? {
            tokens:this.capacity,
            lastRefillTime:currentTime
        };
        let elapesdTime = (currentTime - entry.lastRefillTime) / 1000;
        let numTokens =Math.min(this.capacity,entry.tokens+elapesdTime*this.refillRatePerSec)
        if(numTokens>=1){ 
           await this.store.setData(key,{
            lastRefillTime:currentTime,
            tokens:numTokens-1
           })
           return true
        }
        await this.store.setData(key,{
            tokens:numTokens,
            lastRefillTime:currentTime
        })
        return false

    }
}