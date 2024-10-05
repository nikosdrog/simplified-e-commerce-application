<template>
  <component
    :is="tag"
    class="basket-item flex max-md:flex-col md:items-center justify-between gap-4 p-4 rounded-lg border dark:border-neutral"
    tabindex="0"
  >
    <h3 class="unstyled h2 md:h3">{{ product.title }}</h3>
    <div class="flex items-center justify-between gap-6">
      <!-- Display the total price based on quantity -->
      <p class="unstyled !font-bold h2 md:h3">
        ${{ $formatNumber(product.price * localQuantity) }}
      </p>
      <div
        class="flex rounded-lg overflow-hidden transition bg-accent/85 hover:bg-accent w-36 h-12 max-md:ml-auto justify-between items-center"
        aria-live="polite"
      >
        <!-- Display the quantity with sync between state and store -->
        <AddRemoveItems
          :initialQuantity="localQuantity"
          @quantityChange="handleQuantityChange"
        />
      </div>
    </div>
  </component>

  <!-- Modal Confirm Component -->
  <ModalConfirm
    :show="showModal"
    :message="`Are you sure you want to remove ${product.title} from your cart?`"
    @confirm="removeProduct"
    @cancel="keepProduct"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AddRemoveItems from '@/components/Common/AddRemoveItems.vue'
import ModalConfirm from './Modal.vue'
import { useBasketStore } from '@/stores/basketStore'

// Define props for the product and the tag
const {
  product,
  quantity,
  tag = 'li',
} = defineProps<{
  product: {
    id: number
    title: string
    price: number
  }
  quantity: number
  tag?: string
}>()

const showModal = ref(false) // State for showing the modal
const basketStore = useBasketStore() // Get basket store
const localQuantity = ref(quantity) // Local quantity to sync with AddRemoveItems

// Watch for changes in the quantity prop and sync with localQuantity
watch(
  () => quantity,
  (newQuantity) => {
    localQuantity.value = newQuantity
  },
)

// Function to update the quantity in the cart
const handleQuantityChange = (newQuantity: number) => {
  if (newQuantity === 0) {
    showModal.value = true // Show the modal if quantity becomes 0
  } else {
    basketStore.updateQuantity(product.id, newQuantity)
    localQuantity.value = newQuantity
  }
}

// Function to remove the product from the cart
const removeProduct = () => {
  basketStore.updateQuantity(product.id, 0) // Set quantity to 0 and remove the product
  showModal.value = false // Hide the modal after removing
}

// Function to keep the product with a quantity of 1
const keepProduct = () => {
  basketStore.updateQuantity(product.id, 1) // Keep 1 product in the cart
  localQuantity.value = 1 // Sync the quantity with AddRemoveItems
  showModal.value = false // Hide the modal
}
</script>
