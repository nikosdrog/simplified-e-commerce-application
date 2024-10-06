<template>
  <div
    class="relative"
    :class="{ 'dropdown-open': dropdownOpen }"
    ref="dropdown"
  >
    <div role="button" class="btn btn-ghost btn-circle" @click="toggleDropdown">
      <div class="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="badge badge-sm indicator-item">{{
          basketStore.itemCount
        }}</span>
      </div>
    </div>

    <div
      v-if="dropdownOpen"
      class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow absolute right-0"
    >
      <div class="card-body">
        <template v-if="basketStore.items.length > 0">
          <div class="flex flex-col gap-3 max-h-72 overflow-auto">
            <!-- Show items in basket -->
            <div
              v-for="item in basketStore.items"
              :key="item.product.id"
              class="flex justify-between items-center"
            >
              <p class="unstyled text-base truncate pr-4">
                {{ item.product.title }}<br />
                <span class="text-sm font-bold"
                  >{{ genericStore.generic.quantity }}:
                  {{ item.quantity }}</span
                >
              </p>
              <button
                class="btn btn-circle shrink-0"
                aria-label="Remove product from basket"
                @click.stop="removeFromBasket(item.product.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M465.423 48.241h-137.61V23.955C327.813 10.746 317.082 0 303.893 0h-95.785c-13.19 0-23.92 10.746-23.92 23.955V48.24H46.577c-6.655 0-12.049 5.394-12.049 12.049 0 6.655 5.394 12.049 12.049 12.049h22.332l15.228 396.396A44.858 44.858 0 0 0 129.099 512h253.804a44.855 44.855 0 0 0 44.96-43.267l15.228-396.396h22.332c6.653 0 12.049-5.394 12.049-12.049 0-6.653-5.394-12.047-12.049-12.047zM208.285 24.097h95.43V48.24h-95.43V24.097zm195.499 443.712a20.833 20.833 0 0 1-20.882 20.094H129.099a20.835 20.835 0 0 1-20.882-20.095L93.025 72.338h325.952l-15.193 395.471z"
                  />
                  <path
                    d="M182.63 181.571c-.127-6.575-5.494-11.817-12.042-11.817-.078 0-.158 0-.236.002-6.652.128-11.943 5.626-11.815 12.278l3.781 196.634c.126 6.575 5.495 11.817 12.042 11.817.078 0 .158 0 .236-.002 6.653-.128 11.943-5.624 11.815-12.278l-3.781-196.634zM255.998 169.753c-6.654 0-12.049 5.394-12.049 12.049v196.634c0 6.654 5.394 12.049 12.049 12.049 6.655 0 12.049-5.394 12.049-12.049V181.802c0-6.654-5.394-12.049-12.049-12.049zM341.645 169.756c-6.628-.147-12.151 5.162-12.278 11.815l-3.781 196.634c-.129 6.653 5.162 12.15 11.815 12.278l.236.002c6.546 0 11.916-5.244 12.042-11.817l3.781-196.634c.128-6.654-5.161-12.151-11.815-12.278z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <span
            v-if="genericStore.generic"
            class="text-base text-right border-t dark:border-neutral font-bold mt-3 pt-4 pb-2"
          >
            {{ genericStore.generic.totalPrice }}: ${{
              $formatNumber(basketStore.totalPrice)
            }}
          </span>
        </template>
        <!-- Empty basket message -->
        <template v-else>
          <span
            v-if="genericStore.generic"
            class="text-base text-center font-bold"
          >
            {{ genericStore.generic.emptyBasket }}
          </span>
        </template>

        <div
          v-if="genericStore.generic"
          class="card-actions"
          @click="closeDropdown"
        >
          <router-link to="/basket" class="btn btn-accent btn-block">{{
            genericStore.generic.viewBasket
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import { useGenericStore } from '@/stores/genericStore'

// Access the basket store
const basketStore = useBasketStore()
const genericStore = useGenericStore()

// State to manage dropdown
const dropdownOpen = ref(false)

// Reference to the dropdown element
const dropdown = ref(null)

// Function to toggle dropdown open/close
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Function to close the dropdown
const closeDropdown = () => {
  dropdownOpen.value = false
}

// Function to close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    closeDropdown()
  }
}

// Add event listener for clicks outside dropdown
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Remove event listener on component unmount
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Remove product from basket
const removeFromBasket = (productId: number) => {
  basketStore.removeFromBasket(productId)
}

// Load the basket items and generic data from localStorage on page load
onMounted(() => {
  if (!genericStore.generic) {
    genericStore.loadFromLocalStorage()
  }
})
</script>
