<script setup>
useHead({ title: 'أخبار السوق - قناة الهدف' })

const newsItems = [
    {
        id: 1,
        title: 'البورصة الكويتية تغلق على ارتفاع بدعم من القطاع المصرفي',
        summary: 'أنهت بورصة الكويت تعاملات اليوم على ارتفاع ملحوظ، مدفوعة بعمليات شراء قوية على أسهم البنوك القيادية، وسط تفاؤل بإعلانات الأرباح الربع سنوية.',
        image: '/images/kuwait-skyline.png',
        source: 'رويترز',
        time: 'منذ ساعتين',
        category: 'سوق محلي'
    },
    {
        id: 2,
        title: 'ارتفاع أسعار النفط يعزز ميزانية الدولة وتوقعات بزيادة الإنفاق',
        summary: 'سجلت أسعار النفط الكويتي ارتفاعاً جديداً لتتجاوز حاجز 85 دولاراً للبرميل، مما يبشر بتقلص العجز المتوقع في الميزانية العامة وزيادة في الإنفاق الرأسمالي.',
        image: '/images/oil-refinery.png',
        source: 'كونا',
        time: 'منذ 4 ساعات',
        category: 'طاقة'
    },
    {
        id: 3,
        title: 'توقعات باستمرار "السوق الصاعد" مع تدفق السيولة الأجنبية',
        summary: 'أظهرت تقارير حديثة زيادة في تدفقات الاستثمار الأجنبي إلى السوق الأول، مما يعزز التوقعات باستمرار الاتجاه الصاعد للمؤشر العام خلال الفترة القادمة.',
        image: '/images/bull-market.png',
        source: 'بلومبيرغ',
        time: 'منذ 6 ساعات',
        category: 'تحليل'
    },
    {
        id: 4,
        title: 'هيئة الاستثمار تعلن عن استراتيجية جديدة لتنويع المحفظة',
        summary: 'كشفت الهيئة العامة للاستثمار عن خطط لزيادة استثماراتها في قطاعات التكنولوجيا والطاقة المتجددة، ضمن استراتيجية طويلة المدى لتنويع مصادر الدخل.',
        image: '/images/kuwait-skyline.png',
        source: 'القبس',
        time: 'منذ يوم',
        category: 'اقتصاد'
    },
     {
        id: 5,
        title: 'مشروع مصفاة الزور يحقق أرقاماً قياسية في التصدير',
        summary: 'أعلنت شركة البترول الوطنية عن تحقيق مصفاة الزور لمعدلات تصدير قياسية للمشتقات النفطية عالية الجودة، مما يعزز مكانة الكويت في سوق الطاقة العالمي.',
        image: '/images/oil-refinery.png',
        source: 'الأنباء',
        time: 'منذ يومين',
        category: 'طاقة'
    },
    {
        id: 6,
        title: 'أرباح الشركات المدرجة تتجاوز التوقعات في النصف الأول',
        summary: 'أظهرت البيانات المالية المجمعة للشركات المدرجة نمواً بنسبة 15% في صافي الأرباح مقارنة بالعام الماضي، بقيادة قطاعي الاستثمار والعقار.',
        image: '/images/bull-market.png',
        source: 'مباشر',
        time: 'منذ يومين',
        category: 'شركات'
    }
]
</script>

<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8 border-r-4 border-primary pr-4">الأخبار الاقتصادية</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- News Items -->
        <div v-for="news in newsItems" :key="news.id" class="card group hover:border-primary transition-colors cursor-pointer overflow-hidden flex flex-col h-full">
            <div class="h-48 bg-gray-800 mb-4 overflow-hidden relative">
                <img :src="news.image" :alt="news.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute top-2 right-2 bg-dark-card/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary border border-primary/30">
                    {{ news.category }}
                </div>
            </div>
            
            <div class="flex-grow flex flex-col px-2 pb-2">
                 <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {{ news.title }}
                </h3>
                <p class="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {{ news.summary }}
                </p>
                <div class="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center text-xs text-gray-500">
                    <span class="flex items-center gap-1">🕒 {{ news.time }}</span>
                    <span class="font-bold text-gray-400">{{ news.source }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
