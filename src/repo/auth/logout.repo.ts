import { redisClient } from "../../config/redis";


// Save refresh token in Redis
export const saveToken = async (userId: string, refreshToken: string): Promise<void> => {
  try {
    await redisClient.set(`refreshToken:${userId}`, refreshToken, { EX: 7 * 24 * 60 * 60 }); // 7 days expiry
  } catch (error) {
    throw new Error('Failed to save token to Redis');
  }
};

// Get refresh token from Redis
export const getToken = async (userId: string): Promise<string | null> => {
  try {
    return await redisClient.get(`refreshToken:${userId}`);
  } catch (error) {
    throw new Error('Failed to fetch token from Redis');
  }
};

// Delete refresh token from Redis
export const deleteToken = async (userId: string): Promise<void> => {
  try {
    await redisClient.del(`refreshToken:${userId}`);
  } catch (error) {
    throw new Error('Failed to delete token from Redis');
  }
};
