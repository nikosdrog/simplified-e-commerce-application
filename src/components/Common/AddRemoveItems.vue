<template>
  <button
    class="px-3.5"
    aria-label="Remove product from basket"
    @click="decrease"
  >
    <span class="m-auto text-4xl text-accent-content">&#8722;</span>
  </button>
  <span class="text-xl text-accent-content font-bold" aria-live="polite">{{
    quantity
  }}</span>
  <button class="px-3.5" aria-label="Add product to basket" @click="increase">
    <span class="m-auto text-4xl text-accent-content">&#43;</span>
  </button>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// Define props for the initial quantity
const props = defineProps<{ initialQuantity: number }>()

// Emit event when quantity changes
const emit = defineEmits(['quantityChange'])

// State for managing quantity, starts from initialQuantity
const quantity = ref(props.initialQuantity || 1)

// Function to increase quantity
const increase = () => {
  quantity.value++
  emit('quantityChange', quantity.value) // Emit the new quantity
}

// Function to decrease quantity, ensuring it doesn't go below 0
const decrease = () => {
  if (quantity.value > 0) {
    quantity.value--
    emit('quantityChange', quantity.value) // Emit the new quantity
  }
}
</script>
