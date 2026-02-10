<template>
  <div class="relative w-full" ref="dropdownRef">
    <!-- Input Field -->
    <div class="relative">
      <input
        v-model="searchQuery"
        @focus="showDropdown = true"
        @input="filterOptions"
        type="text"
        :placeholder="placeholder"
        class="w-full bg-card text-page-text border-2 border-border-color rounded-lg px-4 py-3 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
      />
      <svg 
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none"
        :class="{ 'rotate-180': showDropdown }"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown List -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showDropdown && filteredOptions.length > 0"
        class="absolute z-50 w-full mt-2 bg-card border-2 border-border-color rounded-lg shadow-2xl max-h-60 overflow-y-auto"
      >
        <div
          v-for="option in filteredOptions"
          :key="option.id"
          @click="selectOption(option)"
          class="px-4 py-3 cursor-pointer hover:bg-primary/10 transition-colors border-b border-border-color last:border-b-0"
          :class="{ 'bg-primary/20': modelValue === option.id }"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="font-bold text-page-text">{{ option.name }}</div>
              <div class="text-sm text-text-secondary">{{ option.symbol }}</div>
            </div>
            <svg
              v-if="modelValue === option.id"
              class="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Transition>

    <!-- No Results -->
    <div
      v-if="showDropdown && filteredOptions.length === 0 && searchQuery"
      class="absolute z-50 w-full mt-2 bg-card border-2 border-border-color rounded-lg shadow-2xl p-4 text-center text-text-secondary"
    >
      لا توجد نتائج
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  id: string
  name: string
  symbol: string
}

const props = defineProps<{
  options: Option[]
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const searchQuery = ref('')
const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => 
    option.name.toLowerCase().includes(query) || 
    option.symbol.toLowerCase().includes(query)
  )
})

const filterOptions = () => {
  showDropdown.value = true
}

const selectOption = (option: Option) => {
  searchQuery.value = `${option.name} (${option.symbol})`
  emit('update:modelValue', option.id)
  emit('change', option.id)
  showDropdown.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Set initial display value if modelValue exists
  if (props.modelValue) {
    const selected = props.options.find(opt => opt.id === props.modelValue)
    if (selected) {
      searchQuery.value = `${selected.name} (${selected.symbol})`
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for external changes to modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const selected = props.options.find(opt => opt.id === newVal)
    if (selected) {
      searchQuery.value = `${selected.name} (${selected.symbol})`
    }
  } else {
    searchQuery.value = ''
  }
})
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #C5A038;
}
</style>
