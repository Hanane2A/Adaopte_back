import { PrismaClient } from '@prisma/client'

const adopterRouter = require('./routes/adopter');

const prisma = new PrismaClient()

export async function GET() {
    const adopters = await prisma.adopter.findMany()
    return Response.json(adopters)
}