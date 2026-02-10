<template>
  <NuxtLayout>
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div class="text-9xl mb-4">🚧</div>
      <h1 class="text-4xl font-bold text-page-text mb-4">هذه الصفحة تحت الإنشاء</h1>
      <p class="text-text-secondary text-lg mb-8">نعمل حالياً على تجهيز هذه الصفحة. يرجى العودة لاحقاً.</p>
      <NuxtLink to="/" class="bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
        العودة للرئيسية
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})
</script>
