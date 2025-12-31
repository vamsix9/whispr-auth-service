import jwt from 'jsonwebtoken';
import { redisClient } from '../config/redis';

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

export async function generateTokenAndStoreInRedis(
  userId: string,
  token: string,
  ttlSeconds: number
): Promise<void> {
  try {
    if (!userId || !token) {
      throw new Error('User ID and token must be provided.');
    }

    await redisClient.set(userId, token, {
      EX: ttlSeconds,
    });

    console.log(`✅ Stored JWT for user ${userId} in Redis with TTL ${ttlSeconds}s`);
  } catch (error) {
    console.error('Failed to store token in Redis:', error);
    throw error;
  }
}