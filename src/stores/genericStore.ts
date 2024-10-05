import { defineStore } from 'pinia'
import axios from 'axios'

export const useGenericStore = defineStore('generic', {
  state: () => ({
    generic: null as any, // Store for the generic data
  }),
  actions: {
    async loadGeneric() {
      if (!this.generic) {
        try {
          const response = await axios.get('http://localhost:3008/generic')
          this.generic = response.data
          localStorage.setItem('generic', JSON.stringify(this.generic)) // Save to local storage
        } catch (error) {
          console.error('Error loading generic data:', error)
        }
      }
    },
    loadFromLocalStorage() {
      const savedGeneric = localStorage.getItem('generic')
      if (savedGeneric) {
        this.generic = JSON.parse(savedGeneric)
      }
    },
  },
})
