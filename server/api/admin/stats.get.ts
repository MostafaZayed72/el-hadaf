import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    // 1. Total Views
    const { count: totalViews, error: errorTotal } = await client
        .from('page_views')
        .select('*', { count: 'exact', head: true })

    if (errorTotal) {
        throw createError({ statusCode: 500, statusMessage: errorTotal.message })
    }

    // 2. Recent Visitors
    const { data: recentVisitors, error: errorRecent } = await client
        .from('page_views')
        .select('path, user_agent, created_at')
        .order('created_at', { ascending: false })
        .limit(20)

    if (errorRecent) {
        throw createError({ statusCode: 500, statusMessage: errorRecent.message })
    }

    // 3. Top Pages (Grouped)
    // Supabase JS client doesn't support "groupBy" easily without RPC or raw SQL.
    // For simplicity (and since data might not be huge yet), we can fetch all and group in JS,
    // OR use a specific RPC function.
    // BUT, to keep it simple and modification-free on DB side (no new functions),
    // let's try a different approach: fetch all path names and aggregate.
    // CAUTION: Fetching ALL rows is bad for performance.
    // ALTERNATIVE: Use `.rpc()` if we can create a function.
    // Since I cannot easily create SQL functions via migration tools right now without risk,
    // I will check if I can use a simple generic query or just simulate it for now.
    // Actually, I can use `.rpc` but I don't want to force user to run more SQL.
    // Let's try to fetch just the paths and count them in memory? No, that scales badly.
    // Let's look for a "most visited" approximation or just show the log for now.

    // Wait, I can use `select('path')` and maybe some client side processing if dataset is small.
    // Let's assume dataset is small for now (new feature).
    // Ideally, user should create a view or function.

    // Let's try to fetch last 1000 records and calculate top pages from them as a "Trending" metric.
    const { data: last1000 } = await client
        .from('page_views')
        .select('path')
        .order('created_at', { ascending: false })
        .limit(1000)

    const pageCounts: Record<string, number> = {}
    last1000?.forEach(row => {
        pageCounts[row.path] = (pageCounts[row.path] || 0) + 1
    })

    const topPages = Object.entries(pageCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

    // 4. Enrich with Stock Names
    const stockIds = new Set<string>()
    const extractStockId = (path: string) => {
        if (!path) return null
        const match = path.match(/[?&]stock=([^&]+)/)
        return match ? match[1] : null
    }

    // Collect IDs from top pages and recent visitors
    const allPaths = [...topPages.map(p => p.path), ...(recentVisitors || []).map(v => v.path)]
    allPaths.forEach(path => {
        const id = extractStockId(path)
        if (id) stockIds.add(id)
    })

    const stockMap = new Map<string, string>()
    if (stockIds.size > 0) {
        const { data: stocks } = await client
            .from('Stock')
            .select('id, name')
            .in('id', Array.from(stockIds))

        stocks?.forEach(s => stockMap.set(s.id, s.name))
    }

    const enrichPath = (path: string) => {
        const id = extractStockId(path)
        if (id && stockMap.has(id)) {
            return {
                label: stockMap.get(id)!,
                url: path,
                isStock: true
            }
        }
        return {
            label: path,
            url: path,
            isStock: false
        }
    }

    return {
        totalViews: totalViews || 0,
        recentVisitors: (recentVisitors || []).map(v => ({
            ...v,
            ...enrichPath(v.path)
        })),
        topPages: topPages.map(p => ({
            ...p,
            ...enrichPath(p.path)
        }))
    }
})
