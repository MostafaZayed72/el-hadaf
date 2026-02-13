<template>
  <div class="flex items-center justify-center min-h-screen bg-[#F5F7FA] font-sans overflow-hidden select-none">
    
    <!-- Main Drawing Area -->
    <div class="relative w-[1000px] h-[800px] flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
      
      <!-- BACKGROUND GRADIENT -->
      <div class="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-50 pointer-events-none"></div>

      <!-- STATIC SVG LAYER -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
        <!-- LEFT GROUP -->
        <path d="M 400 400 Q 320 300 300 250 T 250 250" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <path d="M 400 400 L 180 400" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <path d="M 400 400 Q 320 500 300 550 T 250 550" fill="none" class="stroke-slate-200" stroke-width="1.5" />

        <!-- RIGHT GROUP -->
        <path d="M 600 400 Q 680 300 700 250 T 750 250" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <path d="M 600 400 L 820 400" fill="none" class="stroke-slate-200" stroke-width="1.5" />
        <path d="M 600 400 Q 680 500 700 550 T 750 550" fill="none" class="stroke-slate-200" stroke-width="1.5" />

        <!-- VERTICALS -->
        <line x1="500" y1="300" x2="500" y2="150" class="stroke-slate-200" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="500" y1="500" x2="500" y2="650" class="stroke-slate-200" stroke-width="1.5" stroke-dasharray="4 4" />

        <!-- Static Blue Highlights -->
        <path d="M 400 400 L 440 400" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
        <path d="M 600 400 L 560 400" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
      </svg>
      
      <!-- ACTIVE ANIMATION LAYER -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 800" style="filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));">
        <path d="M 500 400 L 500 150" class="anim-branch" style="animation-delay: 0s;" />
        <path d="M 400 400 Q 320 300 300 250 T 250 250" class="anim-branch" style="animation-delay: 1.0s;" />
        <path d="M 400 400 L 180 400" class="anim-branch" style="animation-delay: 2.0s;" />
        <path d="M 400 400 Q 320 500 300 550 T 250 550" class="anim-branch" style="animation-delay: 3.0s;" />
        <path d="M 500 400 L 500 650" class="anim-branch" style="animation-delay: 4.0s;" />
        <path d="M 600 400 Q 680 500 700 550 T 750 550" class="anim-branch" style="animation-delay: 5.0s;" />
        <path d="M 600 400 L 820 400" class="anim-branch" style="animation-delay: 6.0s;" />
        <path d="M 600 400 Q 680 300 700 250 T 750 250" class="anim-branch" style="animation-delay: 7.0s;" />
      </svg>


      <!-- CENTRAL HUB -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <!-- Chaser Ring / Twinkle Dots -->
        <div class="relative w-[200px] h-[200px] flex items-center justify-center">
           <div v-for="n in 24" :key="n"
               class="animate-twinkle"
               :style="{ '--rot': `${n * 15}deg`, animationDelay: `${n * 0.1}s` }">
          </div>
        </div>
        <!-- Inner Static -->
        <div class="absolute w-[140px] h-[140px] rounded-full border border-slate-100 flex items-center justify-center bg-white/40 backdrop-blur-sm">
             <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-200"></div>
        </div>
      </div>


      <!-- LABELS -->
      <div class="absolute top-[125px] left-1/2 -translate-x-1/2 text-center z-30">
        <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 0s;">APM<br>INTEGRATION</div>
      </div>
      <div class="absolute top-[230px] left-[120px] group cursor-pointer z-30">
        <div class="anim-label px-5 py-3 rounded-xl" style="animation-delay: 1.0s;">SUBSCRIPTIONS</div>
      </div>
      <div class="absolute top-[390px] left-[40px] group cursor-pointer text-right z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 2.0s;">PAYMENT<br>ACCEPTANCE</div>
      </div>
      <div class="absolute bottom-[230px] left-[160px] group cursor-pointer z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 3.0s;">INSIGHTS</div>
      </div>
      <div class="absolute bottom-[130px] left-1/2 -translate-x-1/2 text-center z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 4.0s;">TOKENIZATION</div>
      </div>
      <div class="absolute bottom-[230px] right-[160px] group cursor-pointer z-30">
         <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 5.0s;">PAYOUTS</div>
      </div>
      <div class="absolute top-[390px] right-[60px] group cursor-pointer text-right z-30">
          <div class="anim-label px-4 py-2 rounded-xl" style="animation-delay: 6.0s;">FRAUD<br>PREVENTION</div>
      </div>

      <!-- TOP RIGHT: DYNAMIC LABEL -->
      <div class="absolute top-[230px] right-[140px] group cursor-pointer text-right z-30">
        <Transition name="fade" mode="out-in">
           <!-- Key ensures animation triggers on change -->
           <!-- Removed animation-delay to make it visible immediately -->
           <div :key="dynamicRightLabel" class="anim-label px-4 py-2 rounded-xl">{{ dynamicRightLabel }}</div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Use Blank Layout
definePageMeta({
  layout: 'blank'
})

const dynamicRightLabel = ref('RECONCILIATION')

// Toggle Label Text every 4 seconds (half cycle)
onMounted(() => {
  setInterval(() => {
    dynamicRightLabel.value = dynamicRightLabel.value === 'RECONCILIATION' ? 'STABLECOINS' : 'RECONCILIATION'
  }, 4000)
})
</script>

<style scoped>
/* 
   TWINKLE DOTS
   Sharp fade in/out to look like blinking lights.
*/
/* 
   TWINKLE DOTS
   Ensuring VISIBILITY. Increased size and removed transparency.
*/
.animate-twinkle {
  background-color: #64748b; /* Slate-500 - much darker */
  width: 6px; /* Increased from 4px */
  height: 6px; /* Increased from 4px */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1; /* Force visible */
  animation: twinkle 3s ease-in-out infinite;
  box-shadow: 0 0 2px rgba(148, 163, 184, 0.5);
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: rotate(var(--rot)) translate(100px) scale(1);
    background-color: #64748b;
  }
  50% {
    opacity: 1;
    transform: rotate(var(--rot)) translate(100px) scale(1.5);
    background-color: #3b82f6; /* Blue 500 */
    box-shadow: 0 0 10px rgba(59, 130, 246, 1);
  }
}

/* BRANCH FLOW */
.anim-branch {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 2.5px;
  stroke-linecap: round;
  stroke-dasharray: 150, 1200; 
  stroke-dashoffset: 1200; 
  opacity: 0.8;
  animation: branch-flow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes branch-flow {
  0% { stroke-dashoffset: 1350; opacity: 0; }
  5% { opacity: 1; }
  25% { stroke-dashoffset: 0; opacity: 1; }
  30% { stroke-dashoffset: -150; opacity: 0; }
  100% { stroke-dashoffset: -150; opacity: 0; }
}

/* LABEL PULSE */
.anim-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #94a3b8;
  background: transparent;
  transition: all 0.5s;
  animation: label-pulse 8s ease-in-out infinite;
  text-transform: uppercase;
  border: 1px solid transparent;
}

@keyframes label-pulse {
  0% { color: #94a3b8; background: transparent; transform: scale(1); border-color: transparent; }
  22% { color: #2563eb; background: #eff6ff; border-color: #bfdbfe; transform: scale(1.05); box-shadow: 0 4px 10px -2px rgba(59,130,246,0.15); }
  28% { color: #94a3b8; background: transparent; border-color: transparent; transform: scale(1); box-shadow: none; }
  100% { color: #94a3b8; background: transparent; }
}

/* VUE TRANSITION: FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>