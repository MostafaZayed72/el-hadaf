<template>
  <div class="min-h-screen bg-page-bg">
    <!-- Header -->
    <header class="bg-card border-b border-border-color transition-colors duration-300">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-page-text">إدارة الأسهم</h1>
        <div class="flex items-center gap-4">
          <span class="text-text-secondary">مرحباً, {{ user?.name }}</span>
          <button @click="handleLogout" class="btn bg-red-600 hover:bg-red-700 text-white">
            تسجيل الخروج
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Add Button -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-page-text">قائمة الأسهم</h2>
        <button @click="openModal()" class="btn btn-primary">
          + إضافة سهم جديد
        </button>
      </div>

      <!-- Stocks List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="stock in stocks"
          :key="stock.id"
          class="card hover:border-primary transition-all"
        >
          <div class="flex items-start gap-4">
            <div v-if="stock.logoUrl" class="w-16 h-16 rounded-full bg-white p-2 flex-shrink-0">
              <img :src="stock.logoUrl" :alt="stock.name" class="w-full h-full object-contain" />
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg text-page-text">{{ stock.name }}</h3>
              <p class="text-text-secondary text-sm">{{ stock.symbol }}</p>
            </div>
          </div>

          <div class="flex gap-2 mt-4">
            <button @click="openModal(stock)" class="btn bg-blue-600 hover:bg-blue-700 text-white flex-1">
              تعديل
            </button>
            <button @click="confirmDelete(stock.id)" class="btn bg-red-600 hover:bg-red-700 text-white flex-1">
              حذف
            </button>
          </div>
        </div>
      </div>

      <div v-if="stocks.length === 0" class="text-center py-20 text-text-secondary">
        <p class="text-4xl mb-4">📊</p>
        <p>لم يتم إضافة أي أسهم بعد</p>
      </div>
    </main>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-card w-full max-w-4xl rounded-xl border border-primary p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
          <h3 class="text-2xl font-bold text-page-text mb-6 border-b border-border-color pb-4 sticky top-0 bg-card z-10">
            {{ isEditing ? 'تعديل السهم' : 'إضافة سهم جديد' }}
          </h3>

          <form @submit.prevent="saveStock" class="space-y-6">
            <!-- Stock Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">اسم السهم *</label>
                <input v-model="form.name" required class="input w-full" placeholder="مثال: بنك بوبيان" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">رمز السهم</label>
                <input v-model="form.symbol" class="input w-full" placeholder="مثال: BOUBYAN" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">رابط شعار السهم</label>
              <input v-model="form.logoUrl" type="url" class="input w-full" placeholder="https://example.com/logo.png" />
            </div>

            <hr class="border-border-color" />

            <!-- Analysis Data -->
            <h4 class="text-lg font-bold text-primary">بيانات التحليل</h4>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">السعر الحالي</label>
                <input v-model.number="form.currentPrice" type="number" step="0.001" class="input w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">السعر المستهدف</label>
                <input v-model.number="form.target" type="number" step="0.001" class="input w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">وقف الخسارة</label>
                <input v-model.number="form.stopLoss" type="number" step="0.001" class="input w-full" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">التحليل الفني</label>
                <textarea v-model="form.technical" rows="3" class="input w-full"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">التحليل المالي</label>
                <textarea v-model="form.financial" rows="3" class="input w-full"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">التحليل السلوكي</label>
                <textarea v-model="form.behavioral" rows="3" class="input w-full"></textarea>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">الدعوم (مفصولة بفاصلة)</label>
                <input v-model="form.support" class="input w-full" placeholder="600, 590, 580" />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-2">المقاومات (مفصولة بفاصلة)</label>
                <input v-model="form.resistance" class="input w-full" placeholder="620, 635, 650" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">النماذج الفنية</label>
              <textarea v-model="form.patterns" rows="2" class="input w-full"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-2">رابط صورة الشارت</label>
              <input v-model="form.chartImageUrl" type="url" class="input w-full" placeholder="https://example.com/chart.png" />
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-3 pt-4 border-t border-border-color">
              <button type="button" @click="showModal = false" class="btn bg-gray-700 hover:bg-gray-600 text-white">
                إلغاء
              </button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'جاري الحفظ...' : 'حفظ' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
const { stocks, getStocks, addStock, updateStock, deleteStock, saveAnalysis } = useStocks()

const showModal = ref(false)
const saving = ref(false)
const form = ref({
  id: '',
  name: '',
  symbol: '',
  logoUrl: '',
  currentPrice: 0,
  target: 0,
  stopLoss: 0,
  technical: '',
  financial: '',
  behavioral: '',
  support: '',
  resistance: '',
  patterns: '',
  chartImageUrl: ''
})

const isEditing = computed(() => !!form.value.id)

const openModal = (stock = null) => {
  if (stock) {
    // Load stock basic info
    form.value.id = stock.id
    form.value.name = stock.name
    form.value.symbol = stock.symbol || ''
    form.value.logoUrl = stock.logoUrl || ''
    
    // Load analysis data from localStorage
    const analysisData = getAnalysis(stock.id)
    if (analysisData) {
      form.value.currentPrice = analysisData.currentPrice || 0
      form.value.target = analysisData.target || 0
      form.value.stopLoss = analysisData.stopLoss || 0
      form.value.technical = analysisData.technical || ''
      form.value.financial = analysisData.financial || ''
      form.value.behavioral = analysisData.behavioral || ''
      form.value.chartImageUrl = analysisData.chartImageUrl || ''
      form.value.patterns = analysisData.patterns || ''
      
      // Parse support and resistance from JSON strings
      try {
        const supportArray = analysisData.support ? JSON.parse(analysisData.support) : []
        form.value.support = supportArray.join(', ')
      } catch {
        form.value.support = ''
      }
      
      try {
        const resistanceArray = analysisData.resistance ? JSON.parse(analysisData.resistance) : []
        form.value.resistance = resistanceArray.join(', ')
      } catch {
        form.value.resistance = ''
      }
    } else {
      // Reset analysis fields if no data exists
      form.value.currentPrice = 0
      form.value.target = 0
      form.value.stopLoss = 0
      form.value.technical = ''
      form.value.financial = ''
      form.value.behavioral = ''
      form.value.support = ''
      form.value.resistance = ''
      form.value.patterns = ''
      form.value.chartImageUrl = ''
    }
  } else {
    // New stock - reset all fields
    form.value = { 
      id: '', 
      name: '', 
      symbol: '', 
      logoUrl: '', 
      currentPrice: 0, 
      target: 0, 
      stopLoss: 0, 
      technical: '', 
      financial: '', 
      behavioral: '', 
      support: '', 
      resistance: '', 
      patterns: '', 
      chartImageUrl: '' 
    }
  }
  showModal.value = true
}

const saveStock = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      updateStock(form.value.id, { name: form.value.name, symbol: form.value.symbol, logoUrl: form.value.logoUrl })
    } else {
      const newStock = addStock({ name: form.value.name, symbol: form.value.symbol, logoUrl: form.value.logoUrl })
      form.value.id = newStock.id
    }

    // Save analysis
    const supportArray = form.value.support.split(',').map(s => s.trim()).filter(Boolean)
    const resistanceArray = form.value.resistance.split(',').map(s => s.trim()).filter(Boolean)

    saveAnalysis(form.value.id, {
      stockName: form.value.name,
      stockLogo: form.value.logoUrl,
      currentPrice: form.value.currentPrice,
      target: form.value.target,
      stopLoss: form.value.stopLoss,
      technical: form.value.technical,
      financial: form.value.financial,
      behavioral: form.value.behavioral,
      support: JSON.stringify(supportArray),
      resistance: JSON.stringify(resistanceArray),
      patterns: form.value.patterns,
      chartImageUrl: form.value.chartImageUrl
    })

    showModal.value = false
  } finally {
    saving.value = false
  }
}

const confirmDelete = (id: string) => {
  if (confirm('هل أنت متأكد من حذف هذا السهم؟')) {
    deleteStock(id)
  }
}

const handleLogout = () => {
  logout()
}
</script>
