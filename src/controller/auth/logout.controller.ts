import { Request, Response } from 'express';
import * as service from '../../service/auth/logout.service';

export const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];
    const { refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
      res.status(400).json({ message: 'Access token and refresh token are required' });
      return;
    }

    const result = await service.logout(accessToken, refreshToken);
    res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || 'Internal server error' });
  }
};
