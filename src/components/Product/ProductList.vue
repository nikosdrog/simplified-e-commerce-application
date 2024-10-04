<template>
  <section id="products">
    <!-- Dynamic tag -->
    <component
      :is="tag"
      role="list"
      aria-label="Product list"
      class="product-list grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4"
    >
      <!-- Slot for dynamic content inside the dynamic tag -->
      <slot></slot>
    </component>
  </section>
</template>

<script setup lang="ts">
// Define props directly, without declaring `props` as a constant
const { tag = 'ul' } = defineProps<{ tag?: string }>()
</script>
