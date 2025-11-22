import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
// Cast to `any` here to avoid TypeScript complaints about missing model properties
// while the generated client is outside `rootDir` or not fully typed. Replace
// this cast by regenerating Prisma client inside `src` (see todo) for a
// proper typed client.
const prisma = new PrismaClient({ adapter }) as any

export { prisma }