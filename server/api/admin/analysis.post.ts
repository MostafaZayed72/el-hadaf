
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Basic validation
    if (!body.stockId) {
        throw createError({ statusCode: 400, statusMessage: 'Stock ID is required' })
    }

    const analysis = await prisma.analysis.create({
        data: {
            stockId: parseInt(body.stockId),
            currentPrice: parseFloat(body.currentPrice),
            target: parseFloat(body.target),
            stopLoss: parseFloat(body.stopLoss),
            technical: body.technical,
            financial: body.financial,
            behavioral: body.behavioral,
            support: body.support, // Expecting JSON string or ensuring it is one
            resistance: body.resistance,
            patterns: body.patterns,
            chartImageUrl: body.chartImageUrl
        }
    })
    return analysis
})
