<template>
  <component
    :is="tag"
    class="basket-item flex items-center justify-between gap-4 p-4 rounded-lg border dark:border-neutral"
    tabindex="0"
  >
    <h3 class="unstyled h2 md:h3">{{ product.title }}</h3>
    <div class="flex items-center justify-between gap-6">
      <p class="unstyled !font-bold h2 md:h3">
        ${{ product.price.toLocaleString('el-GR') }}
      </p>
      <div
        class="flex rounded-lg overflow-hidden transition bg-accent/85 hover:bg-accent w-36 h-12 max-md:ml-auto justify-between items-center"
        aria-live="polite"
      >
        <!-- Display the quantity -->
        <AddRemoveItems
          :initialQuantity="quantity"
          @quantityChange="updateCartQuantity"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import AddRemoveItems from '@/components/Common/AddRemoveItems.vue'
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

// Get basket store
const basketStore = useBasketStore()

// Function to update the quantity in the cart
const updateCartQuantity = (newQuantity: number) => {
  basketStore.updateQuantity(product.id, newQuantity)
}
</script>
