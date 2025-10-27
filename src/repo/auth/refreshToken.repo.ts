import { redisClient } from "../../config/redis";


// Store refresh token with expiration (7 days)
export const storeRefreshToken = async (userId: string, refreshToken: string) => {
  try {
    await redisClient.setEx(`refresh:${refreshToken}`, 7 * 24 * 60 * 60, userId);
  } catch (error) {
    throw new Error('Failed to store refresh token in Redis');
  }
};

// Retrieve userId using refresh token
export const getRefreshToken = async (refreshToken: string) => {
  try {
    return await redisClient.get(`refresh:${refreshToken}`);
  } catch (error) {
    throw new Error('Failed to get refresh token from Redis');
  }
};

// Delete refresh token
export const deleteRefreshToken = async (refreshToken: string) => {
  try {
    await redisClient.del(`refresh:${refreshToken}`);
  } catch (error) {
    throw new Error('Failed to delete refresh token from Redis');
  }
};
