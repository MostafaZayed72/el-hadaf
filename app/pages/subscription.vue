<script setup>
useHead({ title: 'الاشتراك الذهبي ودعم القناة - قناة الهدف' })

// State for FAQ Accordion
const activeFaq = ref(null)
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// FAQs Data
const faqs = [
  {
    q: 'كيف يمكنني اختيار السهمين يومياً؟',
    a: 'يمكنك إرسال اسم أو رمز السهمين اللذين ترغب في تحليلهما يومياً في أي وقت قبل الساعة 8:00 مساءً بتوقيت الكويت، ليقوم فريق المحللين بإعداد تحليلهما لجلسة اليوم التالي.'
  },
  {
    q: 'متى وكيف سأحصل على التحليل الفني المخصص؟',
    a: 'يتم إرسال التحليلات الفنية والتقارير المخصصة لأسهمك المحددة مباشرة عبر تطبيق الواتساب (WhatsApp) على رقمك الشخصي، وذلك بشكل وافٍ ومفصل قبل بداية جلسة التداول اليومية.'
  },
  {
    q: 'كيف يتم تسديد قيمة الاشتراك وتفعيله؟',
    a: 'يتم تسديد قيمة الاشتراك (25 دينار كويتي شهرياً) عبر وسيلة التحويل التي تناسبك وتفضلها (مثل روابط الدفع كينت، التحويل البنكي المباشر، إلخ) بالتنسيق المباشر مع إدارة القناة عبر الواتساب، وليس من خلال الدفع التلقائي عبر الموقع.'
  },
  {
    q: 'هل يمكنني تغيير أسهمي اليومية بعد إرسالها؟',
    a: 'نعم، يمكنك تعديل اختيارك للأسهم وإرسال البدائل طالما كان ذلك قبل الساعة 8:00 مساءً من اليوم السابق للتداول.'
  },
  {
    q: 'كيف يساهم هذا الاشتراك في دعم القناة؟',
    a: 'قيمة الاشتراك (25 دينار كويتي) تذهب بالكامل لتمويل أدوات التحليل الفني المتقدمة، حجز الخوادم السريعة، وتغطية تكاليف فريق العمل لتقديم محتوى مجاني ومستمر على القناة.'
  }
]

// State for Stock Simulator
const mockStocks = [
  { symbol: 'NBK', name: 'بنك الكويت الوطني', price: '0.850 د.ك', change: '+1.2%', isUp: true },
  { symbol: 'KFH', name: 'بيت التمويل الكويتي (بيتك)', price: '0.720 د.ك', change: '+2.4%', isUp: true },
  { symbol: 'ZAIN', name: 'مجموعة زين للاتصالات', price: '0.490 د.ك', change: '-0.8%', isUp: false },
  { symbol: 'AGLTY', name: 'أجيليتي للمخازن العمومية', price: '0.285 د.ك', change: '+0.5%', isUp: true },
  { symbol: 'INDUSTRIES', name: 'مجموعة الصناعات الوطنية', price: '0.198 د.ك', change: '-1.5%', isUp: false },
  { symbol: 'GFH', name: 'مجموعة جي إف إتش المالية', price: '0.082 د.ك', change: '+3.1%', isUp: true }
]

const selectedStocks = ref([])
const showAnalysisPreview = ref(false)
const generatingAnalysis = ref(false)

const toggleStockSelection = (stock) => {
  const index = selectedStocks.value.findIndex(s => s.symbol === stock.symbol)
  if (index > -1) {
    selectedStocks.value.splice(index, 1)
  } else {
    if (selectedStocks.value.length < 2) {
      selectedStocks.value.push(stock)
    }
  }
}

const generatePreview = () => {
  if (selectedStocks.value.length !== 2) return
  generatingAnalysis.value = true
  showAnalysisPreview.value = false
  setTimeout(() => {
    generatingAnalysis.value = false
    showAnalysisPreview.value = true
  }, 1500)
}

// Payment Modal State
const isPaymentModalOpen = ref(false)
const paymentStep = ref('details') // 'details', 'processing', 'success'
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const paymentMethod = ref('knet') // 'knet', 'card'

const openPaymentModal = () => {
  isPaymentModalOpen.value = true
  paymentStep.value = 'details'
}

const handlePaymentSubmit = () => {
  paymentStep.value = 'processing'
  setTimeout(() => {
    paymentStep.value = 'success'
  }, 2000)
}

const closePaymentModal = () => {
  isPaymentModalOpen.value = false
  paymentStep.value = 'details'
  cardNumber.value = ''
  cardName.value = ''
  cardExpiry.value = ''
  cardCvv.value = ''
}
</script>

<template>
  <div class="relative overflow-hidden bg-page-bg text-page-text min-h-screen py-12 md:py-20 transition-colors duration-300">
    
    <!-- Background glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="absolute bottom-10 right-10 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none z-0"></div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      
      <!-- Hero Section -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-right mt-6">
        <div class="lg:col-span-7 flex flex-col items-start text-right">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 animate-pulse">
            ✨ العضوية الذهبية لدعم القناة
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">
            ادعم قناتك المفضلة <br />
            واحصل على تحليلات مخصصة لأسهمك يومياً
          </h1>
          <p class="text-base md:text-lg text-text-secondary mb-10 leading-relaxed max-w-xl">
            مقابل دعم القناة بـ 
            <span class="text-primary font-bold text-xl underline decoration-wavy decoration-primary-light/40">25 دينار كويتي</span> 
            شهرياً، يمكنك اختيار سهمين يومياً ليقوما محللونا الفنيون بتحليلهما لك خصيصاً لمساعدتك في اتخاذ قرارات تداول مدروسة.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
            <button 
              @click="openPaymentModal"
              class="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-dark shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              <span>اشترك الآن وادعم القناة</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transition-transform group-hover:translate-x-[-4px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            
            <a 
              href="#simulator" 
              class="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold border-2 border-border-color bg-card/40 backdrop-blur-sm text-page-text hover:bg-card/80 transition-all duration-300 text-center"
            >
              جرب محاكاة الخدمة
            </a>
          </div>
        </div>

        <!-- Hero Image Mockup -->
        <div class="lg:col-span-5 relative w-full flex justify-center items-center">
          <div class="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div class="relative overflow-hidden rounded-2xl border border-primary/20 shadow-2xl bg-card p-1.5 group hover:border-primary/40 transition-colors duration-300 w-full max-w-[450px]">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none z-10"></div>
            <img src="/images/hero-chart.png" alt="تحليلات الأسهم" class="rounded-xl w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500" />
            <div class="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-primary/30 px-3.5 py-1.5 rounded-lg text-xs font-bold text-primary flex items-center gap-1.5 shadow-md z-20">
              <span class="w-2 h-2 rounded-full bg-bull animate-ping"></span>
              <span>تحليلات حية وتحديثات لحظية</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Monthly Support Progress Goal Bar -->
      <section class="max-w-4xl mx-auto mb-20 bg-card/60 backdrop-blur-md rounded-2xl p-6 border border-border-color/70 shadow-lg">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-bold text-text-primary text-base md:text-lg">هدف الدعم الجماعي لهذا الشهر 🎯</h3>
          <span class="text-sm font-bold text-primary">78 من 100 مشترك ذهبي</span>
        </div>
        <div class="w-full bg-border-color/40 rounded-full h-4 overflow-hidden p-0.5 mb-2">
          <div class="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-1000" style="width: 78%"></div>
        </div>
        <p class="text-xs text-text-secondary text-right">
          ساعدنا في الوصول لهدفنا لتوظيف محلل إضافي بدوام كامل لخدمتكم بشكل أسرع! متبقي 22 مشترك فقط.
        </p>
      </section>

      <!-- How it Works & Features Section -->
      <section class="mb-24">
        <h2 class="text-3xl font-bold text-center mb-4">كيف تعمل ميزة التحليل المخصص؟</h2>
        <p class="text-text-secondary text-center max-w-2xl mx-auto mb-12">ثلاث خطوات بسيطة تفصلك عن الحصول على أفضل تحليل فني مخصص لأسهمك في البورصة الكويتية.</p>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Steps list -->
          <div class="lg:col-span-7 space-y-6">
            <!-- Step 1 -->
            <div class="card flex gap-4 p-5 hover:border-primary/40 transition-colors">
              <div class="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-base font-bold">01</div>
              <div>
                <h3 class="font-bold text-base text-text-primary mb-1">اشترك وادعم القناة</h3>
                <p class="text-text-secondary text-xs leading-relaxed">
                  قم بتفعيل اشتراكك الذهبي بقيمة 25 دينار كويتي شهرياً لتساهم مباشرة في دعم وتطوير محتوى القناة.
                </p>
              </div>
            </div>
            <!-- Step 2 -->
            <div class="card flex gap-4 p-5 hover:border-primary/40 transition-colors">
              <div class="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-base font-bold">02</div>
              <div>
                <h3 class="font-bold text-base text-text-primary mb-1">اختر سهمين يومياً</h3>
                <p class="text-text-secondary text-xs leading-relaxed">
                  من خلال لوحة تحكم المشترك، حدد السهمين اللذين ترغب في قيام خبرائنا بتحليلهما الفني والمالي خصيصاً لك.
                </p>
              </div>
            </div>
            <!-- Step 3 -->
            <div class="card flex gap-4 p-5 hover:border-primary/40 transition-colors">
              <div class="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-base font-bold">03</div>
              <div>
                <h3 class="font-bold text-base text-text-primary mb-1">احصل على تحليلك المفصل</h3>
                <p class="text-text-secondary text-xs leading-relaxed">
                  قبل انطلاق جلسة التداول، ستتلقى شارات فنية تفصيلية ونقاط الدخول والمقاومة والستوب مباشرة في حسابك.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Mockup image -->
          <div class="lg:col-span-5 w-full flex justify-center">
            <div class="relative overflow-hidden rounded-2xl border border-border-color shadow-xl bg-card p-1.5 w-full max-w-[380px] group hover:border-primary/30 transition-colors duration-300">
              <img src="/images/analysis-mock.png" alt="نموذج التقرير الفني" class="rounded-xl w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              <span class="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded">معاينة لوحة تحليل المشتركين</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Stock Simulator Section (Interactive Feature) -->
      <section id="simulator" class="mb-24 py-12 px-6 bg-card/40 backdrop-blur-md border border-border-color rounded-2xl">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-3">محاكي لوحة تحكم المشتركين 📊</h2>
            <p class="text-text-secondary text-sm">جرب الميزة بنفسك الآن! اختر سهمين من القائمة أدناه واضغط على زر التوليد لمعاينة التحليل المخصص.</p>
          </div>

          <!-- Selection List -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <button 
              v-for="stock in mockStocks" 
              :key="stock.symbol"
              @click="toggleStockSelection(stock)"
              class="p-4 rounded-xl border-2 text-right transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              :class="[
                selectedStocks.some(s => s.symbol === stock.symbol)
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border-color bg-card/60 hover:border-primary/30'
              ]"
            >
              <div>
                <span class="text-xs text-text-secondary block mb-1 font-bold">{{ stock.symbol }}</span>
                <span class="font-bold text-sm block text-text-primary mb-2 line-clamp-1">{{ stock.name }}</span>
              </div>
              <div class="flex justify-between items-center mt-2 border-t border-border-color/30 pt-2">
                <span class="text-xs font-bold text-text-primary">{{ stock.price }}</span>
                <span 
                  class="text-xs font-semibold"
                  :class="stock.isUp ? 'text-bull' : 'text-bear'"
                >
                  {{ stock.change }}
                </span>
              </div>

              <!-- Check badge -->
              <span 
                v-if="selectedStocks.some(s => s.symbol === stock.symbol)"
                class="absolute top-2 left-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
              >
                ✓
              </span>
            </button>
          </div>

          <!-- Selection Bar -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-xl border border-border-color">
            <div class="text-right">
              <span class="text-xs text-text-secondary block">الأسهم المحددة حالياً:</span>
              <div class="flex gap-2 mt-1 min-h-[28px] items-center">
                <span 
                  v-for="stock in selectedStocks" 
                  :key="stock.symbol"
                  class="text-xs font-bold bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded-md"
                >
                  {{ stock.name }}
                </span>
                <span v-if="selectedStocks.length === 0" class="text-xs text-red-500 font-semibold">لم تقم باختيار أي سهم بعد (اختر سهمين)</span>
                <span v-else-if="selectedStocks.length === 1" class="text-xs text-yellow-500 font-semibold">اختر سهماً واحداً إضافياً</span>
              </div>
            </div>

            <button 
              @click="generatePreview"
              :disabled="selectedStocks.length !== 2 || generatingAnalysis"
              class="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300"
              :class="[
                selectedStocks.length === 2 && !generatingAnalysis
                  ? 'bg-primary text-white hover:bg-primary-dark shadow-md cursor-pointer'
                  : 'bg-border-color text-text-secondary cursor-not-allowed'
              ]"
            >
              <span v-if="generatingAnalysis">جاري إعداد التحليل الفني...</span>
              <span v-else>معاينة التحليل المخصص 🔍</span>
            </button>
          </div>

          <!-- Analysis Loading/Preview Card -->
          <div v-if="generatingAnalysis" class="mt-8 flex justify-center py-10">
            <div class="flex flex-col items-center gap-4">
              <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p class="text-sm text-text-secondary animate-pulse">يقوم الخبير الفني بتحليل الشارت وحساب مستويات الفيبوناتشي والمؤشرات لأسهمك المحددة...</p>
            </div>
          </div>

          <!-- Premium Analysis Output Card -->
          <div v-if="showAnalysisPreview" class="mt-8 border border-primary/30 bg-card rounded-xl p-6 shadow-xl relative overflow-hidden animate-gradient">
            <div class="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-primary to-primary-light"></div>
            
            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-xs bg-primary/20 text-primary px-2.5 py-1 rounded font-bold">عينة تقرير مخصص وحصري</span>
                <h3 class="text-xl font-bold mt-2 text-text-primary">التحليل الفني للأسهم المحددة</h3>
              </div>
              <span class="text-xs text-text-secondary">تاريخ التقرير: اليوم</span>
            </div>

            <!-- Dynamic content for chosen stocks -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(stock, idx) in selectedStocks" :key="stock.symbol" class="p-4 rounded-xl bg-page-bg border border-border-color">
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    <span class="font-bold text-text-primary text-sm">{{ stock.name }}</span>
                  </div>
                  <span class="text-xs font-bold bg-secondary/10 text-secondary-light px-2 py-0.5 rounded">{{ stock.symbol }}</span>
                </div>

                <!-- Simulated Chart -->
                <div class="h-28 bg-card rounded border border-border-color/50 flex items-end justify-between px-3 py-2 mb-4 relative overflow-hidden">
                  <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <!-- Green bars for up stocks, red for down simulation -->
                  <div class="w-3 bg-bull h-[40%] rounded-t-sm"></div>
                  <div class="w-3 bg-bear h-[60%] rounded-t-sm"></div>
                  <div class="w-3 bg-bull h-[80%] rounded-t-sm"></div>
                  <div class="w-3 bg-bull h-[70%] rounded-t-sm"></div>
                  <div class="w-3 bg-bear h-[50%] rounded-t-sm"></div>
                  <div class="w-3 bg-bull h-[90%] rounded-t-sm"></div>
                  <div class="w-3 bg-bull h-[100%] rounded-t-sm relative">
                    <span class="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
                  </div>
                </div>

                <!-- Analysis Details -->
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-text-secondary">القرار الفني المتوقع:</span>
                    <span class="font-bold text-bull">شراء قوي (اختراق إيجابي)</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">نقطة الدخول المقترحة:</span>
                    <span class="font-bold text-primary">{{ stock.price }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">الهدف الأول:</span>
                    <span class="font-bold text-text-primary">مستهدف صعودي +5.4%</span>
                  </div>
                  <div class="flex justify-between border-t border-border-color/30 pt-2 mt-2">
                    <span class="text-text-secondary">وقف الخسارة:</span>
                    <span class="font-bold text-bear">إغلاق أسفل الدعم الحالي بـ 2%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom Analyst General Note -->
            <div class="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 text-xs leading-relaxed text-text-secondary">
              <span class="font-bold text-primary block mb-1">✍️ تعليق المحلل الفني:</span>
              بناءً على اختيارك للأسهم أعلاه، نلاحظ تشكل نموذج فني إيجابي مدعوماً بزيادة في أحجام التداول. نوصي بمراقبة الدعم المذكور وتفعيل جني الأرباح التدريجي عند الم targets المحددة.
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section (CTA Card) -->
      <section class="mb-24 text-center">
        <h2 class="text-3xl font-bold mb-4">اشترك الآن وابدأ في توجيه أسهمك</h2>
        <p class="text-text-secondary max-w-lg mx-auto mb-10 text-sm">كن شريكاً في نجاح القناة وحافظ على تفوق محفظتك الاستثمارية بتحليلات مخصصة.</p>

        <!-- Pricing Card -->
        <div class="max-w-md mx-auto card border-2 border-primary bg-card/85 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <!-- Top badge -->
          <span class="absolute top-0 left-0 bg-primary text-white font-bold text-xs px-6 py-1.5 uppercase tracking-wider rounded-br-xl shadow-md">
            الأكثر طلباً
          </span>

          <div class="py-6">
            <h3 class="text-2xl font-black mb-2 text-text-primary">الاشتراك الذهبي لدعم القناة</h3>
            <p class="text-sm text-text-secondary mb-6">دعم مباشر وتطوير كامل للمحتوى</p>

            <div class="flex justify-center items-baseline gap-1 mb-8">
              <span class="text-5xl font-black text-primary">25</span>
              <span class="text-text-secondary font-semibold text-sm">د.ك / شهرياً</span>
            </div>

            <!-- Features List -->
            <ul class="text-right space-y-4 mb-8 max-w-[280px] mx-auto text-sm text-text-secondary font-medium">
              <li class="flex items-center gap-2.5">
                <span class="text-primary text-lg">✓</span>
                <span>تحليل مخصص لـ <strong>سهمين يومياً</strong></span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-primary text-lg">✓</span>
                <span>استلام التحليلات مباشرة عبر الواتساب</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-primary text-lg">✓</span>
                <span>نقاط الدخول، المقاومة، ووقف الخسارة</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-primary text-lg">✓</span>
                <span>تحديث الشارتات للأسهم الفورية</span>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-primary text-lg">✓</span>
                <span>دعم مباشر لنمو واستمرار القناة</span>
              </li>
            </ul>

            <button 
              @click="openPaymentModal"
              class="w-full btn btn-primary py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform"
            >
              ادعم واشترك الآن
            </button>
            <p class="text-xs text-text-secondary mt-3">تحويل قيمة الدعم بالطريقة المناسبة لك</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="max-w-4xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-center mb-10">الأسئلة الشائعة حول الاشتراك ❓</h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="card p-0 overflow-hidden border border-border-color hover:border-primary/30 transition-colors"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 text-right font-bold text-text-primary flex justify-between items-center gap-4 bg-card/50 transition-colors hover:bg-card"
            >
              <span>{{ faq.q }}</span>
              <span class="text-primary text-xl font-bold transition-transform duration-300" :class="activeFaq === index ? 'rotate-45' : ''">
                ＋
              </span>
            </button>
            
            <div 
              class="transition-all duration-300 overflow-hidden"
              :class="activeFaq === index ? 'max-h-40 border-t border-border-color/30' : 'max-h-0'"
            >
              <p class="px-6 py-5 text-text-secondary text-sm leading-relaxed">
                {{ faq.a }}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Premium Interactive Payment Modal -->
    <div v-if="isPaymentModalOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="closePaymentModal"></div>
      
      <div class="relative bg-card w-full max-w-md rounded-2xl border border-primary/30 shadow-2xl overflow-hidden z-10 transition-colors duration-300">
        
        <!-- Header -->
        <div class="p-5 border-b border-border-color flex justify-between items-center">
          <h3 class="font-bold text-lg text-text-primary">تفعيل الاشتراك الذهبي ودعم القناة</h3>
          <button @click="closePaymentModal" class="text-text-secondary hover:text-red-500 text-xl font-bold">✕</button>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-center mb-6 bg-primary/5 p-4 rounded-xl border border-primary/20">
            <div class="text-right">
              <span class="text-xs font-semibold text-text-secondary block">العضوية الذهبية (دعم شهري)</span>
              <span class="text-xs text-text-secondary block mt-0.5">تحليل سهمين يومياً يرسل لواتسابك</span>
            </div>
            <span class="font-black text-2xl text-primary">25 د.ك</span>
          </div>

          <div class="space-y-4 mb-6">
            <h4 class="font-bold text-sm text-text-primary text-right">طريقة تفعيل الاشتراك 💳</h4>
            <p class="text-xs text-text-secondary leading-relaxed text-right">
              حرصاً على راحتك وتوفير خيارات دفع مرنة، يتم تحويل مبلغ الاشتراك بالطريقة التي تناسبك (رابط كي نت KNET مخصص، تحويل بنكي مباشر، أو غيرها من وسائل الدفع) وذلك بالتنسيق المباشر معنا.
            </p>
            
            <div class="p-4 bg-page-bg rounded-xl border border-border-color space-y-3 text-right">
              <div class="flex items-start gap-2.5">
                <span class="text-primary text-base">💬</span>
                <div>
                  <h5 class="font-bold text-xs text-text-primary">1. تواصل معنا على الواتساب</h5>
                  <p class="text-[11px] text-text-secondary mt-0.5">أرسل لنا لتأكيد رغبتك بالاشتراك.</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="text-primary text-base">🔗</span>
                <div>
                  <h5 class="font-bold text-xs text-text-primary">2. اختر طريقة التحويل المناسبة</h5>
                  <p class="text-[11px] text-text-secondary mt-0.5">سنرسل لك رابط دفع أو بيانات الحساب البنكي حسب رغبتك.</p>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="text-primary text-base">🟢</span>
                <div>
                  <h5 class="font-bold text-xs text-text-primary">3. تفعيل الخدمة الفوري</h5>
                  <p class="text-[11px] text-text-secondary mt-0.5">بمجرد التحويل، سيتم إدراج رقمك في قائمة المستلمين لتلقي التحليلات اليومية قبل الجلسة.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- WhatsApp CTA Button -->
          <a 
            href="https://wa.me/201099658770?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%82%D9%86%D8%A7%D8%A9%20%D8%A7%D9%84%D9%87%D8%AF%D9%81%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A%20(%D8%AF%D8%B9%D9%85%2025%20%D8%AF.%D9%8)" 
            target="_blank"
            class="w-full btn bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 group transition-all text-center"
          >
            <span>تواصل معنا لتأكيد الاشتراك وتلقي رابط الدفع 💬</span>
          </a>
          <p class="text-[10px] text-text-secondary text-center mt-2.5">سيتم فتح محادثة مباشرة مع إدارة قناة الهدف على الواتساب</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgba(197, 160, 56, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(197, 160, 56, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
