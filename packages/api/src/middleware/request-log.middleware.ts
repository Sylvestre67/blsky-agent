import { Request, Response, NextFunction } from 'express';

export class RequestLog {
  static log(req: Request, _res: Response, next: NextFunction) {
    console.log(`${req.method} | ${req.path} | ${req.get('user-agent')}`);
    next();
  }
}
