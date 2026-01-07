<template>
  <div class="analysis-page container">
    <header class="page-header">
      <h2>تحليل الأسهم</h2>
      <div class="controls">
        <button v-if="isAdmin" @click="openModal()" class="btn btn-icon" title="إضافة سهم جديد">+</button>
        <div class="select-wrapper">
          <label for="stock-select">اختر السهم:</label>
          <select id="stock-select" v-model="selectedStockId" @change="fetchAnalysis" class="stock-select">
            <option value="" disabled>-- اختر من القائمة --</option>
            <option v-for="stock in stocks" :key="stock.id" :value="stock.id">
              {{ stock.name }} ({{ stock.symbol }})
            </option>
          </select>
        </div>
      </div>
    </header>

    <div v-if="loading" class="loading">جاري التحميل...</div>
    
    <div v-else-if="analysis" class="analysis-content">
      <div class="stock-header" v-if="analysis.stockLogo">
        <img :src="analysis.stockLogo" class="analysis-stock-logo" />
        <div class="flex items-center gap-2">
            <h3>{{ analysis.stockName }}</h3>
            <button v-if="isAdmin" @click="openModal(getCurrentStock())" class="btn btn-sm btn-secondary text-xs">تعديل</button>
        </div>
      </div>
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
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal card">
        <h3>{{ isEditing ? 'تعديل بيانات السهم والتحليل' : 'إضافة سهم جديد' }}</h3>
        
        <div class="modal-body">
            <!-- Stock Info -->
            <h4 class="section-title">بيانات السهم</h4>
            <div class="form-row">
                <div class="form-group half">
                <label>اسم السهم</label>
                <input v-model="form.name" placeholder="مثال: بنك بوبيان">
                </div>
                <div class="form-group half">
                <label>الرمز (Symbol)</label>
                <input v-model="form.symbol" placeholder="مثال: BOUBYAN">
                </div>
            </div>
            <div class="form-group">
                <label>رابط الشعار</label>
                <input v-model="form.logoUrl" placeholder="https://...">
            </div>

            <hr class="divider" />

            <!-- Analysis Info -->
            <h4 class="section-title">بيانات التحليل</h4>
            <div class="form-row">
                <div class="form-group third">
                    <label>السعر الحالي</label>
                    <input v-model="form.currentPrice" type="number" step="0.001">
                </div>
                <div class="form-group third">
                    <label>الهدف</label>
                    <input v-model="form.target" type="number" step="0.001">
                </div>
                <div class="form-group third">
                    <label>وقف الخسارة</label>
                    <input v-model="form.stopLoss" type="number" step="0.001">
                </div>
            </div>

            <div class="form-group">
                <label>التحليل الفني</label>
                <textarea v-model="form.technical" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>التحليل المالي</label>
                <textarea v-model="form.financial" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>التحليل السلوكي</label>
                <textarea v-model="form.behavioral" rows="3"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group half">
                    <label>الدعوم (فاصلة بين كل رقم)</label>
                    <input v-model="form.support" placeholder="مثال: 100, 98, 95">
                </div>
                <div class="form-group half">
                    <label>المقاومات (فاصلة بين كل رقم)</label>
                    <input v-model="form.resistance" placeholder="مثال: 105, 110, 115">
                </div>
            </div>

            <div class="form-group">
                <label>النماذج الفنية</label>
                <textarea v-model="form.patterns" rows="2"></textarea>
            </div>
            
            <div class="form-group">
                <label>رابط الرسم البياني (Chart Image URL)</label>
                <input v-model="form.chartImageUrl" placeholder="https://...">
            </div>
        </div>

        <div class="modal-actions">
          <button @click="saveStock" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'جاري الحفظ...' : 'حفظ الكل' }}
          </button>
          <button @click="showModal = false" class="btn btn-outline">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { isAdmin } = useAuth()
const stocks = ref([])
const selectedStockId = ref('')
const analysis = ref(null)
const loading = ref(false)

// Modal State
const showModal = ref(false)
const saving = ref(false)
const form = ref({ 
    id: null, name: '', symbol: '', logoUrl: '',
    analysisId: null,
    currentPrice: '', target: '', stopLoss: '',
    technical: '', financial: '', behavioral: '',
    support: '', resistance: '', patterns: '',
    chartImageUrl: ''
})

const isEditing = computed(() => !!form.value.id)

function getCurrentStock() {
    return stocks.value.find(s => s.id === selectedStockId.value)
}

// Fetch stocks for dropdown
async function fetchStocks() {
  const { data } = await useFetch('/api/stocks')
  if (data.value) {
    stocks.value = data.value
  }
}
await fetchStocks()

function openModal(stock = null) {
  if (stock) {
      // Basic stock info
      form.value = { 
          id: stock.id, 
          name: stock.name, 
          symbol: stock.symbol, 
          logoUrl: stock.logoUrl,
           // Default empty analysis
          analysisId: null,
          currentPrice: '', target: '', stopLoss: '',
          technical: '', financial: '', behavioral: '',
          support: '', resistance: '', patterns: '',
          chartImageUrl: ''
      }

      // If we are editing the CURRENTLY viewed stock, populate analysis data
      if (selectedStockId.value === stock.id && analysis.value) {
          const a = analysis.value
          form.value.analysisId = a.id
          form.value.currentPrice = a.currentPrice
          form.value.target = a.target
          form.value.stopLoss = a.stopLoss
          form.value.technical = a.technical
          form.value.financial = a.financial
          form.value.behavioral = a.behavioral
          form.value.patterns = a.patterns
          form.value.chartImageUrl = a.chartImageUrl
          
          // Parse JSON support/resistance to comma string
          try {
              const s = JSON.parse(a.support || '[]')
              form.value.support = Array.isArray(s) ? s.join(', ') : s
          } catch { form.value.support = a.support || '' }

          try {
              const r = JSON.parse(a.resistance || '[]')
              form.value.resistance = Array.isArray(r) ? r.join(', ') : r
          } catch { form.value.resistance = a.resistance || '' }
      }

  } else {
      // New Stock
      form.value = { 
          id: null, name: '', symbol: '', logoUrl: '',
          analysisId: null,
          currentPrice: '', target: '', stopLoss: '',
          technical: '', financial: '', behavioral: '',
          support: '', resistance: '', patterns: '',
          chartImageUrl: ''
      }
  }
  showModal.value = true
}

async function saveStock() {
  saving.value = true
  try {
    // 1. Save Stock Info
    const stockMethod = isEditing.value ? 'PUT' : 'POST'
    const stockBody = {
        id: form.value.id,
        name: form.value.name,
        symbol: form.value.symbol,
        logoUrl: form.value.logoUrl
    }
    const savedStock = await $fetch('/api/admin/stock', { method: stockMethod, body: stockBody })
    
    // 2. Save Analysis Info (Only if we have a stock ID - which we do after save/if editing)
    const stockId = savedStock.id || form.value.id
    if (stockId) {
        // Format support/resistance to JSON arrays
        const supportArray = form.value.support.split(',').map(s => s.trim()).filter(s => s)
        const resistanceArray = form.value.resistance.split(',').map(s => s.trim()).filter(s => s)

        const analysisBody = {
            id: form.value.analysisId,
            stockId: stockId,
            currentPrice: form.value.currentPrice,
            target: form.value.target,
            stopLoss: form.value.stopLoss,
            technical: form.value.technical,
            financial: form.value.financial,
            behavioral: form.value.behavioral,
            patterns: form.value.patterns,
            chartImageUrl: form.value.chartImageUrl,
            support: JSON.stringify(supportArray),
            resistance: JSON.stringify(resistanceArray)
        }

        const analysisMethod = form.value.analysisId ? 'PUT' : 'POST'
        await $fetch('/api/admin/analysis', { method: analysisMethod, body: analysisBody })
    }

    await fetchStocks()
    
    // If we edited current stock, reload analysis
    if (isEditing.value && selectedStockId.value === form.value.id) {
        await fetchAnalysis()
    } else if (!isEditing.value) {
        // If new stock, maybe select it?
        selectedStockId.value = stockId
        await fetchAnalysis()
    }
    
    showModal.value = false
    alert(isEditing.value ? 'تم التعديل بنجاح' : 'تم الإضافة بنجاح')
  } catch (e) {
    alert('حدث خطأ: ' + e.message)
    console.error(e)
  } finally {
    saving.value = false
  }
}


// Fetch analysis for selected stock
async function fetchAnalysis() {
  if (!selectedStockId.value) return
  
  loading.value = true
  try {
    const { data } = await useFetch(`/api/analysis/${selectedStockId.value}`)
    if (data.value && data.value.analyses.length > 0) {
      analysis.value = data.value.analyses[0]
      // Add stock info to analysis object
      analysis.value.stockName = data.value.name
      analysis.value.stockLogo = data.value.logoUrl
    } else if (data.value) {
       // Handle case where stock exists but no analysis
       analysis.value = {
         stockName: data.value.name,
         stockLogo: data.value.logoUrl,
         currentPrice: 'N/A'
       }
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
.controls { display: flex; align-items: center; gap: 1rem; }
.select-wrapper { display: flex; align-items: center; gap: 0.5rem; }
.stock-select { padding: 0.5rem; font-size: 1rem; border-radius: 4px; border: 1px solid var(--primary); background: #333; color: #fff; width: 250px; }

.btn-icon { background: var(--primary); color: #000; font-weight: bold; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.btn-icon:hover { opacity: 0.9; }

.stock-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid #444; padding-bottom: 1rem; }
.analysis-stock-logo { width: 60px; height: 60px; object-fit: contain; border-radius: 50%; background: #fff; padding: 4px; }
.stock-header h3 { margin: 0; color: var(--text-light); font-size: 1.5rem; }

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

/* Modal Styles */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: start; padding-top: 5vh; z-index: 1000; overflow-y: auto; }
.modal { width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; padding: 2rem; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--primary); }
.modal-body { overflow-y: auto; padding-right: 0.5rem; flex: 1; }
.section-title { margin-top: 1.5rem; margin-bottom: 1rem; color: var(--primary); border-bottom: 1px dashed #444; padding-bottom: 0.5rem; }
.divider { margin: 1.5rem 0; border: 0; border-top: 1px solid #444; }

.form-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
.form-group.half { flex: 1; }
.form-group.third { flex: 1; }

.modal-actions { display: flex; gap: 1rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #444; justify-content: flex-end; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; background: #2a2a2a; border: 1px solid #444; color: #fff; border-radius: 6px; font-family: inherit; }
.form-group input:focus, .form-group textarea:focus { border-color: var(--primary); outline: none; }
</style>
