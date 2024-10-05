<template>
  <div v-if="genericStore.generic" class="flex flex-col gap-4">
    <h2
      v-if="genericStore.generic"
      class="unstyled h1 pt-5 md:pt-20 text-center"
    >
      <slot></slot>
    </h2>
    <router-link
      v-if="genericStore.generic"
      to="/"
      class="unstyled text-accent h2 mx-auto underline"
      >{{ genericStore.generic.emptyBtn }}</router-link
    >
  </div>
</template>
<script setup lang="ts">
import { useGenericStore } from '@/stores/genericStore'
import { onMounted } from 'vue'

// Get the generic store
const genericStore = useGenericStore()

onMounted(async () => {
  // Load generic data from the store or from localStorage
  genericStore.loadFromLocalStorage()
})
</script>
