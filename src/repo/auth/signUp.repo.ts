import * as dto from "../../dto/auth/signUp.dto";
import { prisma } from "../../config/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const createUser = async (data: dto.ManualSignUpRequestDTO) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        signUpType: data.signUpType,
        email: data.email,
        password: data.password,
        userName: data.userName,
      },
    });
    return newUser;
  } finally {
    await prisma.$disconnect();
  }
};
