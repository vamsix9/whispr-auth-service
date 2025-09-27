import { UserModel } from "../../model/user/user.model";
import * as dto from '../../dto/auth/signUp.dto';

export const createUser = async (data: dto.ManualSignUpRequestDTO) => {
    return await UserModel.create(data);
};

export const findUserByEmailOrMobile = async (email?: string, mobileNumber?: number) => {
  if (email) {
    return await UserModel.findOne({ email }).exec();
  }

  if (mobileNumber) {
    return await UserModel.findOne({ mobileNumber }).exec();
  }

  return null;
};

