
import prisma from '~/server/lib/prisma'

export default defineEventHandler(async (event) => {
    const stocks = await prisma.stock.findMany({
        include: {
            analyses: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        }
    })
    return stocks
})
