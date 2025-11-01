import jwt, { JwtPayload } from 'jsonwebtoken';
import * as repo from '../../repo/auth/logout.repo';

const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};

export const logout = async (accessToken: string, refreshToken: string) => {
  try {
    const decoded = verifyToken(accessToken);

    if (!decoded || !decoded.userId) {
      throw { statusCode: 401, message: 'Invalid or expired access token' };
    }

    const userId = decoded.userId;
    const storedToken = await repo.getToken(userId);

    if (!storedToken || storedToken !== refreshToken) {
      throw { statusCode: 400, message: 'Invalid or mismatched refresh token' };
    }

    await repo.deleteToken(userId);

    return { message: 'User logged out successfully' };
  } catch (error: any) {
    if (error.statusCode) throw error;
    throw { statusCode: 500, message: 'Internal server error during logout' };
  }
};
