import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  REDIS_URL: z.string(),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string().optional(),
});
