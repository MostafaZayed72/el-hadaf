
<template>
  <div class="login-container flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <div class="card p-8 bg-gray-800 rounded-xl shadow-lg w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary">تسجيل الدخول</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
            <label class="block text-sm mb-2">اسم المستخدم</label>
            <input v-model="username" type="text" class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-primary focus:outline-none" />
        </div>
        <div>
            <label class="block text-sm mb-2">كلمة المرور</label>
            <input v-model="password" type="password" class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-primary focus:outline-none" />
        </div>
        <div v-if="error" class="text-red-500 text-sm text-center font-bold">
            {{ error }}
        </div>
        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-xl transition">
            دخول
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
    if (login(username.value, password.value)) {
        router.push('/analysis') // Redirect to the "merged" page
    } else {
        error.value = 'اسم المستخدم أو كلمة المرور غير صحيحة'
    }
}
</script>

<style scoped>
.text-primary { color: #facc15; } /* Tailwind yellow-400 equivalent for "gold" look */
.bg-primary { background-color: #facc15; }
.bg-primary-dark { background-color: #eab308; }
</style>
