
<template>
  <div class="analysis-page container">
    <header class="page-header">
      <h2>تحليل الأسهم</h2>
      <div class="controls">
        <label for="stock-select">اختر السهم:</label>
        <select id="stock-select" v-model="selectedStockId" @change="fetchAnalysis" class="stock-select">
          <option value="" disabled>-- اختر من القائمة --</option>
          <option v-for="stock in stocks" :key="stock.id" :value="stock.id">
            {{ stock.name }} ({{ stock.symbol }})
          </option>
        </select>
      </div>
    </header>

    <div v-if="loading" class="loading">جاري التحميل...</div>
    
    <div v-else-if="analysis" class="analysis-content">
      <!-- Top Summary Cards -->
      <div class="summary-grid">
        <div class="card price-card">
          <h3>السعر الحالي</h3>
          <div class="value">{{ analysis.currentPrice }}</div>
        </div>
        <div class="card target-card">
          <h3>الهدف (Target)</h3>
          <div class="value text-bull">{{ analysis.target }}</div>
        </div>
        <div class="card stop-card">
          <h3>وقف الخسارة</h3>
          <div class="value text-bear">{{ analysis.stopLoss }}</div>
        </div>
      </div>

      <!-- Analysis Text Grid -->
      <div class="text-grid mt-4">
        <div class="card">
          <h3>التحليل الفني</h3>
          <p>{{ analysis.technical }}</p>
        </div>
        <div class="card">
          <h3>التحليل المالي</h3>
          <p>{{ analysis.financial }}</p>
        </div>
        <div class="card">
          <h3>التحليل السلوكي</h3>
          <p>{{ analysis.behavioral }}</p>
        </div>
      </div>

      <!-- Support & Resistance -->
      <div class="levels-grid mt-4">
        <div class="card">
          <h3>الدعوم (Supports)</h3>
          <div class="tags">
            <span v-for="(val, idx) in parsedSupport" :key="idx" class="tag support-tag">{{ val }}</span>
          </div>
        </div>
        <div class="card">
          <h3>المقاومات (Resistances)</h3>
          <div class="tags">
            <span v-for="(val, idx) in parsedResistance" :key="idx" class="tag resistance-tag">{{ val }}</span>
          </div>
        </div>
        <div class="card">
          <h3>النماذج الفنية</h3>
          <p class="pattern-text">{{ analysis.patterns }}</p>
        </div>
      </div>

      <!-- Chart -->
      <div class="card mt-4 chart-container" v-if="analysis.chartImageUrl">
        <h3>الرسم البياني</h3>
        <div>
          <img :src="analysis.chartImageUrl" alt="Technical Chart" class="chart-image" />
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>يرجى اختيار سهم لعرض التحليل.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const stocks = ref([])
const selectedStockId = ref('')
const analysis = ref(null)
const loading = ref(false)

// Fetch stocks for dropdown
const { data: stocksData } = await useFetch('/api/stocks')
if (stocksData.value) {
  stocks.value = stocksData.value
}

// Fetch analysis for selected stock
async function fetchAnalysis() {
  if (!selectedStockId.value) return
  
  loading.value = true
  try {
    const { data } = await useFetch(`/api/analysis/${selectedStockId.value}`)
    if (data.value && data.value.analyses.length > 0) {
      analysis.value = data.value.analyses[0]
      // Add stock info to analysis object for convenience if needed
      analysis.value.stockName = data.value.name
    } else {
      analysis.value = null
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
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
.analysis-page { padding-top: 2rem; padding-bottom: 4rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.stock-select { padding: 0.5rem; font-size: 1rem; border-radius: 4px; border: 1px solid var(--primary); background: #333; color: #fff; width: 250px; }

.summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.price-card .value { font-size: 2rem; font-weight: bold; color: var(--primary); }
.target-card .value, .stop-card .value { font-size: 2rem; font-weight: bold; }

.text-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
.levels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }

.tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.tag { padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: bold; }
.support-tag { background: rgba(46, 204, 113, 0.2); color: var(--bull-green); border: 1px solid var(--bull-green); }
.resistance-tag { background: rgba(231, 76, 60, 0.2); color: var(--bear-red); border: 1px solid var(--bear-red); }

.chart-container { min-height: 400px; position: relative; }
.chart-container.auto-height { height: auto; min-height: auto; }
.chart-image { width: 100%; height: auto; border-radius: 8px; border: 1px solid #444; }
.no-chart { text-align: center; padding: 2rem; color: #888; }
</style>
