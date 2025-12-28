import bcrypt from "bcrypt";
import * as dto from "../../dto/auth/signUp.dto";
import * as repo from "../../repo/auth/signUp.repo";

export const signUpUser = async (
  data: dto.SignUpRequestDTO
): Promise<dto.ResponseMessageDTO> => {
  try {
    const updatedEmail = data.email.toLowerCase();
    const existingUser = await repo.checkIfUserIsUnique(updatedEmail, data.userName);
    if (existingUser) {
      throw new Error("Email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await repo.createUser({ ...data, email: updatedEmail, password: hashedPassword });

    return { message: "User created successfully" };
  } catch (error) {
    throw error;
  }
};
