import { Request, Response, NextFunction } from 'express';
import { TokenManager } from '../utils/token.manager';

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing bearer token' });
    }

    const token = authHeader.split(' ')[1];
    const isValid = TokenManager.verifyToken(token);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    next();
  }
}
