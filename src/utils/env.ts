import { z } from 'zod';

// Define the shape of environment variables
const envSchema = z.object({
  apiUrl: z.string(),
  apiTimeout: z.number(),
  enableAnalytics: z.boolean(),
  enableLogging: z.boolean(),
  appName: z.string(),
  appVersion: z.string(),
});

type Env = z.infer<typeof envSchema>;

// Validate required environment variables
const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_APP_NAME',
  'VITE_APP_VERSION',
  'VITE_ENABLE_ANALYTICS',
  'VITE_ENABLE_LOGGING',
] as const;

requiredEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Define environment configuration
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiTimeout: 30000,
  enableLogging: true,
};

// Helper function to check if we're in development mode
export const isDevelopment = import.meta.env.MODE === 'development';

// Helper function to check if we're in production mode
export const isProduction = import.meta.env.MODE === 'production';

// Helper function to check if we're in staging mode
export const isStaging = import.meta.env.VITE_STAGING === 'true';

// import { env, isDevelopment } from '../utils/env';
