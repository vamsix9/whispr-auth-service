import { UserModel } from "../../model/user/user.model";

export const checkIfUserExist = async (email?: string, mobileNumber?: number) => {
    try {
        if (email) {
            return await UserModel.findOne({ email }).exec();
        }
        else if (mobileNumber) {
            return await UserModel.findOne({ mobileNumber }).exec();
        }
    } catch (err) {
        throw err;
    }
}

const login = async (email?: string, mobileNumber?: number) => {
    try {
        const user = await checkIfUserExist(email, mobileNumber);
        if (user) {

        }
        else {

        }
    }
    catch (err) {
        throw err;
    }
}