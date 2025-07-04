import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function GET() {
    const adopters = await prisma.adopter.findMany()
    return Response.json(adopters)
}