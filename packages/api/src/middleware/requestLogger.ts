import { Request, Response, NextFunction } from 'express';

export class Middleware {
  static requesstLog(req: Request, _res: Response, next: NextFunction) {
    console.log(`${req.method} | ${req.path} | ${req.get('user-agent')}`);
    next();
  }
} 