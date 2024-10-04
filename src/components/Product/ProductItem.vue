<template>
  <component
    :is="tag"
    class="product-item grid md:grid-cols-[150px_1fr] md:gap-8 rounded-md border dark:border-neutral overflow-hidden transition ease-in-out duration-300 hover:shadow-xl hover:shadow-base-content/10 dark:hover:shadow-accent/5"
    tabindex="0"
  >
    <figure class="relative max-md:aspect-[4/3]">
      <picture>
        <source
          :srcset="`${product.image}/webp`"
          media="(min-width: 768px)"
          width="150"
          height="180"
        />
        <source
          :srcset="`${product.image}/jpg`"
          media="(min-width: 768px)"
          width="150"
          height="180"
        />
        <source
          :srcset="`${product.mobileImage}/webp`"
          width="420"
          height="315"
          type="image/webp"
        />
        <img
          :src="`${product.mobileImage}/jpg`"
          :alt="product.title"
          width="420"
          height="315"
          class="absolute w-full h-full top-0 left-0 object-cover"
        />
      </picture>
      <figcaption class="visually-hidden">Placeholder</figcaption>
    </figure>
    <div class="flex flex-col min-w-0 p-4 md:pl-0 min-h-[180px]">
      <h3 class="unstyled h2 md:h3">{{ product.title }}</h3>
      <p class="truncate unstyled small">{{ product.description }}</p>
      <div class="flex items-center gap-4 md:gap-8 mt-auto">
        <p class="unstyled !font-bold h2 md:h3">
          ${{ product.price.toLocaleString('el-GR') }}
        </p>
        <div
          class="flex rounded-lg overflow-hidden transition bg-accent/85 hover:bg-accent w-48 md:w-64 h-12 max-md:ml-auto justify-between items-center"
          aria-live="polite"
        >
          <!-- Conditional rendering of button or AddRemoveItems component -->
          <AddRemoveItems
            v-if="isInCart"
            :initialQuantity="quantity"
            @quantityChange="handleQuantityChange"
          />
          <button
            v-else
            class="small text-accent-content font-medium block w-full h-full text-center"
            aria-label="Add product to basket"
            @click="addToCart"
          >
            {{ generic.addToCart }}
          </button>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddRemoveItems from './AddRemoveItems.vue'

// Define props for the product and generic object
const {
  product,
  generic,
  tag = 'li',
} = defineProps<{
  product: {
    id: number
    title: string
    description: string
    price: number
    image: string
    mobileImage: string
    initialQuantity?: number // Optional prop for initial quantity
  }
  generic: {
    addToCart: string
  }
  tag?: string
}>()

// State to manage whether the item is in the cart
const isInCart = ref(false)
const quantity = ref(1)

// Function to add the item to the cart (show AddRemoveItems)
const addToCart = () => {
  isInCart.value = true
}

// Handle quantity changes from AddRemoveItems
const handleQuantityChange = (newQuantity: number) => {
  quantity.value = newQuantity

  // If quantity goes back to 0, remove from cart
  if (quantity.value === 0) {
    isInCart.value = false
    quantity.value = 1 // Reset quantity when removed from cart
  }
}
</script>
