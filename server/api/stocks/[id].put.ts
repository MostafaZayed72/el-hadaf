import { defineEventHandler, readBody, createError } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const body = await readBody(event)

    if (!id) {
        throw createError({ statusCode: 400, message: 'Stock ID is required' })
    }

    const { data: stock, error } = await supabase
        .from('Stock')
        .update({
            name: body.name,
            symbol: body.symbol,
            logoUrl: body.logoUrl,
            updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to update stock: ' + error.message
        })
    }

    return stock
})
