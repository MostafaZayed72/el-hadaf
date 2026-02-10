<script setup>
useHead({ title: 'التقارير الدورية - قناة الهدف' })

const reports = [
    { id: 1, title: 'تقرير السوق الأسبوعي - 24 يناير', date: '24/01/2026', type: 'أسبوعي' },
    { id: 2, title: 'ملخص تداولات جلسة الأحد', date: '21/01/2026', type: 'يومي' },
    { id: 3, title: 'تقرير أرباح القطاع المصرفي', date: '15/01/2026', type: 'خاص' },
]
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
     <h1 class="text-3xl font-bold mb-8 border-r-4 border-primary pr-4">التقارير الدورية</h1>
     
     <div class="space-y-4">
         <div v-for="report in reports" :key="report.id" class="card flex justify-between items-center group cursor-pointer hover:border-gray-600 transition-all">
             <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl">📄</div>
                 <div>
                     <h3 class="font-bold text-lg group-hover:text-primary transition-colors">{{ report.title }}</h3>
                     <span class="text-xs text-gray-500">{{ report.date }}</span>
                 </div>
             </div>
             <div class="flex items-center gap-3">
                 <span class="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{{ report.type }}</span>
                 <button class="btn btn-primary text-xs px-4">قراءة</button>
             </div>
         </div>
     </div>
  </div>
</template>
