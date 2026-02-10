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
  <div class="container mx-auto px-4 py-8 max-w-7xl">
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
                <tr class="bg-primary/10 border-b border-border-color">
                    <th class="p-4 text-page-text font-bold">الرمز</th>
                    <th class="p-4 text-page-text font-bold">اسم الشركة</th>
                    <th class="p-4 text-page-text font-bold">آخر سعر</th>
                    <th class="p-4 text-page-text font-bold">التغيير</th>
                    <th class="p-4 text-page-text font-bold">حجم التداول</th>
                    <th class="p-4 text-page-text font-bold">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks" :key="stock.id" class="border-b border-border-color hover:bg-primary/5 transition-colors">
                    <td class="p-4 font-bold text-primary">{{ stock.symbol }}</td>
                    <td class="p-4 font-bold text-page-text">{{ stock.name }}</td>
                    <td class="p-4 font-mono text-page-text">{{ stock.price.toFixed(3) }}</td>
                    <td class="p-4 font-mono dir-ltr" :class="stock.change > 0 ? 'text-bull' : (stock.change < 0 ? 'text-bear' : 'text-text-secondary')">
                        {{ stock.change > 0 ? '+' : '' }}{{ stock.change.toFixed(3) }}
                    </td>
                    <td class="p-4 font-mono text-text-secondary">{{ stock.vol }}</td>
                    <td class="p-4">
                        <NuxtLink :to="`/analysis?symbol=${stock.symbol}`" class="text-primary hover:underline text-xs">تحليل</NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
