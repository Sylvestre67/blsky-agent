import crypto from 'crypto';
import { env } from '../config/env';

export class TokenManager {
  private static readonly SECRET = env.TOKEN_SECRET;
  private static readonly ALGORITHM = 'sha256';

  static generateToken(): string {
    const randomBytes = crypto.randomBytes(32).toString('hex');
    const hmac = crypto.createHmac(this.ALGORITHM, this.SECRET);
    hmac.update(randomBytes);
    const signature = hmac.digest('hex');

    return `${randomBytes}.${signature}`;
  }

  static verifyToken(token: string): boolean {
    try {
      const [randomBytes, signature] = token.split('.');
      const hmac = crypto.createHmac(this.ALGORITHM, this.SECRET);
      hmac.update(randomBytes);
      const expectedSignature = hmac.digest('hex');

      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );
    } catch {
      return false;
    }
  }
}
