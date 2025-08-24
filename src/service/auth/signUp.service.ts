import bcrypt from 'bcrypt';
import * as dto from '../../dto/auth/signUp.dto';
import * as repo from '../../repo/auth/signUp.repo';

export const signUpUser = async (data: dto.ManualSignUpRequestDTO): Promise<dto.ResponseMessageDTO> => {
    try {
        const existingUser = await repo.findUserByEmailOrMobile(data.email, data.mobileNumber);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await repo.createUser({ ...data, password: hashedPassword });

        return { message: 'User created successfully' };
    } catch (error) {
        throw error;
    }
};
