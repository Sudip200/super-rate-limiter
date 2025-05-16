import { AlgorithmType } from "./algorithmType";
import { storeType } from "./storeType";
import { Request } from "express";
export interface BaseRateLimiterOptions {
  algorithm: AlgorithmType;
  storeType: storeType;
  keyExtractor?:(req:Request)=>KeyType;
}

export interface FixedWindowOptions extends BaseRateLimiterOptions {
  algorithm: "fixed-window";
  maxRequests: number;
  windowSizeInMS: number;
}

export interface SlidingWindowOptions extends BaseRateLimiterOptions {
  algorithm: "sliding-window";
  maxRequests: number;
  windowSizeInMS: number;
}

export interface TokenBucketOptions extends BaseRateLimiterOptions {
  algorithm: "token-bucket";
  capacity: number;
  refillRatePerSec: number;
}

export interface LeakyBucketOptions extends BaseRateLimiterOptions {
  algorithm: "leaky-bucket";
  capacity: number;
  leakRatePerSec: number;
}

export type RateLimiterOptions =
  | FixedWindowOptions
  | SlidingWindowOptions
  | TokenBucketOptions
  | LeakyBucketOptions;
