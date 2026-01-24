<script setup>
useHead({ title: 'بيانات الأسهم - قناة الهدف' })

const stocks = [
    { id: 1, symbol: 'NBK', name: 'بنك الكويت الوطني', price: 0.950, change: 0.005, vol: '2.5M' },
    { id: 2, symbol: 'KFH', name: 'بيت التمويل الكويتي', price: 0.720, change: -0.002, vol: '3.1M' },
    { id: 3, symbol: 'ZAIN', name: 'مجموعة زين', price: 0.505, change: 0.000, vol: '1.2M' },
    { id: 4, symbol: 'AGLTY', name: 'أجيليتي', price: 0.280, change: -0.010, vol: '500K' },
]
</script>

<template>
  <div class="container py-8">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold border-r-4 border-primary pr-4">بيانات الأسهم</h1>
        <div class="flex gap-2">
            <input type="text" placeholder="بحث عن شركة..." class="input w-64">
            <button class="btn btn-primary">بحث</button>
        </div>
    </div>

    <div class="card overflow-hidden">
        <table class="w-full text-right text-sm">
            <thead>
                <tr class="bg-gray-800/50 text-gray-400 border-b border-gray-700">
                    <th class="p-4">الرمز</th>
                    <th class="p-4">اسم الشركة</th>
                    <th class="p-4">آخر سعر</th>
                    <th class="p-4">التغيير</th>
                    <th class="p-4">حجم التداول</th>
                    <th class="p-4">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks" :key="stock.id" class="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                    <td class="p-4 font-bold text-primary">{{ stock.symbol }}</td>
                    <td class="p-4 font-bold text-white">{{ stock.name }}</td>
                    <td class="p-4 font-mono">{{ stock.price.toFixed(3) }}</td>
                    <td class="p-4 font-mono dir-ltr" :class="stock.change > 0 ? 'text-bull' : (stock.change < 0 ? 'text-bear' : 'text-gray-400')">
                        {{ stock.change > 0 ? '+' : '' }}{{ stock.change.toFixed(3) }}
                    </td>
                    <td class="p-4 font-mono text-gray-400">{{ stock.vol }}</td>
                    <td class="p-4">
                        <NuxtLink :to="`/analysis?symbol=${stock.symbol}`" class="text-primary hover:underline text-xs">تحليل</NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
