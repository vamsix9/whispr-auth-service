import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Create Redis client
export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD || undefined,
});

// Handle errors
redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

// Handle successful connection
redisClient.on('connect', () =>
  console.log('✅ Connected to Redis successfully.'),
);

// Connect to Redis
redisClient.connect();
