<template>
  <div class="flex items-center justify-center min-h-screen bg-[#F5F7FA] font-sans overflow-hidden selections-none">
    
    <!-- Main Drawing Area (Fixed size for pixel-perfect SVG alignment) -->
    <div class="relative w-[1000px] h-[800px] flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
      
      <!-- BACKGROUND GRADIENT (Subtle) -->
      <div class="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-50 pointer-events-none"></div>

      <!-- SVG CONNECTORS LAYER -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
        <defs>
           <!-- Gradient for the lines to give a 'flow' feel -->
           <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stop-color="#E2E8F0" stop-opacity="0.1" />
             <stop offset="50%" stop-color="#CBD5E1" stop-opacity="1" />
             <stop offset="100%" stop-color="#94A3B8" stop-opacity="1" />
           </linearGradient>
            <linearGradient id="lineGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
             <stop offset="0%" stop-color="#E2E8F0" stop-opacity="0.1" />
             <stop offset="50%" stop-color="#CBD5E1" stop-opacity="1" />
             <stop offset="100%" stop-color="#94A3B8" stop-opacity="1" />
           </linearGradient>
        </defs>

        <!-- LEFT GROUP: Merging to center-left (x=400, y=400) -->
        <!-- Subscriptions (Top Left) -->
        <path d="M 250 250 Q 300 250 320 300 T 400 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line" />
        <!-- Payment (Left) -->
        <path d="M 180 400 L 400 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line delay-75" />
        <!-- Insights (Bottom Left) -->
        <path d="M 250 550 Q 300 550 320 500 T 400 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line delay-150" />
        <!-- Left Connection Line (Blue Highlight) -->
        <line x1="400" y1="400" x2="440" y2="400" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" />


        <!-- RIGHT GROUP: Merging to center-right (x=600, y=400) -->
        <!-- Reconciliation (Top Right) -->
        <path d="M 750 250 Q 700 250 680 300 T 600 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line-reverse" />
        <!-- Fraud Prevention (Right) -->
        <path d="M 820 400 L 600 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line-reverse delay-75" />
        <!-- Payouts (Bottom Right) -->
        <path d="M 750 550 Q 700 550 680 500 T 600 400" fill="none" stroke="#CBD5E1" stroke-width="1.5" class="animate-draw-line-reverse delay-150" />
        <!-- Right Connection Line (Blue Highlight - Faint) -->
         <line x1="560" y1="400" x2="600" y2="400" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" />


        <!-- VERTICALS -->
        <!-- Top -->
        <line x1="500" y1="180" x2="500" y2="300" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 4" />
        <!-- Bottom -->
        <line x1="500" y1="500" x2="500" y2="620" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="4 4" />

      </svg>

      <!-- CENTRAL HUB ANIMATION -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <!-- Rotating Dot Ring -->
        <div class="relative w-[180px] h-[180px] animate-[spin_30s_linear_infinite]">
          <div v-for="n in 24" :key="n"
               class="absolute w-[3px] h-[3px] bg-blue-500 rounded-full"
               :style="`top: 50%; left: 50%; transform: rotate(${n * 15}deg) translate(90px) translateY(-50%); opacity: ${n % 3 === 0 ? 1 : 0.3}`">
          </div>
        </div>
        
        <!-- Inner Static/Pulsing Elements -->
        <div class="absolute w-[140px] h-[140px] rounded-full border border-slate-100 animate-pulse"></div>
        <div class="absolute w-[100px] h-[100px] rounded-full bg-slate-50 opacity-50 blur-xl"></div>
      </div>


      <!-- LABELS -->
      
      <!-- TOP -->
      <div class="absolute top-[160px] left-1/2 -translate-x-1/2 text-center group cursor-pointer">
        <div class="text-[11px] font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-600 transition-colors duration-300">APM<br>INTEGRATION</div>
      </div>

      <!-- BOTTOM -->
      <div class="absolute bottom-[160px] left-1/2 -translate-x-1/2 text-center group cursor-pointer">
        <div class="text-[11px] font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-600 transition-colors duration-300">TOKENIZATION</div>
      </div>

      <!-- LEFT SIDE -->
      <!-- Subscriptions -->
      <div class="absolute top-[230px] left-[120px] group cursor-pointer">
          <div class="px-6 py-4 bg-sky-50/50 rounded-2xl shadow-sm border border-sky-100 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
            <span class="text-xs font-bold text-blue-600 tracking-wider">SUBSCRIPTIONS</span>
          </div>
      </div>
       <!-- Payment Acceptance -->
       <div class="absolute top-[390px] left-[40px] group cursor-pointer text-right">
           <div class="px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">
              <span class="text-[11px] font-bold text-slate-400 tracking-[0.2em] leading-relaxed group-hover:text-blue-600 transition-colors">PAYMENT<br>ACCEPTANCE</span>
           </div>
      </div>
      <!-- Insights -->
      <div class="absolute bottom-[230px] left-[160px] group cursor-pointer">
          <span class="text-[11px] font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-600 transition-colors">INSIGHTS</span>
      </div>


      <!-- RIGHT SIDE -->
      <!-- Reconciliation -->
      <div class="absolute top-[230px] right-[140px] group cursor-pointer text-right">
          <span class="text-[11px] font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-600 transition-colors">RECONCILIATION</span>
      </div>
      <!-- Fraud Prevention -->
      <div class="absolute top-[390px] right-[60px] group cursor-pointer text-right">
           <span class="text-[11px] font-bold text-slate-400 tracking-[0.2em] leading-relaxed group-hover:text-blue-600 transition-colors">FRAUD<br>PREVENTION</span>
      </div>
      <!-- Payouts -->
      <div class="absolute bottom-[230px] right-[160px] group cursor-pointer">
           <span class="text-[11px] font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-600 transition-colors">PAYOUTS</span>
      </div>


      <!-- Floating Particles (Optional polish) -->
      <div class="absolute w-2 h-2 bg-blue-400 rounded-full top-[300px] left-[320px] animate-ping opacity-20"></div>
      <div class="absolute w-1.5 h-1.5 bg-blue-300 rounded-full bottom-[450px] right-[650px] animate-pulse opacity-40"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
/* Smooth stroke animation */
.animate-draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 3s ease-out forwards;
}
.animate-draw-line-reverse {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 3s ease-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>