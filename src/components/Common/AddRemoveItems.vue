<template>
  <button
    class="px-3.5"
    aria-label="Remove product from basket"
    @click="decrease"
  >
    <span class="m-auto text-4xl text-accent-content">&#8722;</span>
  </button>
  <span class="text-xl text-accent-content font-bold" aria-live="polite">{{
    initialQuantity
  }}</span>
  <button class="px-3.5" aria-label="Add product to basket" @click="increase">
    <span class="m-auto text-4xl text-accent-content">&#43;</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ initialQuantity: number }>()
const emit = defineEmits(['quantityChange'])

const increase = () => {
  emit('quantityChange', props.initialQuantity + 1)
}

const decrease = () => {
  if (props.initialQuantity > 0) {
    emit('quantityChange', props.initialQuantity - 1)
  }
}
</script>
