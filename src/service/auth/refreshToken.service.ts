import jwt from 'jsonwebtoken';
import { getRefreshToken, storeRefreshToken, deleteRefreshToken } from '../../repo/auth/refreshToken.repo';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export const refreshTokenService = async (refreshToken: string) => {
  try {
    // Verify if the token exists in Redis
    const storedTokenData = await getRefreshToken(refreshToken);
    if (!storedTokenData) {
      throw new Error('Invalid or expired refresh token');
    }

    // Verify the token signature
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    // Rotate tokens: issue new pair and delete the old one
    const newAccessToken = generateAccessToken({ userId: decoded.userId, email: decoded.email });
    const newRefreshToken = generateRefreshToken({ userId: decoded.userId, email: decoded.email });

    // Replace old refresh token in Redis
    await deleteRefreshToken(refreshToken);
    await storeRefreshToken(decoded.userId, newRefreshToken);

    return {
      token: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw error;
  }
};
