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
            @change="fetchAnalysis"
          />
        </div>
      </header>

      <div v-if="loading" class="text-center py-20 text-text-secondary animate-pulse">جاري التحميل...</div>
      
      <div v-else-if="analysis" class="space-y-6 animate-fade-in">
        <div class="flex items-center gap-4 mb-6 border-b border-border-color pb-4">
          <div class="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden" v-if="analysis.stockLogo">
              <img :src="analysis.stockLogo" :alt="analysis.stockName" class="w-full h-full object-contain" />
          </div>
          <div>
              <h3 class="text-2xl font-bold text-page-text">{{ analysis.stockName }}</h3>
              <p class="text-sm text-text-secondary">{{ analysis.stockId }}</p>
          </div>
        </div>

        <!-- Top Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-gray-500">
            <h3 class="text-text-secondary text-sm mb-2">السعر الحالي</h3>
            <div class="text-4xl font-mono font-bold text-page-text">{{ analysis.currentPrice }}</div>
          </div>
          <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-bull">
            <h3 class="text-text-secondary text-sm mb-2">الهدف (Target)</h3>
            <div class="text-4xl font-mono font-bold text-bull">{{ analysis.target }}</div>
          </div>
          <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-bear">
            <h3 class="text-text-secondary text-sm mb-2">وقف الخسارة</h3>
            <div class="text-4xl font-mono font-bold text-bear">{{ analysis.stopLoss }}</div>
          </div>
        </div>

        <!-- Analysis Text Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل الفني</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.technical }}</p>
          </div>
          <div class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل المالي</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.financial }}</p>
          </div>
          <div class="card">
            <h3 class="font-bold text-primary mb-3 border-b border-border-color pb-2">التحليل السلوكي</h3>
            <p class="text-text-secondary leading-relaxed text-sm">{{ analysis.behavioral }}</p>
          </div>
        </div>

        <!-- Support & Resistance -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="font-bold text-page-text mb-4">الدعوم (Supports)</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="(val, idx) in parsedSupport" :key="idx" class="px-3 py-1 rounded-full bg-bull/10 text-bull border border-bull/30 font-mono text-sm font-bold">{{ val }}</span>
            </div>
          </div>
          <div class="card">
            <h3 class="font-bold text-page-text mb-4">المقاومات (Resistances)</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="(val, idx) in parsedResistance" :key="idx" class="px-3 py-1 rounded-full bg-bear/10 text-bear border border-bear/30 font-mono text-sm font-bold">{{ val }}</span>
            </div>
          </div>
          <div class="card">
            <h3 class="font-bold text-page-text mb-4">النماذج الفنية</h3>
            <p class="text-sm text-text-secondary">{{ analysis.patterns }}</p>
          </div>
        </div>

        <!-- Chart -->
        <div class="card" v-if="analysis.chartImageUrl">
          <h3 class="font-bold text-page-text mb-4">الرسم البياني</h3>
          <div class="rounded-lg overflow-hidden border border-border-color">
            <img :src="analysis.chartImageUrl" alt="Technical Chart" class="w-full h-auto" />
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 text-text-secondary card">
        <div class="text-4xl mb-4">🔍</div>
        <p>يرجى اختيار سهم لعرض التحليل.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getStocks, getAnalysis } = useStocks()

const stocksList = computed(() => getStocks())
const selectedStockId = ref('')
const analysis = ref(null)
const loading = ref(false)

async function fetchAnalysis() {
  if (!selectedStockId.value) return
  loading.value = true
  
 setTimeout(() => {
     analysis.value = getAnalysis(selectedStockId.value)
      loading.value = false
  }, 300)
}

// Parsed Data
const parsedSupport = computed(() => {
  try { return JSON.parse(analysis.value?.support || '[]') } catch { return [] }
})

const parsedResistance = computed(() => {
  try { return JSON.parse(analysis.value?.resistance || '[]') } catch { return [] }
})
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
