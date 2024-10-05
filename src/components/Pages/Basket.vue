<template>
  <main class="w-full p-4 md:p-8">
    <h2 v-if="genericStore.generic" class="unstyled h1">
      {{ genericStore.generic.basketTitle }}
    </h2>
    <p v-if="basketItems.length === 0 && genericStore.generic">
      {{ genericStore.generic.emptyList }}
    </p>
    <section class="grid gap-2">
      <BasketItem
        v-for="item in basketItems"
        :key="item.product.id"
        :product="item.product"
        :quantity="item.quantity"
        tag="div"
      />
    </section>
    <p v-if="basketItems.length > 0">Total Price: ${{ totalPrice }}</p>
  </main>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import { useGenericStore } from '@/stores/genericStore'
import BasketItem from '@/components/Basket/BasketItem.vue'

const basketStore = useBasketStore()
const genericStore = useGenericStore()

// Load the basket items and generic data from localStorage on page load
onMounted(() => {
  basketStore.loadBasket()
  genericStore.loadFromLocalStorage()
})

const basketItems = computed(() => basketStore.items)
const totalPrice = computed(() => basketStore.totalPrice)
</script>
