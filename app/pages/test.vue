<template>
  <div class="flex items-center justify-center min-h-screen bg-[#F5F7FA] font-sans overflow-hidden select-none">
    
    <!-- Main Drawing Area -->
    <div class="relative w-[1000px] h-[800px] flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
      
      <!-- BACKGROUND GRADIENT -->
      <div class="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-50 pointer-events-none"></div>

      <!-- STATIC SVG LAYER (Grey Foundation) -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
        <!-- Reusing the reversed paths for static layer too, for perfect alignment -->
        
        <!-- LEFT GROUP (Origin 400, 400) -->
        <!-- Subscriptions (Top Left) -->
        <path d="M 400 400 Q 320 300 300 250 T 250 250" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <!-- Payment (Left) -->
        <path d="M 400 400 L 180 400" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <!-- Insights (Bottom Left) -->
        <path d="M 400 400 Q 320 500 300 550 T 250 550" fill="none" class="stroke-slate-200" stroke-width="1.5" />

        <!-- RIGHT GROUP (Origin 600, 400) -->
        <!-- Reconciliation (Top Right) -->
        <path d="M 600 400 Q 680 300 700 250 T 750 250" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <!-- Fraud Prevention (Right) -->
        <path d="M 600 400 L 820 400" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <!-- Payouts (Bottom Right) -->
        <path d="M 600 400 Q 680 500 700 550 T 750 550" fill="none" class="stroke-slate-200" stroke-width="1.5" />

        <!-- VERTICALS -->
        <line x1="500" y1="300" x2="500" y2="150" class="stroke-slate-200" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="500" y1="500" x2="500" y2="650" class="stroke-slate-200" stroke-width="1.5" stroke-dasharray="4 4" />

        <!-- Connection Brackets (Static Blue Highlights near center) -->
        <path d="M 400 400 L 440 400" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
        <path d="M 600 400 L 560 400" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
      </svg>
      
      <!-- ACTIVE ANIMATION LAYER (Blue Pulses) -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 800" style="filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.4));">

        <!-- 1. APM Integration (Top) -->
        <path d="M 500 400 L 500 150" class="anim-branch" style="animation-delay: 0s;" />

        <!-- 2. Subscriptions (Top Left) -->
        <path d="M 400 400 Q 320 300 300 250 T 250 250" class="anim-branch" style="animation-delay: 1.0s;" />

        <!-- 3. Payment Acceptance (Left) -->
        <path d="M 400 400 L 180 400" class="anim-branch" style="animation-delay: 2.0s;" />

        <!-- 4. Insights (Bottom Left) -->
        <path d="M 400 400 Q 320 500 300 550 T 250 550" class="anim-branch" style="animation-delay: 3.0s;" />

        <!-- 5. Tokenization (Bottom) -->
        <path d="M 500 400 L 500 650" class="anim-branch" style="animation-delay: 4.0s;" />

        <!-- 6. Payouts (Bottom Right) -->
        <path d="M 600 400 Q 680 500 700 550 T 750 550" class="anim-branch" style="animation-delay: 5.0s;" />

        <!-- 7. Fraud Prevention (Right) -->
        <path d="M 600 400 L 820 400" class="anim-branch" style="animation-delay: 6.0s;" />

        <!-- 8. Reconciliation (Top Right) -->
        <path d="M 600 400 Q 680 300 700 250 T 750 250" class="anim-branch" style="animation-delay: 7.0s;" />
      </svg>


      <!-- CENTRAL HUB -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <!-- Chaser Ring -->
        <div class="relative w-[180px] h-[180px]">
           <div v-for="n in 24" :key="n"
               class="absolute w-[4px] h-[4px] rounded-full animate-dot-chaser"
               :style="`top: 50%; left: 50%; transform: rotate(${n * 15}deg) translate(90px) translateY(-50%); animation-delay: ${n * 0.1}s;`">
          </div>
        </div>
        <!-- Inner Static/Pulse -->
        <div class="absolute w-[140px] h-[140px] rounded-full border border-slate-100 flex items-center justify-center bg-white/30 backdrop-blur-sm">
             <div class="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      </div>


      <!-- LABELS -->
      
      <!-- TOP: APM -->
      <div class="absolute top-[125px] left-1/2 -translate-x-1/2 text-center z-30">
        <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 0s;">APM<br>INTEGRATION</div>
      </div>

      <!-- TOP LEFT: Subscriptions -->
      <div class="absolute top-[230px] left-[120px] group cursor-pointer z-30">
        <div class="anim-label px-5 py-3 rounded-xl" style="animation-delay: 1.0s;">SUBSCRIPTIONS</div>
      </div>

      <!-- LEFT: Payment -->
      <div class="absolute top-[390px] left-[40px] group cursor-pointer text-right z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 2.0s;">PAYMENT<br>ACCEPTANCE</div>
      </div>

      <!-- BOTTOM LEFT: Insights -->
      <div class="absolute bottom-[230px] left-[160px] group cursor-pointer z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 3.0s;">INSIGHTS</div>
      </div>

      <!-- BOTTOM: Tokenization -->
      <div class="absolute bottom-[130px] left-1/2 -translate-x-1/2 text-center z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 4.0s;">TOKENIZATION</div>
      </div>

      <!-- BOTTOM RIGHT: Payouts -->
      <div class="absolute bottom-[230px] right-[160px] group cursor-pointer z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 5.0s;">PAYOUTS</div>
      </div>

      <!-- RIGHT: Fraud -->
      <div class="absolute top-[390px] right-[60px] group cursor-pointer text-right z-30">
          <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 6.0s;">FRAUD<br>PREVENTION</div>
      </div>

      <!-- TOP RIGHT: Reconciliation -->
      <div class="absolute top-[230px] right-[140px] group cursor-pointer text-right z-30">
          <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 7.0s;">RECONCILIATION</div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
/* DOT CHASER */
.animate-dot-chaser {
  background-color: #e2e8f0;
  animation: glow-dot 2.4s linear infinite;
}
@keyframes glow-dot {
  0%, 100% { background-color: #e2e8f0; transform: scale(1); box-shadow: none; }
  10%, 20% { background-color: #3b82f6; transform: scale(1.4); box-shadow: 0 0 5px rgba(59,130,246,0.8); }
}

/* FLOWING BRANCH LINES */
.anim-branch {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 2.5px;
  stroke-linecap: round;
  stroke-dasharray: 120, 1200; /* Packet of 120px, large gap */
  stroke-dashoffset: 1200; /* Start hidden */
  opacity: 0.8;
  animation: branch-flow 8s ease-in-out infinite;
}

@keyframes branch-flow {
  0% {
    stroke-dashoffset: 1200; /* Hidden at start (Center) */
    opacity: 0;
  }
  2% {
    opacity: 1;
  }
  20% {
    /* Reaches end (Label) */
    stroke-dashoffset: 0;
    opacity: 1;
  }
  25% {
    /* Fade out */
    stroke-dashoffset: -100; 
    opacity: 0;
  }
  100% {
    stroke-dashoffset: -100;
    opacity: 0;
  }
}

/* LABEL ACTIVATION */
.anim-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #94a3b8;
  background: transparent;
  transition: all 0.3s;
  animation: label-pulse 8s ease-in-out infinite;
  text-transform: uppercase;
}

@keyframes label-pulse {
  0% { color: #94a3b8; background: transparent; transform: scale(1); box-shadow: none; border: 1px solid transparent; }
  18% { /* Anticipate arrival */ color: #3b82f6; }
  20% { /* Active */ color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; transform: scale(1.05); box-shadow: 0 4px 6px -1px rgba(59,130,246,0.1); }
  25% { /* Fade */ color: #94a3b8; background: transparent; border: 1px solid transparent; transform: scale(1); box-shadow: none; }
  100% { color: #94a3b8; background: transparent; }
}
</style>