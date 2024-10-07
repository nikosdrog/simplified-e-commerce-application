<template>
  <div class="flex flex-col gap-4">
    <h2 class="unstyled h1 pt-5 md:pt-20 text-center">
      <slot></slot>
    </h2>
    <router-link
      to="/"
      class="unstyled text-accent h2 mx-auto underline"
      @click="handleClearSearch"
      >{{ langItems.emptyBtn }}</router-link
    >
  </div>
</template>
<script setup lang="ts">
import langItems from '@/lang/en.json'

// Emit event for the clearSearch
const emit = defineEmits(['clearSearch'])

const handleClearSearch = () => {
  emit('clearSearch')
}
</script>
