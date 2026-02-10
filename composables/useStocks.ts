// Types
interface Stock {
    id: string
    name: string
    symbol: string
    logoUrl?: string
}

interface StockAnalysis {
    id: string
    stockId: string
    stockName: string
    stockLogo?: string
    currentPrice: number | null
    target: number | null
    stopLoss: number | null
    technical: string | null
    financial: string | null
    behavioral: string | null
    support: string | null
    resistance: string | null
    patterns: string | null
    chartImageUrl: string | null
}

export const useStocks = () => {
    const stocks = useState<Stock[]>('stocks', () => [])
    const analysisData = useState<Record<string, StockAnalysis>>('analysisData', () => ({}))
    const isLoading = useState('stocksLoading', () => false)

    // Fetch all stocks from API
    const getStocks = async () => {
        isLoading.value = true
        try {
            const { data } = await useFetch('/api/stocks')
            if (data.value) {
                stocks.value = data.value
            }
        } catch (error) {
            console.error('Failed to fetch stocks:', error)
        } finally {
            isLoading.value = false
        }
        return stocks.value
    }

    // Fetch analysis for a specific stock
    const getAnalysis = async (stockId: string) => {
        if (!stockId) return null

        // Return cached data if available (optional optimization)
        // if (analysisData.value[stockId]) return analysisData.value[stockId]

        try {
            const { data } = await useFetch(`/api/analysis/${stockId}`)
            if (data.value) {
                analysisData.value[stockId] = data.value
                return data.value
            }
        } catch (error) {
            console.error(`Failed to fetch analysis for stock ${stockId}:`, error)
        }
        return null
    }

    // Add new stock
    const addStock = async (stock: Omit<Stock, 'id'>) => {
        try {
            const { data } = await useFetch('/api/stocks', {
                method: 'POST',
                body: stock
            })
            if (data.value) {
                stocks.value.unshift(data.value)
                return data.value
            }
        } catch (error) {
            console.error('Failed to add stock:', error)
            throw error
        }
    }

    // Update existing stock
    const updateStock = async (id: string, data: Partial<Stock>) => {
        try {
            const { data: updated } = await useFetch(`/api/stocks/${id}`, {
                method: 'PUT',
                body: data
            })

            if (updated.value) {
                const index = stocks.value.findIndex(s => s.id === id)
                if (index !== -1) {
                    stocks.value[index] = updated.value
                }
                return updated.value
            }
        } catch (error) {
            console.error('Failed to update stock:', error)
            throw error
        }
    }

    // Delete stock
    const deleteStock = async (id: string) => {
        try {
            await useFetch(`/api/stocks/${id}`, {
                method: 'DELETE'
            })
            stocks.value = stocks.value.filter(s => s.id !== id)
            delete analysisData.value[id]
        } catch (error) {
            console.error('Failed to delete stock:', error)
            throw error
        }
    }

    // Save/Update analysis
    const saveAnalysis = async (stockId: string, analysis: any) => {
        try {
            const { data } = await useFetch(`/api/analysis/${stockId}`, {
                method: 'POST',
                body: analysis
            })

            if (data.value) {
                analysisData.value[stockId] = data.value
                return data.value
            }
        } catch (error) {
            console.error('Failed to save analysis:', error)
            throw error
        }
    }

    return {
        stocks,
        isLoading,
        getStocks,
        getAnalysis,
        addStock,
        updateStock,
        deleteStock,
        saveAnalysis
    }
}
