<template>
  <header class="z-10 sticky top-0 border-b dark:border-neutral">
    <h1 class="visually-hidden">Κατάλογος Προϊόντων</h1>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <router-link
          class="unstyled text-xl md:text-4xl inline-block px-2"
          to="/"
        >
          e-commerce
        </router-link>
      </div>
      <div class="flex-none">
        <!--Theme switcher-->
        <label class="btn btn-ghost btn-circle swap swap-rotate ml-2">
          <!-- This hidden checkbox controls the theme change -->
          <input
            type="checkbox"
            @change="toggleTheme"
            aria-label="Toggle theme"
          />
          <!-- Sun icon for light theme -->
          <svg
            class="h-7 w-7"
            :class="toggleTheme ? 'swap-off' : 'swap-on'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- Moon icon for dark theme -->
          <svg
            class="h-7 w-7"
            :class="toggleTheme ? 'swap-on' : 'swap-off'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
        <!--Cart-->
        <Basket />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Basket from '@/components/Basket/BasketHeader.vue'

// Ref for the current theme
const currentTheme = ref('light')

// Toggle between light and dark themes
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  document.documentElement.classList.toggle(
    'dark',
    currentTheme.value === 'dark',
  )
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    currentTheme.value = savedTheme
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    // Check if the user's system is set to dark mode
    currentTheme.value = 'dark'
  } else {
    currentTheme.value = 'light'
  }

  // Apply the data-theme and class="dark" if the currentTheme is dark
  document.documentElement.setAttribute('data-theme', currentTheme.value)

  if (currentTheme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Save the theme preference in localStorage
watch(currentTheme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
})
</script>
