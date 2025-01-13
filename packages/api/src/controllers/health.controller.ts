import { Request, Response } from 'express';
import { execSync } from 'child_process';

export class HealthController {
  static check(_req: Request, res: Response) {
    const gitHash = execSync('git rev-parse HEAD').toString().trim();
    res.json({ status: 'ok', git_hash: gitHash });
  }
}
