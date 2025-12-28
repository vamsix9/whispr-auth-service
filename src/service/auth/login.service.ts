import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as repo from '../../repo/auth/login.repo';
import { IncorrectPassword, UserDoesNotExist } from '../../constants';
import { redisClient } from '../../config/redis'; // adjust path to your redis client

dotenv.config();

export const login = async (password: string, email: string) => {
  try {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // 1️⃣ Check if user exists
    const user = await repo.checkIfUserExist(email);

    if (!user) {
      throw new Error(UserDoesNotExist);
    }

    // 2️⃣ Compare password
    const isPasswordMatching = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatching) {
      throw new Error(IncorrectPassword);
    }

    // 3️⃣ Generate JWT
    const expiresIn = '12h';
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn });

    // 4️⃣ Store token in Redis with TTL (12 hours = 43200 seconds)
    const ttlSeconds = 12 * 60 * 60;
    const redisKey = user.id;

    try {
      await generateTokenAndStoreInRedis(redisKey, token, ttlSeconds);
    } catch (redisErr) {
      console.error('Failed to store JWT in Redis:', redisErr);
    }

    // 5️⃣ Return response
    return { message: 'Login successful', token };
  } catch (err) {
    throw err;
  }
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
      EX: ttlSeconds, // expiration time in seconds
    });

    console.log(`✅ Stored JWT for user ${userId} in Redis with TTL ${ttlSeconds}s`);
  } catch (error) {
    console.error('Failed to store token in Redis:', error);
    throw error;
  }
}
