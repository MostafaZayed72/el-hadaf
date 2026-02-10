import { defineEventHandler, createError } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (!id) {
        throw createError({ statusCode: 400, message: 'Stock ID is required' })
    }

    const { data: stock, error } = await supabase
        .from('Stock')
        .delete()
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to delete stock: ' + error.message
        })
    }

    return stock
})
