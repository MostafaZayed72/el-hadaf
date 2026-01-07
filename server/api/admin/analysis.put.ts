
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.id) {
        throw createError({ statusCode: 400, statusMessage: 'Analysis ID is required' })
    }

    const analysis = await prisma.analysis.update({
        where: { id: parseInt(body.id) },
        data: {
            currentPrice: parseFloat(body.currentPrice),
            target: parseFloat(body.target),
            stopLoss: parseFloat(body.stopLoss),
            technical: body.technical,
            financial: body.financial,
            behavioral: body.behavioral,
            support: body.support,
            resistance: body.resistance,
            patterns: body.patterns,
            chartImageUrl: body.chartImageUrl
        }
    })
    return analysis
})
