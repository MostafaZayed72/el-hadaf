<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    error.value = ''
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800))

    if (login(username.value, password.value)) {
        router.push('/')
    } else {
        error.value = 'اسم المستخدم أو كلمة المرور غير صحيحة'
        loading.value = false
    }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
     <!-- Background Effects -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="card w-full max-w-md p-8 relative z-10 border border-gray-800 backdrop-blur-md">
      <div class="text-center mb-8">
          <span class="text-5xl mb-4 block">🎯</span>
          <h1 class="text-3xl font-bold text-white mb-2">مرحباً بعودتك</h1>
          <p class="text-gray-400">سجل دخولك لمتابعة آخر تحليلات السوق</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
            <label class="text-sm text-gray-300">اسم المستخدم</label>
            <input v-model="username" type="text" class="input bg-dark-input/50 focus:bg-dark-input" placeholder="admin / user" required />
        </div>
        <div class="space-y-2">
            <label class="text-sm text-gray-300">كلمة المرور</label>
            <input v-model="password" type="password" class="input bg-dark-input/50 focus:bg-dark-input" placeholder="••••••••" required />
        </div>
        
        <div v-if="error" class="bg-red-500/10 text-red-500 text-sm p-3 rounded text-center border border-red-500/20">
            {{ error }}
        </div>

        <button type="submit" class="btn btn-primary w-full py-3 text-lg font-bold flex justify-center items-center gap-2" :disabled="loading">
            <span v-if="loading" class="animate-spin text-xl">↻</span>
            {{ loading ? 'جاري التحقق...' : 'تسجيل الدخول' }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-400">
          ليس لديك حساب؟ <NuxtLink to="/register" class="text-primary hover:underline font-bold">إنشاء حساب جديد</NuxtLink>
      </div>
    </div>
  </div>
</template>
