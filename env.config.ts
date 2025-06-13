import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().nonempty().url().default('mongodb://localhost:27017'),
  MONGO_DBNAME: z.string().nonempty().default('default'),
  ENVIRONMENT: z.enum(['development', 'production']),
});

export const config = envSchema.parse(process.env);
