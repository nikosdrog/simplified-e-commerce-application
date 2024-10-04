<template>
  <div class="flex justify-center space-x-2 mt-8">
    <div
      v-if="totalPages > 1"
      class="join"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <!-- Previous Button -->
      <button
        class="join-item btn btn-lg btn-accent"
        aria-label="Go to previous page"
        :aria-disabled="currentPage === 1"
        :disabled="currentPage === 1"
        @click="goToPreviousPage"
      >
        «
      </button>

      <!-- Current Page -->
      <button
        class="join-item btn btn-lg btn-accent"
        aria-current="page"
        :aria-label="`Page ${currentPage}`"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button
        class="join-item btn btn-lg btn-accent"
        aria-label="Go to next page"
        :aria-disabled="currentPage === totalPages"
        :disabled="currentPage === totalPages"
        @click="goToNextPage"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits(['updatePage'])

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    emit('updatePage', props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('updatePage', props.currentPage + 1)
  }
}
</script>
