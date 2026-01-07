
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Kuwaiti Stocks
    const stocks = [
        { name: 'National Bank of Kuwait', symbol: 'NBK', logoUrl: 'https://companieslogo.com/img/orig/NBK.KW-e565f49e.png' },
        { name: 'Kuwait Finance House', symbol: 'KFH', logoUrl: 'https://companieslogo.com/img/orig/KFH.KW-6c0b328a.png' },
        { name: 'Zain', symbol: 'ZAIN', logoUrl: 'https://companieslogo.com/img/orig/ZAIN.KW-1e967c3b.png' },
        { name: 'Agility', symbol: 'AGLTY', logoUrl: 'https://companieslogo.com/img/orig/AGLTY.KW-8a7e3d9c.png' }
    ]

    for (const s of stocks) {
        const stock = await prisma.stock.upsert({
            where: { symbol: s.symbol },
            update: {},
            create: s,
        })

        // Add dummy analysis
        await prisma.analysis.create({
            data: {
                stockId: stock.id,
                currentPrice: 950,
                target: 1050,
                stopLoss: 890,
                technical: 'السهم في اتجاه صاعد قوي مدعوماً بمتوسطات متحركة إيجابية.',
                financial: 'الأرباح التشغيلية نمت بنسبة 15% مقارنة بالعام الماضي.',
                behavioral: 'تجميع واضح من المحافظ الكبيرة عند مستويات 940.',
                support: JSON.stringify([940, 920, 900]),
                resistance: JSON.stringify([980, 1000, 1050]),
                patterns: 'الكوب والعروة (Cup and Handle)',
                chartData: JSON.stringify({
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Price',
                        data: [900, 920, 910, 950, 980, 950],
                        borderColor: '#C5A038',
                        tension: 0.1
                    }]
                })
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
