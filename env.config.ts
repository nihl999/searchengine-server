import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  ENVIRONMENT: z.enum(['development', 'production', 'test']),
});

export const config = envSchema.parse(process.env);
