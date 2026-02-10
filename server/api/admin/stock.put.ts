


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.id) {
        throw createError({ statusCode: 400, statusMessage: 'Stock ID is required' })
    }

    const stock = await prisma.stock.update({
        where: { id: parseInt(body.id) },
        data: {
            name: body.name,
            symbol: body.symbol,
            logoUrl: body.logoUrl
        }
    })

    return stock
})
