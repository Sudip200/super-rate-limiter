import {Request,Response,NextFunction} from 'express';

export function middleware(req:Request,res:Response,next:NextFunction){
   console.log(req.socket.remoteAddress)
   next()
}