<script setup>
useHead({
  title: 'قناة الهدف - الرئيسية',
  meta: [
    { name: 'description', content: 'منصتك الأولى لتحليل وتداول الأسهم الكويتية' }
  ]
})

// Mock Data
const latestNews = [
    { id: 1, title: 'ارتفاع مؤشر السوق الأول بنسبة 1.5%', time: 'منذ ساعة' },
    { id: 2, title: 'البنك الوطني يعلن عن أرباح قياسية في الربع الثالث', time: 'منذ ساعتين' },
    { id: 3, title: 'زين الكويتية تستحوذ على شركة تقنية جديدة', time: 'منذ 3 ساعات' },
]

const marketSummary = [
    { label: 'المؤشر العام', value: '7,234.50', change: '+24.5', changePercent: '0.34%', isUp: true },
    { label: 'السوق الأول', value: '8,120.10', change: '-12.3', changePercent: '-0.15%', isUp: false },
    { label: 'السوق الرئيسي', value: '5,450.20', change: '+5.6', changePercent: '0.10%', isUp: true },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-secondary to-dark pb-20 pt-10 overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div class="container relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
                استثمر بذكاء مع <br/>
                <span class="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-primary-dark">قناة الهدف</span>
            </h1>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                منصتك الشاملة لتحليل الأسهم الكويتية. رؤى فنية دقيقة، أخبار لحظية، ومجتمع متفاعل من المتداولين المحترفين.
            </p>
            <div class="flex justify-center gap-4">
                <NuxtLink to="/community" class="btn btn-primary text-lg px-8 py-3">انضم للمجتمع</NuxtLink>
                <NuxtLink to="/analysis" class="btn bg-dark-input hover:bg-gray-700 text-white text-lg px-8 py-3 border border-gray-600">تصفح التحليلات</NuxtLink>
            </div>
        </div>
    </section>

    <!-- Market Ticker / Summary -->
    <div class="bg-dark-card border-y border-gray-800">
        <div class="container py-4">
            <div class="flex flex-wrap justify-between items-center gap-4 text-sm">
                <div v-for="(item, index) in marketSummary" :key="index" class="flex items-center gap-3">
                    <span class="text-gray-400 font-bold">{{ item.label }}</span>
                    <span class="text-white font-mono text-lg">{{ item.value }}</span>
                    <span :class="item.isUp ? 'text-bull' : 'text-bear'" class="flex items-center text-xs font-bold bg-opacity-10 px-2 py-0.5 rounded" :style="{ backgroundColor: item.isUp ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)' }">
                         {{ item.isUp ? '▲' : '▼' }} {{ item.change }} ({{ item.changePercent }})
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Breaking News -->
    <section class="container py-12">
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Latest News List -->
            <div class="md:w-2/3">
                <h2 class="text-2xl font-bold mb-6 border-r-4 border-primary pr-4">آخر أخبار السوق</h2>
                <div class="space-y-4">
                    <div v-for="news in latestNews" :key="news.id" class="card hover:border-gray-600 cursor-pointer group transition-all">
                        <div class="flex justify-between items-start">
                             <h3 class="font-bold text-lg group-hover:text-primary transition-colors">{{ news.title }}</h3>
                             <span class="text-xs text-gray-500 whitespace-nowrap">{{ news.time }}</span>
                        </div>
                        <p class="text-gray-400 text-sm mt-2">تفاصيل الخبر وتأثيره على السوق...</p>
                    </div>
                </div>
                 <div class="mt-6 text-center md:text-right">
                    <NuxtLink to="/news" class="text-primary hover:text-primary-light font-bold">عرض كل الأخبار ←</NuxtLink>
                </div>
            </div>

            <!-- Side Widgets (Top Gainers/Losers placeholder) -->
            <div class="md:w-1/3 space-y-6">
                <div class="card">
                     <h3 class="font-bold mb-4 text-bull">الأكثر ارتفاعاً ▲</h3>
                     <ul class="space-y-3">
                         <li class="flex justify-between text-sm"><span class="text-gray-300">وطني</span> <span class="text-bull font-mono">+1.5%</span></li>
                         <li class="flex justify-between text-sm"><span class="text-gray-300">بيتك</span> <span class="text-bull font-mono">+1.2%</span></li>
                         <li class="flex justify-between text-sm"><span class="text-gray-300">زين</span> <span class="text-bull font-mono">+0.9%</span></li>
                     </ul>
                </div>
                <div class="card">
                     <h3 class="font-bold mb-4 text-bear">الأكثر انخفاضاً ▼</h3>
                     <ul class="space-y-3">
                         <li class="flex justify-between text-sm"><span class="text-gray-300">أجيليتي</span> <span class="text-bear font-mono">-1.1%</span></li>
                         <li class="flex justify-between text-sm"><span class="text-gray-300">صناعات</span> <span class="text-bear font-mono">-0.8%</span></li>
                     </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="bg-dark-card py-20 border-t border-gray-800">
        <div class="container text-center">
             <h2 class="text-3xl font-bold mb-12">لماذا قناة الهدف؟</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="p-6">
                     <div class="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">📊</div>
                     <h3 class="text-xl font-bold mb-3 text-white">تحليل فني دقيق</h3>
                     <p class="text-gray-400">توصيات مبنية على دراسة متعمقة لرسوم البيانية ومؤشرات الزخم.</p>
                 </div>
                 <div class="p-6">
                     <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">👥</div>
                     <h3 class="text-xl font-bold mb-3 text-white">مجتمع متفاعلين</h3>
                     <p class="text-gray-400">شارك أفكارك وناقش استراتيجيات التداول مع نخبة من المستثمرين.</p>
                 </div>
                  <div class="p-6">
                     <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">📚</div>
                     <h3 class="text-xl font-bold mb-3 text-white">محتوى تعليمي</h3>
                     <p class="text-gray-400">دروس ومقالات تناسب جميع المستويات من المبتدئ إلى المحترف.</p>
                 </div>
             </div>
        </div>
    </section>
  </div>
</template>
