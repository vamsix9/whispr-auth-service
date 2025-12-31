import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as repo from '../../repo/auth/login.repo';
import { IncorrectPassword, UserDoesNotExist } from '../../constants';
import { generateTokenAndStoreInRedis } from '../../utils/jwt';

dotenv.config();

export const login = async (password: string, email: string) => {
  try {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const user = await repo.checkIfUserExist(email);

    if (!user) {
      throw new Error(UserDoesNotExist);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatching) {
      throw new Error(IncorrectPassword);
    }

    const expiresIn = '12h';
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn });

    const ttlSeconds = 12 * 60 * 60;
    const redisKey = user.id;

    try {
      await generateTokenAndStoreInRedis(redisKey, token, ttlSeconds);
    } catch (redisErr) {
      console.error('Failed to store JWT in Redis:', redisErr);
    }

    return { message: 'Login successful', token };
  } catch (err) {
    throw err;
  }
};
