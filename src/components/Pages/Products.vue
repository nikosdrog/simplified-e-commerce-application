<template>
  <main class="w-full p-4 md:p-8">
    <ProductList>
      <ProductItem
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
        :generic="generic"
      />
    </ProductList>
    <h2
      v-if="paginatedProducts.length === 0"
      class="unstyled h1 pt-5 md:pt-20 text-center"
    >
      {{ generic.emptyList }}
    </h2>
    <Pagination
      v-if="paginatedProducts.length !== 0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @updatePage="updatePage"
    />
  </main>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductItem from '../Product/ProductItem.vue'
import ProductList from '../Product/ProductList.vue'
import Pagination from '../Pagination/Main.vue'

const isLoading = ref(false)
const hasError = ref(false)
const products = ref([])
const generic = ref([])

// Get the current page from the query parameter in the route
const route = useRoute()
const router = useRouter()
const currentPage = ref(parseInt(route.query.page as string) || 1)
const productsPerPage = ref(6) // Number of products per page

onMounted(async () => {
  isLoading.value = true
  try {
    const [responseGeneric, responseProducts] = await Promise.all([
      axios.get('http://localhost:3008/generic'),
      axios.get('http://localhost:3008/products'),
    ])
    generic.value = responseGeneric.data
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
