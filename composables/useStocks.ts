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
    currentPrice: number
    target: number
    stopLoss: number
    technical: string
    financial: string
    behavioral: string
    support: string
    resistance: string
    patterns: string
    chartImageUrl?: string
}

const STOCKS_KEY = 'stocks_data'
const ANALYSIS_KEY = 'analysis_data'

export const useStocks = () => {
    const stocks = useState<Stock[]>('stocks', () => [])
    const analysisData = useState<Record<string, StockAnalysis>>('analysisData', () => ({}))

    // Load from localStorage on client
    if (process.client) {
        const storedStocks = localStorage.getItem(STOCKS_KEY)
        const storedAnalysis = localStorage.getItem(ANALYSIS_KEY)

        if (storedStocks) {
            try {
                stocks.value = JSON.parse(storedStocks)
            } catch (e) {
                console.error('Failed to parse stocks:', e)
            }
        } else {
            // Initialize with sample data
            stocks.value = [
                { id: '1', name: 'بنك بوبيان', symbol: 'BOUBYAN', logoUrl: '' },
                { id: '2', name: 'الوطني', symbol: 'NBK', logoUrl: '' }
            ]
            localStorage.setItem(STOCKS_KEY, JSON.stringify(stocks.value))
        }

        if (storedAnalysis) {
            try {
                analysisData.value = JSON.parse(storedAnalysis)
            } catch (e) {
                console.error('Failed to parse analysis:', e)
            }
        } else {
            // Initialize with sample analysis
            analysisData.value = {
                '1': {
                    id: '1',
                    stockId: '1',
                    stockName: 'بنك بوبيان',
                    stockLogo: '',
                    currentPrice: 0.605,
                    target: 0.650,
                    stopLoss: 0.580,
                    technical: 'السهم في اتجاه صاعد ويستهدف مستوى 650 فلس بعد اختراق المقاومة 600.',
                    financial: 'أرباح الربع الثالث ممتازة وتدعم الصعود.',
                    behavioral: 'تجميع واضح من المحافظ الكبرى.',
                    support: '[600, 590, 580]',
                    resistance: '[620, 635, 650]',
                    patterns: 'مثلث صاعد',
                    chartImageUrl: ''
                }
            }
            localStorage.setItem(ANALYSIS_KEY, JSON.stringify(analysisData.value))
        }
    }

    const saveToStorage = () => {
        if (process.client) {
            localStorage.setItem(STOCKS_KEY, JSON.stringify(stocks.value))
            localStorage.setItem(ANALYSIS_KEY, JSON.stringify(analysisData.value))
        }
    }

    const getStocks = () => stocks.value

    const getAnalysis = (stockId: string) => analysisData.value[stockId] || null

    const addStock = (stock: Omit<Stock, 'id'>) => {
        const newId = Date.now().toString()
        const newStock: Stock = { ...stock, id: newId }
        stocks.value.push(newStock)
        saveToStorage()
        return newStock
    }

    const updateStock = (id: string, data: Partial<Stock>) => {
        const index = stocks.value.findIndex(s => s.id === id)
        if (index !== -1) {
            stocks.value[index] = { ...stocks.value[index], ...data }
            saveToStorage()
            return stocks.value[index]
        }
        return null
    }

    const deleteStock = (id: string) => {
        stocks.value = stocks.value.filter(s => s.id !== id)
        delete analysisData.value[id]
        saveToStorage()
    }

    const saveAnalysis = (stockId: string, analysis: Omit<StockAnalysis, 'id' | 'stockId'>) => {
        const stock = stocks.value.find(s => s.id === stockId)
        if (!stock) return null

        analysisData.value[stockId] = {
            ...analysis,
            id: stockId,
            stockId: stockId,
            stockName: stock.name,
            stockLogo: stock.logoUrl || ''
        }
        saveToStorage()
        return analysisData.value[stockId]
    }

    return {
        stocks: readonly(stocks),
        getStocks,
        getAnalysis,
        addStock,
        updateStock,
        deleteStock,
        saveAnalysis
    }
}
