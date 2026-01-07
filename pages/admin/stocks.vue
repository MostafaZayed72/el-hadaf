
<template>
  <div class="admin-stocks-page container">
    <header class="page-header">
      <h2>إدارة الأسهم (التعريفات)</h2>
      <NuxtLink to="/admin" class="btn btn-outline">العودة لتحليل الأسهم</NuxtLink>
    </header>

    <div class="card">
      <div class="controls">
        <h3>قائمة الأسهم المعرفة</h3>
        <button @click="openModal()" class="btn btn-primary">إضافة سهم جديد</button>
      </div>
      
      <table class="stocks-table">
        <thead>
          <tr>
            <th>الشعار</th>
            <th>الاسم</th>
            <th>الرمز</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.id">
            <td>
              <img v-if="stock.logoUrl" :src="stock.logoUrl" class="stock-logo" />
              <span v-else>-</span>
            </td>
            <td>{{ stock.name }}</td>
            <td>{{ stock.symbol }}</td>
            <td>
              <button @click="openModal(stock)" class="btn btn-sm btn-secondary">تعديل</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal card">
        <h3>{{ isEditing ? 'تعديل بيانات السهم' : 'إضافة سهم جديد' }}</h3>
        
        <div class="form-group">
          <label>اسم السهم</label>
          <input v-model="form.name" placeholder="مثال: بنك بوبيان">
        </div>
        <div class="form-group">
          <label>الرمز (Symbol)</label>
          <input v-model="form.symbol" placeholder="مثال: BOUBYAN">
        </div>
        <div class="form-group">
          <label>رابط الشعار</label>
          <input v-model="form.logoUrl" placeholder="https://...">
        </div>

        <div class="modal-actions">
          <button @click="saveStock" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'جاري الحفظ...' : 'حفظ' }}
          </button>
          <button @click="showModal = false" class="btn btn-outline">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stocks = ref([])
const showModal = ref(false)
const loading = ref(false)
const form = ref({ id: null, name: '', symbol: '', logoUrl: '' })

const isEditing = computed(() => !!form.value.id)

// Fetch stocks
async function fetchStocks() {
  const { data } = await useFetch('/api/stocks')
  if (data.value) stocks.value = data.value
}
await fetchStocks()

function openModal(stock = null) {
  if (stock) {
    form.value = { ...stock }
  } else {
    form.value = { id: null, name: '', symbol: '', logoUrl: '' }
  }
  showModal.value = true
}

async function saveStock() {
  loading.value = true
  try {
    const method = isEditing.value ? 'PUT' : 'POST'
    const endpoint = isEditing.value ? '/api/admin/stock' : '/api/admin/stock' // Both separate files now handled by Nuxt mapped to methods if setup, but here I used separate files: stock.post.ts and stock.put.ts
    // Wait, Nuxt API routes: stock.post.ts handles POST, stock.put.ts handles PUT on the same route '/api/admin/stock' if named correctly.
    // Actually, I named them `stock.post.ts` and `stock.put.ts` which maps to `/api/admin/stock` for those methods. Correct independently.

    await $fetch('/api/admin/stock', {
      method,
      body: form.value
    })
    
    await fetchStocks()
    showModal.value = false
    alert(isEditing.value ? 'تم التعديل بنجاح' : 'تم الإضافة بنجاح')
  } catch (e) {
    alert('حدث خطأ: ' + e.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-stocks-page { padding-top: 2rem; padding-bottom: 4rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }

.stocks-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.stocks-table th, .stocks-table td { padding: 1rem; text-align: right; border-bottom: 1px solid #444; }
.stock-logo { width: 40px; height: 40px; object-fit: contain; border-radius: 50%; background: white; padding: 2px; }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal { width: 100%; max-width: 500px; }
.modal-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); }
.form-group input { width: 100%; padding: 0.75rem; background: #333; border: 1px solid #444; color: #fff; border-radius: 4px; }
</style>
