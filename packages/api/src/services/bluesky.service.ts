import { BskyAgent } from '@atproto/api';
import { env } from '../config/env';

export class BlueSkyService {
  private readonly agent: BskyAgent;

  constructor() {
    this.agent = new BskyAgent({
      service: 'https://bsky.social',
    });
  }

  async login() {
    if (!env.BLSKY_USERNAME || !env.BLSKY_PASSWORD) {
      throw new Error('BlueSky credentials not configured');
    }

    await this.agent.login({
      identifier: env.BLSKY_USERNAME,
      password: env.BLSKY_PASSWORD,
    });
  }

  getTrendingTopics = async (limit: number = 20) => {
    try {
      const response =
        await this.agent.api.app.bsky.unspecced.getTrendingTopics({
          limit,
        });

      if (!response.success) {
        throw new Error(`Failed to fetch trending topics: ${response.status}`);
      }

      return response.data.topics.map(
        (topic: { topic: string; link: string }) => ({
          topic: topic.topic,
          link: topic.link,
        })
      );
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return [];
    }
  };

  async getFeedPosts(feedId: string, limit = 10) {
    const response = await this.agent.api.app.bsky.feed.getFeed({
      feed: `at://did:plc:qrz3lhbyuxbeilrc6nekdqme/app.bsky.feed.generator/${feedId}`,
      limit,
    });

    return response.data.feed.map((view) => ({
      author: view.post.author.displayName,
      text: (view.post.record as { text: string }).text,
    }));
  }

  async createPost(text: string, tags: string[] = []) {
    const rt = new RichText({ text });
    await rt.detectFacets(this.agent);

    const postText =
      tags.length > 0
        ? `${text} ${tags.map((tag) => `#${tag}`).join(' ')}`
        : text;

    await this.agent.post({
      text: postText,
      facets: rt.facets,
    });
  }

  async createImagePost(text: string, image: Uint8Array, alt: string) {
    const response = await this.agent.uploadBlob(image, {
      encoding: 'image/jpeg',
    });

    await this.agent.post({
      text,
      embed: {
        $type: 'app.bsky.embed.images',
        images: [
          {
            alt,
            image: response.data.blob,
          },
        ],
      },
    });
  }
}
