import { Responses, TypedRequest, TypedResponse } from '../../types/express';
import * as service from '../../service/auth/signUp.service';

export const signUp = async (req: TypedRequest['signUp'], res: TypedResponse<Responses['signUp']>) => {
    try {
        const data = req.body;
        const result = await service.signUpUser(data);
        return res.status(201).json({ message: result.message ?? 'User created successfully' });
    } catch (error: any) {
        if (error.message === 'User already exists') {
            return res.status(409).json({ statusCode: 409, error: 'Conflict', message: error.message });
        }
        return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: error.message });
    }
};
