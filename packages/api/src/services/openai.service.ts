import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { env } from '../config/env';

export interface GeneratedTags {
  tags: string[];
}

export interface GeneratedPost {
  text: string;
}

export class OpenAIService {
  private client: OpenAI;

  constructor() {
    if (!env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }
    this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async generateTags(content: string, numberOfTags = 3): Promise<string[]> {
    try {
      const TagsResponse = z.object({
        tags: z.array(z.string()),
      });

      const completion = await this.client.beta.chat.completions.parse({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
              You are a helpful assistant specialized in generating social media tags. 
              Be creative and with a good mix of ordinary and out of the box. Create ${numberOfTags} tags. 
              Order them from most to least relevant.
            `,
          },
          {
            role: 'user',
            content: `Generate ${numberOfTags} relevant hashtags and keywords for this content:\n\n${content}`,
          },
        ],
        response_format: zodResponseFormat(TagsResponse, 'tags'),
      });

      return completion.choices[0].message.parsed?.tags ?? [];
    } catch (error) {
      console.error('Error generating tags:', error);
      return [];
    }
  }

  async generatePost(
    viewedPosts: Array<{ author: string; text: string }>
  ): Promise<string> {
    try {
      const content = viewedPosts.map((post) => `${post.text}\n`);

      const PostResponse = z.object({
        text: z.string(),
      });

      const completion = await this.client.beta.chat.completions.parse({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
              You are a social media content creator. 
              You are looking at a list of posts that are trending on a social media platform similar to twitter. 
              Write a post that will get a lot of engagement, likes, and shares in response to the viewed posts.
              Be creative, engaging and respectful. Do not add any hashtags or mentions. 
              Keep it short, not more than 280 characters.
            `,
          },
          {
            role: 'user',
            content: `List of posts:\n\n${content.join('\n')}`,
          },
        ],
        response_format: zodResponseFormat(PostResponse, 'text'),
      });

      return completion.choices[0].message.parsed?.text ?? '';
    } catch (error) {
      console.error('Error generating post:', error);
      throw new Error('Failed to generate post');
    }
  }
}
