import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await serverSupabaseClient(event)

    const { path, userAgent } = body

    try {
        await client.from('page_views').insert({
            path,
            user_agent: userAgent,
            created_at: new Date().toISOString(),
        })
    } catch (error) {
        // Ignore errors to not block the user (e.g. table missing)
        console.error('Tracking error:', error)
    }

    return { success: true }
})
