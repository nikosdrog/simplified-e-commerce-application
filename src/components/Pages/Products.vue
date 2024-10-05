<template>
  <main class="w-full p-4 md:p-8">
    <EmptyList v-if="paginatedProducts.length === 0">{{
      genericStore.generic.emptyList
    }}</EmptyList>
    <template v-else>
      <h2 v-if="genericStore.generic" class="unstyled h1 pb-8">
        {{ genericStore.generic.productTitle }}
      </h2>
      <ProductList>
        <ProductItem
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          :generic="genericStore.generic"
        />
      </ProductList>

      <Pagination
        v-if="paginatedProducts.length !== 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @updatePage="updatePage"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGenericStore } from '@/stores/genericStore'
import ProductItem from '@/components/Product/ProductItem.vue'
import ProductList from '@/components/Product/ProductList.vue'
import Pagination from '@/components/Pagination/Main.vue'
import EmptyList from '@/components/Common/EmptyList.vue'

const isLoading = ref(false)
const hasError = ref(false)
const products = ref([])

// Get the current page from the query parameter in the route
const route = useRoute()
const router = useRouter()
const currentPage = ref(parseInt(route.query.page as string) || 1)
const productsPerPage = ref(6) // Number of products per page

// Get the generic store
const genericStore = useGenericStore()

onMounted(async () => {
  // Load generic data from the store or from localStorage
  genericStore.loadFromLocalStorage()
  if (!genericStore.generic) {
    await genericStore.loadGeneric()
  }

  isLoading.value = true
  try {
    const responseProducts = await axios.get('http://localhost:3008/products')
    products.value = responseProducts.data
  } catch (error) {
    hasError.value = true
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
})

// Watch for route changes (when the user navigates using the pagination)
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = parseInt(newPage as string) || 1
  },
)

// Compute the total number of pages
const totalPages = computed(() =>
  Math.ceil(products.value.length / productsPerPage.value),
)

// Compute the products to display based on the current page
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value
  const end = start + productsPerPage.value
  return products.value.slice(start, end)
})

// Handle page change event from Pagination component
const updatePage = (newPage: number) => {
  // Update the URL to include the new page number as a query parameter
  router.push({ query: { ...route.query, page: newPage.toString() } })
}
</script>
