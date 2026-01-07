
import prisma from '~/server/lib/prisma'

export default defineEventHandler(async (event) => {
    const stockId = getRouterParam(event, 'stockId')

    if (!stockId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Stock ID is required',
        })
    }

    const stock = await prisma.stock.findUnique({
        where: { id: parseInt(stockId) },
        include: {
            analyses: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        }
    })

    if (!stock) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Stock not found',
        })
    }

    return stock
})
