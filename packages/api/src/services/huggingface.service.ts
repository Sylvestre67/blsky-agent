import { HfInference } from '@huggingface/inference';
import { env } from '../config/env';

export interface GeneratedImage {
  image: Uint8Array;
  caption: string;
}

export class HuggingFaceService {
  private client: HfInference;

  constructor() {
    if (!env.HF_TOKEN) {
      throw new Error('HuggingFace token not configured');
    }
    this.client = new HfInference(env.HF_TOKEN);
  }

  async generateCaption(post: string): Promise<string> {
    try {
      const captionResponse = await this.client.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        inputs: `In a few words, create a prompt for a text-to-image LLM to create a picture that would best illustrate the following post: ${post}`,
        parameters: {
          max_new_tokens: 500,
        },
      });

      return captionResponse.generated_text;
    } catch (error) {
      console.error('Error generating caption:', error);
      throw new Error('Failed to generate caption');
    }
  }

  async generateImage(post: string): Promise<GeneratedImage> {
    try {
      const caption = await this.generateCaption(post);

      const response = await this.client.textToImage(
        {
          inputs: `${caption}. IMPORTANT: Do not include text in the image.`,
          model: 'stabilityai/stable-diffusion-3.5-large',
        },
        { use_cache: false }
      );

      if (!response) {
        throw new Error('Failed to generate image');
      }

      return {
        image: new Uint8Array(await response.arrayBuffer()),
        caption,
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }
}
