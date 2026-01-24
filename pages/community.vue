<script setup>
useHead({
  title: 'قناة الهدف - مجتمع المتداولين',
})

const posts = ref([
    {
        id: 1,
        author: 'أحمد العنزي',
        avatar: 'https://i.pravatar.cc/150?u=a',
        content: 'توقعاتكم لسهم "بيتك" اليوم؟ أرى تشكل نموذج رأس وكتفين على فريم الساعة.',
        time: 'منذ 15 دقيقة',
        likes: 12,
        comments: 3,
        tags: ['بيتك', 'تحليل_فني']
    },
    {
        id: 2,
        author: 'محمد ابو طارق',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtS1avwog93qXVFl3JnDiwuVTnM_A_oQVs64dTG-Q2irdW021-QOBTfa3GhDZGq8ZAYkk&usqp=CAU',
        content: 'خبر ممتاز لقطاع البنوك: المركزي يرفع سعر الخصم 25 نقطة أساس. سيؤثر إيجاباً على الأرباح.',
        time: 'منذ ساعة',
        likes: 45,
        comments: 10,
        tags: ['بنوك', 'اقتصاد']
    }
])
</script>

<template>
  <div class="container py-8">
      <div class="flex flex-col lg:flex-row gap-8">
          <!-- Main Feed -->
          <div class="lg:w-2/3">
              <div class="flex justify-between items-center mb-6">
                  <h1 class="text-3xl font-bold text-white">مجتمع المتداولين </h1>
                  <button class="btn btn-primary">+ موضوع جديد</button>
              </div>

              <!-- Create Post (Placeholder) -->
              <div class="card mb-6">
                  <textarea class="input h-24 mb-3 resize-none" placeholder="شاركنا رأيك أو تحليلك..."></textarea>
                  <div class="flex justify-between items-center">
                       <div class="flex gap-2">
                           <button class="text-gray-400 hover:text-primary pt-1">📷</button>
                           <button class="text-gray-400 hover:text-primary pt-1">📊</button>
                       </div>
                       <button class="btn btn-primary text-sm px-6">نشر</button>
                  </div>
              </div>

              <!-- Posts Feed -->
              <div class="space-y-6">
                  <div v-for="post in posts" :key="post.id" class="card">
                      <div class="flex items-center gap-3 mb-4">
                          <img :src="post.avatar" alt="Avatar" class="w-10 h-10 rounded-full border border-gray-600">
                          <div>
                              <h3 class="font-bold text-white">{{ post.author }}</h3>
                              <span class="text-xs text-gray-400">{{ post.time }}</span>
                          </div>
                      </div>
                      <p class="text-gray-300 mb-4 leading-relaxed">{{ post.content }}</p>
                      <div class="flex flex-wrap gap-2 mb-4">
                          <span v-for="tag in post.tags" :key="tag" class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">#{{ tag }}</span>
                      </div>
                      <div class="border-t border-gray-800 pt-3 flex gap-6 text-gray-400 text-sm">
                          <button class="hover:text-primary flex items-center gap-1">👍 {{ post.likes }} إعجاب</button>
                          <button class="hover:text-primary flex items-center gap-1">💬 {{ post.comments }} تعليق</button>
                          <button class="hover:text-primary ml-auto">🔗 مشاركة</button>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:w-1/3 space-y-6">
              <div class="card">
                  <h3 class="font-bold mb-4 text-white">الأكثر تداولاً 🔥</h3>
                  <div class="flex flex-wrap gap-2">
                       <span class="bg-dark-input px-3 py-1 rounded text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">#بيتك</span>
                       <span class="bg-dark-input px-3 py-1 rounded text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">#أجيليتي</span>
                       <span class="bg-dark-input px-3 py-1 rounded text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">#السوق_الأول</span>
                  </div>
              </div>

              <div class="card bg-gradient-to-br from-primary/20 to-dark border-primary/30">
                  <h3 class="font-bold mb-2 text-primary">هل تعلم؟</h3>
                  <p class="text-sm text-gray-400">يمكنك مشاركة رسوم بيانية مباشرة من صفحة التحليل الفني في مشاركاتك!</p>
              </div>
          </div>
      </div>
  </div>
</template>
