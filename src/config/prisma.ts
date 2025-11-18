import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

prisma.user
  .deleteMany()
  .then(() => {
    console.log("All users deleted");
  })
  .catch((error: any) => {
    console.error("Error deleting users:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
