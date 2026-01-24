<script setup>
useHead({ title: 'استشارات - قناة الهدف' })
</script>

<template>
  <div class="container py-8">
     <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-2 text-center">خدمة الاستشارات الخاصة</h1>
        <p class="text-center text-gray-400 mb-10">احصل على استشارة مهنية من خبراء السوق لإدارة محفظتك بذكاء</p>

        <div class="card p-8">
            <form class="space-y-6" @submit.prevent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">الاسم الكامل</label>
                        <input type="text" class="input" placeholder="اسمك">
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">رقم الهاتف</label>
                        <input type="tel" class="input" placeholder="965+">
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-sm text-gray-400">نوع الاستشارة</label>
                    <select class="input">
                        <option>تحليل محفظة قائمة</option>
                        <option>بناء محفظة جديدة</option>
                        <option>استشارة مضاربية</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="text-sm text-gray-400">تفاصيل الطلب</label>
                    <textarea class="input h-32" placeholder="اشرح لنا ما تحتاج إليه..."></textarea>
                </div>

                <button class="btn btn-primary w-full py-3 text-lg font-bold">إرسال الطلب</button>
                <p class="text-xs text-center text-gray-500 mt-4">سيتواصل معك فريقنا خلال 24 ساعة عمل.</p>
            </form>
        </div>
     </div>
  </div>
</template>
