
<template>
  <div class="layout-wrapper">
    <nav class="main-nav">
      <div class="container nav-content">
        <NuxtLink to="/" class="brand">قناة الهدف</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">الرئيسية</NuxtLink>
          <NuxtLink to="/analysis" class="nav-link">التحليل</NuxtLink>
          <NuxtLink to="/admin" class="nav-link">تحليل الأسهم</NuxtLink>
          <NuxtLink to="/admin/stocks" class="nav-link">إدارة الأسهم</NuxtLink>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

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

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--primary);
}

.admin-link {
  color: var(--text-muted);
}
.admin-link:hover {
  color: #fff;
}
</style>
