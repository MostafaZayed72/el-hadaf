<script setup>
const links = [
  { name: 'الرئيسية', path: '/' },
  { name: 'مجتمع المتداولين', path: '/community' },
  { name: 'الأخبار', path: '/news' },
  { name: 'بيانات الأسهم', path: '/stocks' },
  { name: 'التحليل الفني', path: '/analysis' },
  { name: 'التقارير', path: '/reports' },
  { name: 'تعليم', path: '/education' },
  { name: 'استشارات', path: '/consulting' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark text-white font-sans">
    <!-- Header -->
    <header class="bg-dark-card/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-primary flex items-center gap-2">
          <span class="text-3xl">🎯</span>
          <span>قناة الهدف</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <NuxtLink 
            v-for="link in links" 
            :key="link.path" 
            :to="link.path"
            class="text-gray-300 hover:text-primary transition-colors font-medium relative group"
            active-class="text-primary"
          >
            {{ link.name }}
            <span class="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
            <button class="btn btn-primary">تسجيل الدخول</button>
            <button class="lg:hidden text-white">
                <!-- Mobile Menu Icon (Placeholder) -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-card border-t border-gray-800 mt-auto">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand -->
            <div>
                <h3 class="text-xl font-bold text-primary mb-4">قناة الهدف</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                    منصتك الأولى لتحليل وتداول الأسهم الكويتية. نقدم تحليلات فنية، أخبار اقتصادية، ومجتمع متفاعل للمتداولين.
                </p>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h4 class="font-bold text-white mb-4">روابط سريعة</h4>
                <ul class="space-y-2 text-gray-400">
                    <li><NuxtLink to="/about" class="hover:text-primary">من نحن</NuxtLink></li>
                    <li><NuxtLink to="/contact" class="hover:text-primary">اتصل بنا</NuxtLink></li>
                    <li><NuxtLink to="/privacy" class="hover:text-primary">سياسة الخصوصية</NuxtLink></li>
                </ul>
            </div>

            <!-- Contact -->
             <div>
                <h4 class="font-bold text-white mb-4">تواصل معنا</h4>
                <ul class="space-y-2 text-gray-400">
                    <li>support@alhadaf.com</li>
                    <li>+965 1234 5678</li>
                </ul>
            </div>
            
             <!-- Newsletter -->
            <div>
                 <h4 class="font-bold text-white mb-4">النشرة البريدية</h4>
                 <div class="flex gap-2">
                     <input type="email" placeholder="بريدك الإلكتروني" class="input text-sm">
                     <button class="btn btn-primary px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                     </button>
                 </div>
            </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2024 قناة الهدف. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  </div>
</template>
