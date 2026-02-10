import { defineEventHandler, readBody, createError } from 'h3'
import supabase from '../../utils/supabase'

export default defineEventHandler(async (event) => {
    const stockId = event.context.params?.stockId
    const body = await readBody(event)

    if (!stockId) {
        throw createError({ statusCode: 400, message: 'Stock ID is required' })
    }

    const analysisData = {
        stockId,
        currentPrice: body.currentPrice || null,
        target: body.target || null,
        stopLoss: body.stopLoss || null,
        technical: body.technical || null,
        financial: body.financial || null,
        behavioral: body.behavioral || null,
        support: body.support || null,
        resistance: body.resistance || null,
        patterns: body.patterns || null,
        chartImageUrl: body.chartImageUrl || null,
        updatedAt: new Date().toISOString()
    }

    // Try to update existing record first
    const { data: existing, error: fetchError } = await supabase
        .from('Analysis')
        .select('id')
        .eq('stockId', stockId)
        .maybeSingle()

    let result, error

    if (existing) {
        // Update
        ({ data: result, error } = await supabase
            .from('Analysis')
            .update(analysisData)
            .eq('stockId', stockId)
            .select()
            .single())
    } else {
        // Insert
        ({ data: result, error } = await supabase
            .from('Analysis')
            .insert(analysisData)
            .select()
            .single())
    }

    if (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to save analysis: ' + error.message
        })
    }

    return result
})
