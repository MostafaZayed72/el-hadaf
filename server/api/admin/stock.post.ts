


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name) {
        throw createError({ statusCode: 400, statusMessage: 'Name is required' })
    }

    // Check if symbol exists (only if provided)
    if (body.symbol) {
        const existing = await prisma.stock.findUnique({
            where: { symbol: body.symbol }
        })

        if (existing) {
            throw createError({ statusCode: 409, statusMessage: 'Stock symbol already exists' })
        }
    }

    const stock = await prisma.stock.create({
        data: {
            name: body.name,
            symbol: body.symbol || null,
            logoUrl: body.logoUrl || null
        }
    })

    // Initialize empty analysis for it
    await prisma.analysis.create({
        data: {
            stockId: stock.id,
            currentPrice: 0,
            target: 0,
            stopLoss: 0
        }
    })

    return stock
})
