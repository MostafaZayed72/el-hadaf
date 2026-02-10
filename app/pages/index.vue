<template>
  <div class="w-full overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] shadow-lg mb-0">
        <!-- Background Pattern -->
        <div class="absolute inset-0 z-0 bg-page-bg">
             <!-- Grid Pattern -->
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#C5A038 1px, transparent 1px); background-size: 30px 30px;"></div>
            <!-- Glow Effects -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(197,160,56,0.15),transparent_70%)]"></div>
            <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-page-bg to-transparent"></div>
        </div>

        <div class="container mx-auto relative z-10 text-center px-4 sm:px-6 max-w-6xl">
            <div class="mb-8 flex justify-center">
                 <div class="relative group">
                    <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse group-hover:bg-primary/40 transition-all duration-500"></div>
                    <img src="/logo.png" alt="قناة الهدف" class="relative h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full object-cover bg-white p-1 border-4 border-primary shadow-2xl transform transition-transform duration-500 group-hover:scale-105" />
                 </div>
            </div>

            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight drop-shadow-lg transition-colors duration-300">
                استثمر بذكاء مع <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-primary-light animate-gradient">قناة الهدف</span>
            </h1>
            
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light drop-shadow-md transition-colors duration-300 px-2">
                منصتك الشاملة لتحليل الأسهم الكويتية. رؤى فنية دقيقة، أخبار لحظية، ومجتمع متفاعل من المتداولين المحترفين.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 max-w-md mx-auto sm:max-w-none">
                <NuxtLink to="/community" class="btn btn-primary text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 shadow-lg shadow-primary/30 hover:scale-105 transition-transform w-full sm:w-auto">
                    انضم للمجتمع
                </NuxtLink>
                <NuxtLink to="/analysis" class="btn bg-white/10 backdrop-blur-md hover:bg-white/20 text-gray-900 dark:text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-gray-300 dark:border-white/30 transition-all hover:scale-105 w-full sm:w-auto">
                    تصفح التحليلات
                </NuxtLink>
            </div>
        </div>
    </section>

    <!-- Market Summary -->
    <section class="bg-card border-y border-border-color transition-colors duration-300 py-6 sm:py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div class="flex flex-col items-center gap-2 p-4">
                    <span class="text-text-secondary font-bold text-xs sm:text-sm">المؤشر العام</span>
                    <span class="text-page-text font-mono text-xl sm:text-2xl font-bold">7,234.50</span>
                    <span class="text-bull flex items-center text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-bull/10">
                         ▲ +24.5 (0.34%)
                    </span>
                </div>
                <div class="flex flex-col items-center gap-2 p-4">
                    <span class="text-text-secondary font-bold text-xs sm:text-sm">السوق الأول</span>
                    <span class="text-page-text font-mono text-xl sm:text-2xl font-bold">8,120.10</span>
                    <span class="text-bear flex items-center text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-bear/10">
                         ▼ -12.3 (-0.15%)
                    </span>
                </div>
                <div class="flex flex-col items-center gap-2 p-4">
                    <span class="text-text-secondary font-bold text-xs sm:text-sm">السوق الرئيسي</span>
                    <span class="text-page-text font-mono text-xl sm:text-2xl font-bold">5,450.20</span>
                    <span class="text-bull flex items-center text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-bull/10">
                         ▲ +5.6 (0.10%)
                    </span>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="py-12 sm:py-16 md:py-20">
        <div class="container mx-auto px-4 max-w-6xl">
             <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-page-text">لماذا قناة الهدف؟</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                 <div class="card text-center p-6 hover:shadow-xl transition-shadow">
                     <div class="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">📊</div>
                     <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-page-text">تحليل فني دقيق</h3>
                     <p class="text-sm sm:text-base text-text-secondary leading-relaxed">توصيات مبنية على دراسة متعمقة للرسوم البيانية ومؤشرات الزخم</p>
                 </div>
                 <div class="card text-center p-6 hover:shadow-xl transition-shadow">
                     <div class="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">👥</div>
                     <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-page-text">مجتمع متفاعل</h3>
                     <p class="text-sm sm:text-base text-text-secondary leading-relaxed">شارك أفكارك وناقش استراتيجيات التداول مع نخبة من المستثمرين</p>
                 </div>
                  <div class="card text-center p-6 hover:shadow-xl transition-shadow">
                     <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">📚</div>
                     <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-page-text">محتوى تعليمي</h3>
                     <p class="text-sm sm:text-base text-text-secondary leading-relaxed">دروس ومقالات تناسب جميع المستويات من المبتدئ إلى المحترف</p>
                 </div>
             </div>
        </div>
    </section>

    <!-- Latest News -->
    <section class="bg-card py-12 sm:py-16 border-t border-border-color transition-colors duration-300">
        <div class="container mx-auto px-4 max-w-6xl">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-page-text">آخر الأخبار</h2>
            <div class="space-y-4">
                <div class="card p-4 sm:p-6 hover:border-primary transition-all cursor-pointer">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                         <h3 class="font-bold text-base sm:text-lg text-page-text">ارتفاع مؤشر السوق الأول بنسبة 1.5%</h3>
                         <span class="text-xs text-text-secondary">منذ ساعة</span>
                    </div>
                    <p class="text-sm text-text-secondary">تفاصيل الخبر وتأثيره على السوق...</p>
                </div>
                <div class="card p-4 sm:p-6 hover:border-primary transition-all cursor-pointer">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                         <h3 class="font-bold text-base sm:text-lg text-page-text">البنك الوطني يعلن عن أرباح قياسية</h3>
                         <span class="text-xs text-text-secondary">منذ ساعتين</span>
                    </div>
                    <p class="text-sm text-text-secondary">تفاصيل الخبر وتأثيره على السوق...</p>
                </div>
            </div>
            <div class="mt-6 text-center">
                <NuxtLink to="/news" class="text-primary hover:text-primary-light font-bold">
                    عرض كل الأخبار ←
                </NuxtLink>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-20">
        <div class="container mx-auto px-4 max-w-4xl">
            <div class="card p-8 sm:p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-page-text">ابدأ رحلتك الاستثمارية اليوم</h2>
                <p class="text-base sm:text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                    انضم إلى آلاف المستثمرين الذين يثقون بتحليلاتنا وتوصياتنا
                </p>
                <NuxtLink to="/community" class="btn btn-primary text-lg px-8 py-4 inline-block">
                    انضم الآن مجاناً
                </NuxtLink>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No complex logic needed for landing page
</script>

<style scoped>
.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
</style>
