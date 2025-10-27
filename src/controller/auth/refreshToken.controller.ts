import * as service from '../../service/auth/refreshToken.service';
import { Responses, TypedRequest, TypedResponse } from '../../types/express';

export const refreshTokenController = async (req: TypedRequest['refreshToken'], res: TypedResponse<Responses['refreshToken']>) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Refresh token is required',
            });
        }

        const result = await service.refreshTokenService(refreshToken);

        return res.status(200).json({
            token: result.token,
            refreshToken: result.refreshToken,
            message: 'Token refreshed successfully',
        });
    } catch (error: any) {
        console.error('Error refreshing token:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Refresh token has expired',
            });
        }

        return res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: error.message || 'Something went wrong',
        });
    }
};
