<script setup lang="ts">
const router = useRouter()

const form = ref({ name: '', email: '', password: '', confirmPassword: '' })
const loading = ref(false)

const handleRegister = async () => {
    loading.value = true
    await new Promise(r => setTimeout(r, 1000))
    // Mock success
    router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
     <!-- Background Effects -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="card w-full max-w-md p-8 relative z-10 border border-gray-800 backdrop-blur-md">
      <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">إنشاء حساب جديد</h1>
          <p class="text-gray-400">انضم لمجتمع قناة الهدف واستفد من التحليلات الحصرية</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="space-y-2">
            <label class="text-sm text-gray-300">الاسم الكامل</label>
            <input v-model="form.name" type="text" class="input" required />
        </div>
        <div class="space-y-2">
            <label class="text-sm text-gray-300">البريد الإلكتروني</label>
            <input v-model="form.email" type="email" class="input" required />
        </div>
        <div class="space-y-2">
            <label class="text-sm text-gray-300">كلمة المرور</label>
            <input v-model="form.password" type="password" class="input" required />
        </div>
         <div class="space-y-2">
            <label class="text-sm text-gray-300">تأكيد كلمة المرور</label>
            <input v-model="form.confirmPassword" type="password" class="input" required />
        </div>

        <button type="submit" class="btn btn-primary w-full py-3 text-lg font-bold flex justify-center items-center gap-2 mt-4" :disabled="loading">
            <span v-if="loading" class="animate-spin text-xl">↻</span>
            {{ loading ? 'جاري التشغيل...' : 'إنشاء الحساب' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-400">
          لديك حساب بالفعل؟ <NuxtLink to="/login" class="text-primary hover:underline font-bold">تسجيل الدخول</NuxtLink>
      </div>
    </div>
  </div>
</template>
