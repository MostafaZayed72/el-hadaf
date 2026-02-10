import { defineEventHandler, readBody, createError } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { data: stock, error } = await supabase
        .from('Stock')
        .insert({
            name: body.name,
            symbol: body.symbol,
            logoUrl: body.logoUrl
        })
        .select()
        .single()

    if (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to create stock: ' + error.message
        })
    }

    return stock
})
