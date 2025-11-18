import { UserModel } from "../../model/user/user.model";
import * as dto from "../../dto/auth/signUp.dto";
import { PrismaClient } from "../../generated/prisma/client";

export const createUsers = async (data: dto.ManualSignUpRequestDTO) => {
  return await UserModel.create(data);
};

export const findUserByEmails = async (email: string) => {
  if (email) {
    return await UserModel.findOne({ email }).exec();
  }

  return null;
};


export const findUserByEmail = (email: string) => {
  const prisma = new PrismaClient();

  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
 

export const createUser = async (data: dto.ManualSignUpRequestDTO) => {
  const prisma = new PrismaClient();

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