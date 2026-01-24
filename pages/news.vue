<script setup>
useHead({ title: 'أخبار السوق - قناة الهدف' })
</script>

<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8 border-r-4 border-primary pr-4">الأخبار الاقتصادية</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Mock News Items -->
        <div v-for="i in 6" :key="i" class="card group hover:border-primary transition-colors cursor-pointer">
            <div class="h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden relative">
                <!-- Placeholder Image -->
                <div class="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-800">صورة الخبر</div>
            </div>
            <span class="text-primary text-sm font-bold block mb-2">السوق المحلي</span>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">عنوان خبر اقتصادي مهم جداً يؤثر على السوق رقم {{ i }}</h3>
            <p class="text-gray-400 text-sm line-clamp-2">ملخص سريع للخبر يوضح التفاصيل الرئيسية وتأثيره المحتمل على الشركات المدرجة...</p>
            <div class="mt-4 flex justify-between items-center text-xs text-gray-500">
                <span>قبل {{ i }} ساعات</span>
                <span>رويترز</span>
            </div>
        </div>
    </div>
  </div>
</template>
