<script setup>
useHead({ title: 'التعليم - قناة الهدف' })
</script>

<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8 border-r-4 border-primary pr-4">أكاديمية الهدف</h1>

    <!-- Categories -->
    <div class="flex gap-4 mb-8 overflow-x-auto pb-4">
        <button class="btn btn-primary whitespace-nowrap">الكل</button>
        <button class="btn bg-dark-input hover:bg-gray-700 whitespace-nowrap">مبتدئ</button>
        <button class="btn bg-dark-input hover:bg-gray-700 whitespace-nowrap">تحليل فني</button>
        <button class="btn bg-dark-input hover:bg-gray-700 whitespace-nowrap">إدارة محافظ</button>
    </div>

    <!-- Courses/Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="card cursor-pointer group hover:-translate-y-1 transition-transform duration-300">
            <div class="h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-5xl">🎓</div>
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">درس فيديو</span>
                <span class="text-xs text-gray-500">15 دقيقة</span>
            </div>
            <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">مقدمة في الشموع اليابانية {{ i }}</h3>
            <p class="text-gray-400 text-sm mb-4">تعرف على أهم النماذج التي تتكرر في السوق وكيفية الاستفادة منها.</p>
            <button class="w-full btn bg-gray-700 hover:bg-gray-600 text-sm">بدء الدرس</button>
        </div>
    </div>
  </div>
</template>
