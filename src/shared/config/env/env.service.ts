import * as dotenv from 'dotenv';
import { envSchema } from './env.zod';
dotenv.config({
  path: ['.env.development', '.env.test', '.env', '.env.production'],
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const ENV = parsed.data;
