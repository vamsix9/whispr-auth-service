import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as repo from '../../repo/auth/login.repo';
import { IncorrectPassword, UserDoesNotExist } from '../../constants';

dotenv.config();

export const login = async (password: string, email?: string, countryCode?: number, mobileNumber?: number) => {
    try {
        /**
         * have a user, else throw 404 error
         * if user exists, check if password matches
         * if password matches, return a jwt token
         */
        const { JWT_SECRET } = process.env;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const user = await repo.checkIfUserExist(email, mobileNumber);
        if (!user) {
            throw new Error(UserDoesNotExist);
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new Error(IncorrectPassword);
        }
        /***
         * create and return a jwt token
         */
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: '12h' }
        )
        return {message: "Login successful", token};
    }
    catch (err) {
        throw err;
    }
}