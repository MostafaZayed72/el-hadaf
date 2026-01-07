<template>
  <div class="layout-wrapper">
    <nav class="main-nav">
      <div class="container nav-content">
        <NuxtLink to="/" class="brand">
          <img src="/public/logo.png" alt="قناة الهدف" class="brand-logo rounded-xl" />
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">الرئيسية</NuxtLink>
          <NuxtLink to="/analysis" class="nav-link">تحليل الأسهم</NuxtLink>
          
          <template v-if="isAdmin">
             <button @click="logout" class="nav-link bg-transparent border-0 cursor-pointer">تسجيل الخروج</button>
          </template>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { isAdmin, logout } = useAuth()
</script>

<style scoped>
.main-nav {
  background-color: var(--secondary);
  padding: 1rem 0;
  border-bottom: 1px solid #333;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  height: 100px;
  width: auto;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

.nav-link.router-link-active {
  color: var(--primary);
}

.admin-link {
  color: var(--text-muted);
}
.admin-link:hover {
  color: #fff;
}
</style>
