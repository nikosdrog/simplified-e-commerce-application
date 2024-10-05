<template>
  <dialog v-if="show" class="modal" open>
    <div class="modal-box">
      <h3 v-if="genericStore.generic" class="text-lg font-bold">
        {{ genericStore.generic.actionNeeded }}
      </h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            v-if="genericStore.generic"
            class="btn btn-error"
            @click="onConfirm"
          >
            {{ genericStore.generic.remove }}
          </button>
          <button
            v-if="genericStore.generic"
            class="btn btn-success"
            @click="onCancel"
          >
            {{ genericStore.generic.keep }}
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue'
import { useGenericStore } from '@/stores/genericStore'

// Load the generic data from the store
const genericStore = useGenericStore()
onMounted(() => {
  genericStore.loadFromLocalStorage()
})

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
