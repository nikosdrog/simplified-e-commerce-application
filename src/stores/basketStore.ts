import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
  state: () => ({
    items: [] as Array<{ product: any; quantity: number }>, // Include quantity
  }),

  // When the store is created, load the basket from localStorage
  persist: true, // Auto-load the basket on initialization

  actions: {
    // Add product to basket
    addToBasket(product: any) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id,
      )
      if (!existingItem) {
        this.items.push({ product, quantity: 1 })
      } else {
        existingItem.quantity++
      }
      this.saveBasket() // Save to localStorage after any change
    },

    // Remove product from basket by ID
    removeFromBasket(productId: number) {
      const index = this.items.findIndex(
        (item) => item.product.id === productId,
      )
      if (index !== -1) {
        this.items.splice(index, 1) // Remove the item from the array
        this.saveBasket() // Save to localStorage after any change
      }
    },

    // Update quantity for an existing item in the basket
    updateQuantity(productId: number, newQuantity: number) {
      const existingItem = this.items.find(
        (item) => item.product.id === productId,
      )
      if (existingItem) {
        if (newQuantity <= 0) {
          this.removeFromBasket(productId)
        } else {
          existingItem.quantity = newQuantity
        }
      }
      this.saveBasket() // Save to localStorage after any change
    },

    // Load the basket from localStorage
    loadBasket() {
      const savedBasket = localStorage.getItem('basket')
      if (savedBasket) {
        try {
          this.items = JSON.parse(savedBasket) || []
        } catch (error) {
          this.items = [] // Initialize empty array if parsing fails
        }
      } else {
        this.items = [] // Initialize empty basket if localStorage is empty
      }
    },

    // Save the basket to localStorage
    saveBasket() {
      localStorage.setItem('basket', JSON.stringify(this.items))
    },
    clearBasket() {
      this.items = []
      this.saveBasket() // Save the empty state
    },
  },

  getters: {
    // Total item count in the basket
    itemCount: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0),

    // Total price for all items in the basket
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
  },
})
