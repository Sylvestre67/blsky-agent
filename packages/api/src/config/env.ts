import { config } from 'dotenv';
import findConfig from 'find-config';
import crypto from 'crypto';

config({ path: findConfig('.env') || '' });

export const env = {
  PORT: process.env.PORT || '3000',
  TOKEN_SECRET:
    process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex'),
  BLSKY_USERNAME: process.env.BLSKY_USERNAME,
  BLSKY_PASSWORD: process.env.BLSKY_PASSWORD,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  HF_TOKEN: process.env.HF_TOKEN,
} as const;

// Validate required env vars
Object.entries(env).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
});
