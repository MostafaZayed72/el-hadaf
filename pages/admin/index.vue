<template>
  <div class="min-h-screen flex items-center justify-center bg-page-bg px-4">
   <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/public/logo.png" alt="قناة الهدف" class="h-24 w-24 mx-auto rounded-full object-cover bg-white p-1 border-4 border-primary shadow-2xl mb-4" />
        <h1 class="text-3xl font-bold text-page-text">لوحة تحكم الأدمن</h1>
        <p class="text-text-secondary mt-2">تسجيل الدخول للوصول إلى إدارة الأسهم</p>
      </div>

      <!-- Login Card -->
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-text-secondary mb-2">
              اسم المستخدم
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="input w-full"
              placeholder="admin"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-text-secondary mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input w-full"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full text-lg py-3"
            :disabled="loading"
          >
            {{ loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-text-secondary">
          <p>بيانات تجريبية:</p>
          <p class="font-mono mt-1">admin / admin123456</p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-primary hover:text-primary-light">
          ← العودة للصفحة الرئيسية
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { login } = useAuth()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const success = login(username.value, password.value)
    
    if (success) {
      await navigateTo('/admin/stocks')
    } else {
      error.value = 'اسم المستخدم أو كلمة المرور غير صحيحة'
    }
  } catch (e) {
    error.value = 'حدث خطأ أثناء تسجيل الدخول'
  } finally {
    loading.value = false
  }
}
</script>
