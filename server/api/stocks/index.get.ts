import { defineEventHandler } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async () => {
    const { data: stocks, error } = await supabase
        .from('Stock')
        .select('*')
        .order('createdAt', { ascending: false })

    if (error) {
        throw createError({
            statusCode: 500,
            message: error.message
        })
    }

    return stocks
})
