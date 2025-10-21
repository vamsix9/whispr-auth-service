import { UserModel } from "../../model/user/user.model";
import * as dto from '../../dto/auth/signUp.dto';

export const createUser = async (data: dto.ManualSignUpRequestDTO) => {
    return await UserModel.create(data);
};

export const findUserByEmail = async (email: string) => {
  if (email) {
    return await UserModel.findOne({ email }).exec();
  }

  return null;
};

