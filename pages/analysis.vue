<template>
  <div class="min-h-screen py-8 relative overflow-hidden">
    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 class="text-3xl font-bold border-r-4 border-primary pr-4 text-page-text">تحليل الأسهم</h2>
        <div class="w-full md:w-auto md:min-w-[300px]">
          <label class="block text-text-secondary text-sm mb-2">اختر السهم:</label>
          <SearchableSelect
            v-model="selectedStockId"
            :options="stocksList"
            placeholder="ابحث عن سهم..."
            @change="handleStockChange"
          />
        </div>
      </header>

      <div v-if="loading" class="text-center py-20 text-text-secondary animate-pulse">جاري التحميل...</div>
      
      <div v-else-if="analysis" class="space-y-6 animate-fade-in">
        <!-- Stock Header with Logo -->
        <div class="flex items-center gap-4 mb-6 border-b border-border-color pb-4">
          <div class="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden" v-if="analysis.stockLogo">
              <img :src="analysis.stockLogo" :alt="analysis.stockName" class="w-full h-full object-contain" />
          </div>
          <div>
              <h3 class="text-2xl font-bold text-page-text">{{ analysis.stockName }}</h3>
              <p class="text-sm text-text-secondary" v-if="analysis.stockId">{{ analysis.stockId }}</p>
          </div>
        </div>

        <!-- Top Summary Cards - Only show if values exist -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-if="analysis.currentPrice" class="card flex flex-col items-center justify-center py-6 border-t-4 border-gray-500">
            <h3 class="text-text-secondary text-sm mb-2">السعر الحالي</h3>
            <div class="text-4xl font-mono font-bold text-page-text">{{ analysis.currentPrice }}</div>
          </div>
          <div v-if="analysis.target" class="card flex flex-col items-center justify-center py-6 border-t-4 border-bull">
            <h3 class="text-text-secondary text-sm mb-2">الهدف (Target)</h3>
            <div class="text-4xl font-mono font-bold text-bull">{{ analysis.target }}</div>
          </div>
          <div v-if="analysis.stopLoss" class="card flex flex-col items-center justify-center py-6 border-t-4 border-bear">
            <h3 class="text-text-secondary text-sm mb-2">وقف الخسارة</h3>
            <div class="text-4xl font-mono font-bold text-bear">{{ analysis.stopLoss }}</div>
          </div>
        </div>

        <!-- Analysis Text Grid - Only show non-empty sections -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-if="analysis.technical" class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل الفني</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.technical }}</p>
          </div>
          <div v-if="analysis.financial" class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل المالي</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.financial }}</p>
          </div>
          <div v-if="analysis.behavioral" class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل السلوكي</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.behavioral }}</p>
          </div>
        </div>

        <!-- Support and Resistance -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="supportLevels.length || resistanceLevels.length">
          <div class="card" v-if="supportLevels.length">
            <h3 class="font-bold text-bull mb-3 border-b border-border-color pb-2">مستويات الدعم</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="level in supportLevels" :key="level" class="px-3 py-1 bg-bull/20 text-bull rounded-full text-sm font-mono">
                {{ level }}
              </span>
            </div>
          </div>
          <div class="card" v-if="resistanceLevels.length">
            <h3 class="font-bold text-bear mb-3 border-b border-border-color pb-2">مستويات المقاومة</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="level in resistanceLevels" :key="level" class="px-3 py-1 bg-bear/20 text-bear rounded-full text-sm font-mono">
                {{ level }}
              </span>
            </div>
          </div>
        </div>

        <!-- Patterns - Only show if exists -->
        <div class="card" v-if="analysis.patterns">
          <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">النماذج الفنية</h3>
          <p class="text-text-secondary">{{ analysis.patterns }}</p>
        </div>

        <!-- Chart Image - Only show if exists -->
        <div class="card" v-if="analysis.chartImageUrl">
          <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">الشارت</h3>
          <div class="overflow-hidden rounded-lg">
            <img :src="analysis.chartImageUrl" alt="Chart" class="w-full h-auto" />
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 text-text-secondary">
        <div class="text-6xl mb-4">🔍</div>
        <p>يرجى اختيار تحليل السهم</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const { stocks, getStocks, getAnalysis } = useStocks()

// State
const selectedStockId = ref('')
const analysis = ref(null)
const loading = ref(false)

// Computed
const stocksList = computed(() => stocks.value)
const selectedStock = computed(() => {
  return stocks.value.find(s => s.id === selectedStockId.value)
})

// Lifecycle
onMounted(async () => {
  await getStocks()
  
  // Check URL query for shared stock
  const stockId = route.query.stock as string
  if (stockId) {
    selectedStockId.value = stockId
    await fetchAnalysis()
  }
})

// Methods
async function handleStockChange() {
  router.push({ query: { stock: selectedStockId.value } })
  await fetchAnalysis()
}

async function fetchAnalysis() {
  if (!selectedStockId.value) return
  
  loading.value = true
  try {
    const data = await getAnalysis(selectedStockId.value)
    
    if (data) {
        // Parse JSON strings for support/resistance if they come as strings
        let support = data.support
        let resistance = data.resistance

        try {
            if (typeof support === 'string' && support.startsWith('[')) {
                support = JSON.parse(support)
            }
        } catch (e) {
            console.error('Error parsing support', e)
        }

        try {
            if (typeof resistance === 'string' && resistance.startsWith('[')) {
                resistance = JSON.parse(resistance)
            }
        } catch (e) {
             console.error('Error parsing resistance', e)
        }

        analysis.value = {
            ...data,
            support,
            resistance
        }
    } else {
        analysis.value = null
    }
  } catch (e) {
    console.error('Error fetching analysis:', e)
  } finally {
    loading.value = false
  }
}


// Watch for URL changes (browser back/forward)
watch(() => route.query.stock, (newStock) => {
  if (newStock && newStock !== selectedStockId.value) {
    selectedStockId.value = newStock as string
    fetchAnalysis()
  }
})
</script>
