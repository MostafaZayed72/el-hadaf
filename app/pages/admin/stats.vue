<template>
  <div class="min-h-screen bg-page-bg">
    <!-- Header -->
    <header class="bg-card border-b border-border-color">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin/stocks" class="text-text-secondary hover:text-page-text">
            ← إدارة الأسهم
          </NuxtLink>
          <h1 class="text-2xl font-bold text-page-text">إحصائيات الزوار</h1>
        </div>
        <button @click="refresh" class="btn bg-primary/10 text-primary hover:bg-primary/20">
          تحديث
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div v-if="pending" class="text-center py-20">
        <div class="text-text-secondary animate-pulse">جاري تحميل البيانات...</div>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500">
        حدث خطأ أثناء تحميل البيانات: {{ error.message }}
      </div>

      <div v-else class="space-y-8">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card p-6 border-t-4 border-primary">
            <h3 class="text-text-secondary text-sm mb-2">إجمالي الزيارات المسجلة</h3>
            <div class="text-4xl font-mono font-bold text-page-text">{{ stats?.totalViews }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Top Pages -->
          <div class="card">
            <h3 class="font-bold text-lg text-page-text mb-4 border-b border-border-color pb-2">
              أكثر الصفحات زيارة (آخر 1000 زيارة)
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-right">
                <thead class="bg-primary/5 text-primary">
                  <tr>
                    <th class="p-3 rounded-r-lg">الرابط</th>
                    <th class="p-3 rounded-l-lg">الزيارات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-color">
                  <tr v-for="page in stats?.topPages" :key="page.path" class="hover:bg-primary/5">
                    <td class="p-3 text-page-text dir-ltr text-left">{{ page.path }}</td>
                    <td class="p-3 font-mono font-bold text-primary">{{ page.count }}</td>
                  </tr>
                  <tr v-if="!stats?.topPages?.length">
                    <td colspan="2" class="p-4 text-center text-text-secondary">لا توجد بيانات كافية</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recent Visitors -->
          <div class="card">
            <h3 class="font-bold text-lg text-page-text mb-4 border-b border-border-color pb-2">
              آخر الزوار
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-right">
                <thead class="bg-primary/5 text-primary">
                  <tr>
                    <th class="p-3 rounded-r-lg">التوقيت</th>
                    <th class="p-3 rounded-l-lg">المتصفح / الجهاز</th>
                    <th class="p-3">الصفحة</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-color">
                  <tr v-for="(visitor, idx) in stats?.recentVisitors" :key="idx" class="hover:bg-primary/5">
                    <td class="p-3 text-text-secondary whitespace-nowrap">
                      {{ new Date(visitor.created_at).toLocaleString('ar-EG') }}
                    </td>
                    <td class="p-3 text-page-text max-w-xs truncate" :title="visitor.user_agent">
                      {{ getBrowserName(visitor.user_agent) }}
                    </td>
                    <td class="p-3 text-page-text dir-ltr text-left max-w-[150px] truncate" :title="visitor.path">
                      {{ visitor.path }}
                    </td>
                  </tr>
                   <tr v-if="!stats?.recentVisitors?.length">
                    <td colspan="3" class="p-4 text-center text-text-secondary">لا توجد زيارات بعد</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data: stats, pending, error, refresh } = await useFetch('/api/admin/stats')

function getBrowserName(userAgent: string) {
  if (!userAgent) return 'غير معروف'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iPhone')) return 'iPhone'
  return 'Unknown'
}
</script>

<style scoped>
.dir-ltr {
  direction: ltr;
}
</style>
