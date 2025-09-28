import { Responses, TypedRequest, TypedResponse } from "../../types/express";
import * as service from '../../service/auth/login.service';

export const login = async (req: TypedRequest['login'], res: TypedResponse<Responses['login']>) => {
    try {
        const data = req.body;
        const result = await service.login(data.password, data.email, data.countryCode, data.mobileNumber);
        return res.status(200).json(result);
    }
    catch (err) {
        throw err;
    }
}