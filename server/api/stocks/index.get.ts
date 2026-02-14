import { defineEventHandler } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 12
    const search = query.search as string || ''

    // Calculaate range
    const from = (page - 1) * limit
    const to = from + limit - 1

    let queryBuilder = supabase
        .from('Stock')
        .select('*', { count: 'exact' })
        .order('createdAt', { ascending: false })
        .range(from, to)

    if (search) {
        queryBuilder = queryBuilder.or(`name.ilike.%${search}%,symbol.ilike.%${search}%`)
    }

    const { data: stocks, count, error } = await queryBuilder

    if (error) {
        throw createError({
            statusCode: 500,
            message: error.message
        })
    }

    return {
        data: stocks,
        count,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0
    }
})
