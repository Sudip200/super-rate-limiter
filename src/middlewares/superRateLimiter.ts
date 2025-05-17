import { Request,Response,NextFunction } from "express";
import RateLimiter from "../algorithms/rateLimiter";
import { RateLimiterOptions } from "../types/middlewareOptionsType";

export const superRateLimiter = (options: RateLimiterOptions) => {
    const rateLimiter = new RateLimiter(options);
    const getKey = options.keyExtractor || ((req: Request) => req.ip);
    return (req: Request, res: Response, next: NextFunction) => {
        const key = getKey(req);
      
        rateLimiter.allowAccess(key)
            .then(allowed => {
                if (!allowed) {
                    return res.status(429).json({ 
                        message: "Too many requests. Please try again later." 
                    });
                }
                next();
            })
            .catch(next); 
    };
}