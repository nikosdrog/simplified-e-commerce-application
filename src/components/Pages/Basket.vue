<template>
  <main class="w-full p-4 md:p-8">
    <EmptyCart v-if="basketItems.length === 0">{{
      langItems.emptyBasket
    }}</EmptyCart>
    <template v-else>
      <h2 class="unstyled h1 pb-8">
        {{ langItems.basketTitle }}
      </h2>
      <section class="grid gap-2">
        <BasketItem
          v-for="item in basketItems"
          :key="item.product.id"
          :product="item.product"
          :quantity="item.quantity"
          tag="div"
        />
      </section>
      <p
        v-if="basketItems.length > 0"
        class="text-right unstyled text-2xl md:text-3xl pt-4 font-bold"
      >
        {{ langItems.totalPrice }}:
        <span class="font-black">${{ $formatNumber(totalPrice) }}</span>
      </p>
    </template>
  </main>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import langItems from '@/lang/en.json'
import BasketItem from '@/components/Basket/BasketItem.vue'
import EmptyCart from '@/components/Common/EmptyList.vue'

const basketStore = useBasketStore()

// Load the basket items and generic data from localStorage on page load
onMounted(() => {
  basketStore.loadBasket()
})

const basketItems = computed(() => basketStore.items)
const totalPrice = computed(() => basketStore.totalPrice)
</script>
