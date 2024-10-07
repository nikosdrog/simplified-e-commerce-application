<template>
  <dialog v-if="show" class="modal bg-base-100/80" open>
    <div class="modal-box">
      <h3 class="text-lg font-bold">
        {{ langItems.actionNeeded }}
      </h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <form method="dialog" class="flex gap-2">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn btn-error"
            aria-label="Remove product"
            @click="onConfirm"
          >
            {{ langItems.remove }}
          </button>
          <button
            class="btn btn-success"
            aria-label="Keep product"
            @click="onCancel"
          >
            {{ langItems.keep }}
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import langItems from '@/lang/en.json'

// Declare props for "show" and "message"
const props = defineProps<{
  show: boolean
  message: string
}>()

// Emit events for confirm and cancel
const emit = defineEmits(['confirm', 'cancel'])

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}
</script>
