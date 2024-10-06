<template>
  <div class="form-control pb-4">
    <!-- Input field for search -->
    <input
      v-model="searchQuery"
      @input="emitSearch"
      type="text"
      placeholder="Search product by title"
      class="input input-bordered w-auto md:w-80"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props to allow parent component to control search query
const props = defineProps({
  modelValue: {
    type: String,
    default: '', // The default value of the search query from the parent
  },
})

// Declare the search query ref
const searchQuery = ref(props.modelValue)

// Emit search events to parent component
const emit = defineEmits(['update:modelValue', 'search'])

// Emit search query whenever it changes
const emitSearch = () => {
  emit('update:modelValue', searchQuery.value)
  emit('search', searchQuery.value)
}

// Watch for changes in the modelValue prop from the parent to reset searchQuery
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue
  },
)
</script>
