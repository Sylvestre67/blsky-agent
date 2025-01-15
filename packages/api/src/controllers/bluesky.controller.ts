import { Request, Response } from 'express';
import { BlueSkyService } from '../services/bluesky.service';

export class BlueSkyController {
  private static readonly blueSkyService = new BlueSkyService();

  static async getTrendingPosts(_req: Request, res: Response) {
    try {
      const { blueSkyService } = BlueSkyController;
      await blueSkyService.login();
      const topics = await blueSkyService.getTrendingTopics();

      if (!topics.length) {
        return res.status(404).json({ error: 'No trending topics found' });
      }

      res.json({
        topics,
      });
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      res.status(500).json({ error: 'Failed to fetch trending posts' });
    }
  }
}
