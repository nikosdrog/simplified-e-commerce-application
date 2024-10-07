<template>
  <main class="w-full p-4 md:p-8">
    <!-- Product Title -->
    <h2 class="unstyled h1 pb-8">
      {{ langItems.productTitle }}
    </h2>
    <!-- Product Search -->
    <ProductSearch v-model="searchQuery" @search="handleSearch" />
    <EmptyList
      v-if="paginatedProducts.length === 0"
      :searchQuery="searchQuery"
      @clearSearch="clearSearch"
      >{{ langItems.emptyList }}</EmptyList
    >
    <template v-else>
      <!-- Product List -->
      <ProductList>
        <!-- Product Item -->
        <ProductItem
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </ProductList>
      <!-- Pagination -->
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
import langItems from '@/lang/en.json'
import ProductItem from '@/components/Product/ProductItem.vue'
import ProductList from '@/components/Product/ProductList.vue'
import Pagination from '@/components/Common/Pagination.vue'
import EmptyList from '@/components/Common/EmptyList.vue'
import ProductSearch from '@/components/Product/ProductSearch.vue'

const isLoading = ref(false)
const hasError = ref(false)
const products = ref([])
const searchQuery = ref('')

// Get the current page from the query parameter in the route
const route = useRoute()
const router = useRouter()
const currentPage = ref(parseInt(route.query.page as string) || 1)
const productsPerPage = ref(6) // Number of products per page

// Filtered products based on search query
const filteredProducts = computed(() => {
  if (searchQuery.value.length >= 0) {
    // Filter products by title
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  return products.value
})

// Compute the total number of pages for filtered products
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / productsPerPage.value),
)

// Compute the products to display based on the current page and filtered results
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value
  const end = start + productsPerPage.value
  return filteredProducts.value.slice(start, end)
})

// Handle search input from the search component
const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1 // Reset to first page after search
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
}

// Handle page change event from Pagination component
const updatePage = (newPage: number) => {
  // Update the URL to include the new page number as a query parameter
  router.push({ query: { ...route.query, page: newPage.toString() } })
}

onMounted(async () => {
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
</script>
