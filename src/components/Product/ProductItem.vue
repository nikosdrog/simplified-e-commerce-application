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
          <!-- If the product is in the cart, show AddRemoveItems component -->
          <AddRemoveItems
            v-if="quantityInCart > 0"
            :initialQuantity="quantityInCart"
            @quantityChange="updateCartQuantity"
          />
          <!-- Show Add to Cart button if the product is not in the cart -->
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
import { onMounted, computed } from 'vue'
import AddRemoveItems from '@/components/Common/AddRemoveItems.vue'
import { useBasketStore } from '@/stores/basketStore'

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

// Get basket store
const basketStore = useBasketStore()

// Load basket items from localStorage on page load
onMounted(() => {
  basketStore.loadBasket()
})

// Compute the quantity of the current product in the basket
const quantityInCart = computed(() => {
  const item = basketStore.items.find((item) => item.product.id === product.id)
  return item ? item.quantity : 0
})

// Function to add the item to the cart
const addToCart = () => {
  basketStore.addToBasket(product)
}

// Function to update the quantity in the cart
const updateCartQuantity = (newQuantity: number) => {
  basketStore.updateQuantity(product.id, newQuantity)
}
</script>
