import { defineEventHandler, createError } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const stockId = event.context.params?.stockId

    if (!stockId) {
        throw createError({ statusCode: 400, message: 'Stock ID is required' })
    }

    // Fetch analysis and include stock data
    const { data: analysis, error } = await supabase
        .from('Analysis')
        .select('*, Stock:stockId (name, logoUrl)')
        .eq('stockId', stockId)
        .maybeSingle()

    if (error) {
        // Return null instead of error to not break the UI
        return null
    }

    if (!analysis) {
        return null
    }

    // Flatten the response to match frontend expectations
    return {
        ...analysis,
        stockName: analysis.Stock.name,
        stockLogo: analysis.Stock.logoUrl
    }
})
