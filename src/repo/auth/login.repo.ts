import { UserModel } from "../../model/user/user.model";

export const checkIfUserExist = async (email: string) => {
    try {
        if (email) {
            return await UserModel.findOne({ email }).exec();
        }
    } catch (err) {
        throw err;
    }
}
