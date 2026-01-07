
<template>
  <div class="admin-page container">
    <header class="page-header">
      <h2>لوحة تحكم المشرف</h2>
    </header>

    <div class="admin-grid">
      <!-- Stock Management -->
      <div class="card">
        <h3>إدارة الأسهم</h3>
        <div class="stock-controls">
          <select v-model="selectedStockId" @change="loadAnalysis" class="stock-select">
            <option value="" disabled>-- اختر السهم للتعديل --</option>
            <option v-for="stock in stocks" :key="stock.id" :value="stock.id">
              {{ stock.name }} ({{ stock.symbol }})
            </option>
          </select>
          <button @click="showAddStockModal = true" class="btn btn-secondary">إضافة سهم جديد</button>
        </div>
      </div>

      <!-- Add Stock Modal/Form -->
      <div v-if="showAddStockModal" class="card form-card new-stock-form">
        <h3>إضافة سهم جديد</h3>
        <div class="form-row">
          <div class="form-group">
            <label>اسم السهم</label>
            <input v-model="newStock.name" placeholder="مثال: بنك بوبيان">
          </div>
          <div class="form-group">
            <label>الرمز (Symbol)</label>
            <input v-model="newStock.symbol" placeholder="مثال: BOUBYAN">
          </div>
        </div>
        <div class="form-group">
          <label>رابط الشعار (اختياري)</label>
          <input v-model="newStock.logoUrl" placeholder="https://...">
        </div>
        <div class="actions">
          <button @click="createNewStock" class="btn btn-primary" :disabled="creatingStock">حفظ السهم</button>
          <button @click="showAddStockModal = false" class="btn btn-outline">إلغاء</button>
        </div>
      </div>

      <!-- Analysis Form -->
      <div class="card form-card" v-if="selectedStockId">
        <h3>بيانات التحليل</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label>السعر الحالي</label>
            <input type="number" v-model="form.currentPrice" step="0.01">
          </div>
          <div class="form-group">
            <label>الهدف (Target)</label>
            <input type="number" v-model="form.target" step="0.01">
          </div>
          <div class="form-group">
            <label>وقف الخسارة</label>
            <input type="number" v-model="form.stopLoss" step="0.01">
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
          <div class="form-group">
            <label>الدعوم (فاصلة بين القيم)</label>
            <input type="text" v-model="form.supportRaw" placeholder="مثال: 100, 98, 95">
          </div>
          <div class="form-group">
            <label>المقاومات (فاصلة بين القيم)</label>
            <input type="text" v-model="form.resistanceRaw" placeholder="مثال: 105, 110, 115">
          </div>
        </div>

        <div class="form-group">
          <label>النماذج الفنية</label>
          <input type="text" v-model="form.patterns">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>رابط صورة الشارت (TradingView URL)</label>
            <input type="text" v-model="form.chartImageUrl" placeholder="https://www.tradingview.com/x/...">
            <div v-if="form.chartImageUrl" class="mt-2">
              <img :src="form.chartImageUrl" alt="Chart Preview" style="max-width: 100%; border: 1px solid #444; border-radius: 4px;">
            </div>
          </div>
        </div>



        <div class="actions">
          <button @click="saveAnalysis" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
          </button>
          <p v-if="message" :class="{'text-bull': success, 'text-bear': !success}">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stocks = ref([])
const selectedStockId = ref('')
const analysisId = ref(null)
const showAddStockModal = ref(false)
const creatingStock = ref(false)

const newStock = ref({ name: '', symbol: '', logoUrl: '' })

const saving = ref(false)
const message = ref('')
const success = ref(false)

const form = ref({
  currentPrice: 0,
  target: 0,
  stopLoss: 0,
  technical: '',
  financial: '',
  behavioral: '',
  supportRaw: '',
  resistanceRaw: '',
  patterns: '',
  financial: '',
  behavioral: '',
  supportRaw: '',
  financial: '',
  behavioral: '',
  chartImageUrl: ''
})

const isEditing = computed(() => !!form.value.id)

// Fetch stocks
const { data: stocksData } = await useFetch('/api/stocks')
if (stocksData.value) stocks.value = stocksData.value

async function loadAnalysis() {
  if (!selectedStockId.value) return
  
  // Clear form
  form.value = {
    currentPrice: 0, targets: 0, stopLoss: 0,
    technical: '', financial: '', behavioral: '',
    supportRaw: '', resistanceRaw: '', patterns: '', chartData: ''
  }
  analysisId.value = null

  try {
    const { data } = await useFetch(`/api/analysis/${selectedStockId.value}`)
    if (data.value && data.value.analyses.length > 0) {
      const existing = data.value.analyses[0]
      analysisId.value = existing.id
      
      form.value.currentPrice = existing.currentPrice
      form.value.target = existing.target
      form.value.stopLoss = existing.stopLoss
      form.value.technical = existing.technical || ''
      form.value.financial = existing.financial || ''
      form.value.behavioral = existing.behavioral || ''
      form.value.patterns = existing.patterns || ''
      form.value.chartImageUrl = existing.chartImageUrl || ''
      
      // Parse JSON arrays to comma separated string
      try {
        const sup = JSON.parse(existing.support)
        form.value.supportRaw = Array.isArray(sup) ? sup.join(', ') : ''
      } catch (e) { form.value.supportRaw = '' }

      try {
        const res = JSON.parse(existing.resistance)
        form.value.resistanceRaw = Array.isArray(res) ? res.join(', ') : ''
      } catch (e) { form.value.resistanceRaw = '' }
    }
  } catch (e) {
    console.error("No existing analysis or error", e)
  }
}

async function saveAnalysis() {
  saving.value = true
  message.value = ''
  
  // Prepare payload
  const payload = {
    stockId: selectedStockId.value,
    currentPrice: form.value.currentPrice,
    target: form.value.target,
    stopLoss: form.value.stopLoss,
    technical: form.value.technical,
    financial: form.value.financial,
    behavioral: form.value.behavioral,
    patterns: form.value.patterns,
    chartImageUrl: form.value.chartImageUrl,
    // Convert CSV to JSON array string
    support: JSON.stringify(form.value.supportRaw.split(',').map(s => s.trim()).filter(s => s)),
    resistance: JSON.stringify(form.value.resistanceRaw.split(',').map(s => s.trim()).filter(s => s))
  }

  try {
    if (analysisId.value) {
      // Update
      payload.id = analysisId.value
      await $fetch('/api/admin/analysis', { method: 'PUT', body: payload })
      message.value = 'تم تحديث التحليل بنجاح'
    } else {
      // Create
      await $fetch('/api/admin/analysis', { method: 'POST', body: payload })
      message.value = 'تم إضافة التحليل بنجاح'
    }
    success.value = true
    // Reload to ensure ID is set if we just created
    await loadAnalysis()
  } catch (e) {
    console.error(e)
    message.value = 'حدث خطأ أثناء الحفظ'
    success.value = false
  } finally {
    saving.value = false
  }
}

async function createNewStock() {
  creatingStock.value = true
  try {
    await $fetch('/api/admin/stock', {
      method: 'POST',
      body: newStock.value
    })
    // Refresh stocks
    const { data } = await useFetch('/api/stocks')
    if (data.value) stocks.value = data.value
    
    showAddStockModal.value = false
    newStock.value = { name: '', symbol: '', logoUrl: '' }
    alert('تم إضافة السهم بنجاح')
  } catch (e) {
    alert('حدث خطأ: ' + e.message)
  } finally {
    creatingStock.value = false
  }
}
</script>

<style scoped>
.admin-page { padding-top: 2rem; padding-bottom: 4rem; }
.admin-grid { display: grid; gap: 2rem; }
.stock-controls { display: flex; gap: 1rem; align-items: center; }
.stock-select { flex-grow: 1; padding: 0.75rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; }
.form-card { background: var(--bg-card); padding: 2rem; border-radius: 12px; }
.new-stock-form { border: 1px solid var(--primary); }
.btn-secondary { background: #555; color: white; }
.btn-outline { background: transparent; border: 1px solid #555; color: #ccc; }

.form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); }
.form-group input, .form-group textarea, .form-group select {
  width: 100%; padding: 0.75rem;
  background: #333; border: 1px solid #444; color: #fff; border-radius: 4px;
}
.form-group input:focus, .form-group textarea:focus { border-color: var(--primary); outline: none; }
.code-font { font-family: monospace; }
.actions { margin-top: 2rem; display: flex; align-items: center; gap: 1rem; }
</style>
