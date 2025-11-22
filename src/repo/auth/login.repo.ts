

import { prisma } from "../../config/prisma";

export const checkIfUserExist = async (email: string) => {
    try {
        if (!email) return null;
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (err) {
        throw err;
    }
};
