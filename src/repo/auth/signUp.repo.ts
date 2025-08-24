import { UserModel } from "../../model/user/user.model";
import * as dto from '../../dto/auth/signUp.dto';

export const createUser = async (data: dto.ManualSignUpRequestDTO) => {
    return await UserModel.create(data);
};

export const findUserByEmailOrMobile = async (email?: string, mobileNumber?: number) => {
    return await UserModel.findOne({
        $or: [
            email ? { email } : {},
            mobileNumber ? { mobileNumber } : {},
        ],
    }).exec();
};
