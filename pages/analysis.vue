<template>
  <div class="container py-8 min-h-screen">
    <header class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h2 class="text-3xl font-bold border-r-4 border-primary pr-4">تحليل الأسهم</h2>
      <div class="flex items-center gap-4 bg-dark-card p-2 rounded-lg border border-gray-700">
        <button v-if="isAdmin" @click="openModal()" class="btn btn-primary w-8 h-8 flex items-center justify-center rounded-full p-0" title="إضافة سهم جديد">+</button>
        <div class="flex items-center gap-2">
          <label for="stock-select" class="text-gray-400 text-sm">اختر السهم:</label>
          <select id="stock-select" v-model="selectedStockId" @change="fetchAnalysis" class="bg-dark-input text-white border border-gray-600 rounded px-3 py-1 focus:border-primary outline-none">
            <option value="" disabled>-- اختر من القائمة --</option>
            <option v-for="stock in stocks" :key="stock.id" :value="stock.id">
              {{ stock.name }} ({{ stock.symbol }})
            </option>
          </select>
        </div>
      </div>
    </header>

    <div v-if="loading" class="text-center py-20 text-gray-400 animate-pulse">جاري التحميل...</div>
    
    <div v-else-if="analysis" class="space-y-6 animate-fade-in">
      <div class="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
        <div class="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden" v-if="analysis.stockLogo">
            <img :src="analysis.stockLogo" class="w-full h-full object-contain" />
        </div>
        <div>
            <h3 class="text-2xl font-bold text-white">{{ analysis.stockName }}</h3>
            <button v-if="isAdmin" @click="openModal(getCurrentStock())" class="text-xs text-primary hover:underline">تعديل البيانات</button>
        </div>
      </div>

      <!-- Top Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-gray-500">
          <h3 class="text-gray-400 text-sm mb-2">السعر الحالي</h3>
          <div class="text-4xl font-mono font-bold">{{ analysis.currentPrice }}</div>
        </div>
        <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-bull">
          <h3 class="text-gray-400 text-sm mb-2">الهدف (Target)</h3>
          <div class="text-4xl font-mono font-bold text-bull">{{ analysis.target }}</div>
        </div>
        <div class="card flex flex-col items-center justify-center py-6 border-t-4 border-bear">
          <h3 class="text-gray-400 text-sm mb-2">وقف الخسارة</h3>
          <div class="text-4xl font-mono font-bold text-bear">{{ analysis.stopLoss }}</div>
        </div>
      </div>

      <!-- Analysis Text Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <h3 class="font-bold text-primary mb-3 border-b border-gray-700 pb-2">التحليل الفني</h3>
          <p class="text-gray-300 leading-relaxed text-sm">{{ analysis.technical }}</p>
        </div>
        <div class="card">
          <h3 class="font-bold text-primary mb-3 border-b border-gray-700 pb-2">التحليل المالي</h3>
          <p class="text-gray-300 leading-relaxed text-sm">{{ analysis.financial }}</p>
        </div>
        <div class="card">
          <h3 class="font-bold text-primary mb-3 border-b border-gray-700 pb-2">التحليل السلوكي</h3>
          <p class="text-gray-300 leading-relaxed text-sm">{{ analysis.behavioral }}</p>
        </div>
      </div>

      <!-- Support & Resistance -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <h3 class="font-bold text-white mb-4">الدعوم (Supports)</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(val, idx) in parsedSupport" :key="idx" class="px-3 py-1 rounded-full bg-bull/10 text-bull border border-bull/30 font-mono text-sm font-bold">{{ val }}</span>
          </div>
        </div>
        <div class="card">
          <h3 class="font-bold text-white mb-4">المقاومات (Resistances)</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(val, idx) in parsedResistance" :key="idx" class="px-3 py-1 rounded-full bg-bear/10 text-bear border border-bear/30 font-mono text-sm font-bold">{{ val }}</span>
          </div>
        </div>
        <div class="card">
          <h3 class="font-bold text-white mb-4">النماذج الفنية</h3>
          <p class="text-sm text-gray-300">{{ analysis.patterns }}</p>
        </div>
      </div>

      <!-- Chart -->
      <div class="card" v-if="analysis.chartImageUrl">
        <h3 class="font-bold text-white mb-4">الرسم البياني</h3>
        <div class="rounded-lg overflow-hidden border border-gray-700">
          <img src="https://www.tradingview.com/x/ReAv8LyQ/" alt="Technical Chart" class="w-full h-auto" />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-500 bg-dark-card rounded-xl border border-dashed border-gray-700">
      <div class="text-4xl mb-4">🔍</div>
      <p>يرجى اختيار سهم لعرض التحليل.</p>
    </div>

    <!-- Modal -->
    <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-start pt-10 overflow-y-auto">
        <div class="bg-dark-card w-full max-w-4xl rounded-xl border border-primary p-6 shadow-2xl mb-10 mx-4">
            <h3 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                {{ isEditing ? 'تعديل بيانات السهم والتحليل' : 'إضافة سهم جديد' }}
            </h3>
            
            <div class="space-y-6">
                <!-- Stock Info -->
                <div>
                    <h4 class="text-primary font-bold mb-4">بيانات السهم</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">اسم السهم</label>
                            <input v-model="form.name" class="input" placeholder="مثال: بنك بوبيان">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">الرمز (Symbol)</label>
                            <input v-model="form.symbol" class="input" placeholder="مثال: BOUBYAN">
                        </div>
                    </div>
                    <div class="mt-4 space-y-2">
                        <label class="text-sm text-gray-400">رابط الشعار</label>
                        <input v-model="form.logoUrl" class="input" placeholder="https://...">
                    </div>
                </div>

                <hr class="border-gray-700" />

                <!-- Analysis Info -->
                <div>
                    <h4 class="text-primary font-bold mb-4">بيانات التحليل</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">السعر الحالي</label>
                            <input v-model="form.currentPrice" type="number" step="0.001" class="input">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">الهدف</label>
                            <input v-model="form.target" type="number" step="0.001" class="input">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">وقف الخسارة</label>
                            <input v-model="form.stopLoss" type="number" step="0.001" class="input">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 mb-4">
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">التحليل الفني</label>
                            <textarea v-model="form.technical" rows="3" class="input h-auto"></textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">التحليل المالي</label>
                            <textarea v-model="form.financial" rows="3" class="input h-auto"></textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">التحليل السلوكي</label>
                            <textarea v-model="form.behavioral" rows="3" class="input h-auto"></textarea>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">الدعوم (فاصلة بين كل رقم)</label>
                            <input v-model="form.support" class="input" placeholder="مثال: 100, 98, 95">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-400">المقاومات (فاصلة بين كل رقم)</label>
                            <input v-model="form.resistance" class="input" placeholder="مثال: 105, 110, 115">
                        </div>
                    </div>

                    <div class="space-y-2 mb-4">
                        <label class="text-sm text-gray-400">النماذج الفنية</label>
                        <textarea v-model="form.patterns" rows="2" class="input h-auto"></textarea>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">رابط الرسم البياني (Chart Image URL)</label>
                        <input v-model="form.chartImageUrl" class="input" placeholder="https://...">
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-700">
                <button @click="showModal = false" class="btn bg-gray-700 text-white hover:bg-gray-600">إلغاء</button>
                <button @click="saveStock" class="btn btn-primary" :disabled="saving">
                    {{ saving ? 'جاري الحفظ...' : 'حفظ الكل' }}
                </button>
            </div>
        </div>
        </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isAdmin = ref(true) // Mock admin capability
const stocks = ref([
    { id: '1', name: 'بنك بوبيان', symbol: 'BOUBYAN', logoUrl: '' },
    { id: '2', name: 'وطني', symbol: 'NBK', logoUrl: '' }
]) // Mock stocks
const selectedStockId = ref('')
const analysis = ref(null)
const loading = ref(false)

// Mock Data for Analysis
const mockAnalysisData = {
    '1': {
        id: 1,
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
        chartImageUrl: 'https://via.placeholder.com/800x400.png?text=Chart+Image'
    }
}

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

// Mock Fetch
async function fetchStocks() {
  // In real app: const { data } = await useFetch('/api/stocks')
}

function openModal(stock = null) {
  if (stock) {
      form.value = { 
          id: stock.id, 
          name: stock.name, 
          symbol: stock.symbol, 
          logoUrl: stock.logoUrl,
          analysisId: null,
          currentPrice: '', target: '', stopLoss: '',
          technical: '', financial: '', behavioral: '',
          support: '', resistance: '', patterns: '',
          chartImageUrl: ''
      }
      if (selectedStockId.value === stock.id && analysis.value) {
          const a = analysis.value
          Object.assign(form.value, a)
          // stringify support/resistance for input
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
  setTimeout(() => {
      saving.value = false
      showModal.value = false
      alert('تم الحفظ (Mock)')
  }, 1000)
}

async function fetchAnalysis() {
  if (!selectedStockId.value) return
  loading.value = true
  setTimeout(() => {
     analysis.value = mockAnalysisData[selectedStockId.value] || null
     loading.value = false
  }, 500)
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
