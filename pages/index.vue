
<template>
  <div class="landing-page">
    <header class="hero">
      <div class="container">
        <h1>قناة الهدف</h1>
        <p>منصتك الأولى لتحليل السوق الكويتي بدقة واحترافية</p>
        <div class="cta-buttons">
          <NuxtLink to="/analysis" class="btn btn-primary">ابدأ التحليل الآن</NuxtLink>
        </div>
      </div>
    </header>

    <section class="features container">
      <div class="feature-card">
        <h3>تحليل فني</h3>
        <p>رؤية فنية دقيقة مدعومة بالرسوم البيانية وارقام الدعوم والمقاومة.</p>
      </div>
      <div class="feature-card">
        <h3>تحليل مالي</h3>
        <p>قراءة متعمقة للبيانات المالية وتوقعات الأداء المستقبلي.</p>
      </div>
      <div class="feature-card">
        <h3>تحليل سلوكي</h3>
        <p>فهم سيكولوجية المتداولين وتوجهات السيولة في السوق.</p>
      </div>
    </section>

    <footer class="footer">
      <p>جميع الحقوق محفوظة لقناة الهدف &copy; 2024</p>
    </footer>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--secondary) 0%, var(--bg-dark) 100%);
  padding: 4rem 0;
  text-align: center;
  border-bottom: 2px solid var(--primary);
}

.hero h1 {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 1rem;
}

.feature-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid #333;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}

.feature-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.footer {
  text-align: center;
  padding: 2rem;
  background: var(--secondary);
  color: var(--text-muted);
  margin-top: auto;
}
</style>
