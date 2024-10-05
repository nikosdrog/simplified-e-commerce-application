import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
  state: () => ({
    items: [] as Array<{ product: any; quantity: number }>, // Include quantity
  }),
  actions: {
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
    removeFromBasket(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId)
      this.saveBasket() // Save to localStorage after any change
    },
    updateQuantity(productId: number, newQuantity: number) {
      const existingItem = this.items.find(
        (item) => item.product.id === productId,
      )
      if (existingItem) {
        existingItem.quantity = newQuantity
        if (newQuantity === 0) {
          this.removeFromBasket(productId)
        }
      }
      this.saveBasket() // Save to localStorage after any change
    },
    loadBasket() {
      const savedBasket = localStorage.getItem('basket')
      if (savedBasket) {
        this.items = JSON.parse(savedBasket)
      }
    },
    saveBasket() {
      localStorage.setItem('basket', JSON.stringify(this.items))
    },
  },
  getters: {
    itemCount: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
  },
})
