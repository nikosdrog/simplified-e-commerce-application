import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBasketStore } from './basketStore'

describe('Basket Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a product to the basket', () => {
    const basketStore = useBasketStore()
    const product = { id: 1, title: 'Test Product', price: 100 }

    basketStore.addToBasket(product)

    expect(basketStore.items.length).toBe(1)
    expect(basketStore.items[0].product.title).toBe('Test Product')
  })

  it('updates product quantity in the basket', () => {
    const basketStore = useBasketStore()
    const product = { id: 1, title: 'Test Product', price: 100 }

    basketStore.addToBasket(product)
    basketStore.updateQuantity(1, 2)

    expect(basketStore.items[0].quantity).toBe(2)
  })

  it('removes a product from the basket', () => {
    const basketStore = useBasketStore()
    const product = { id: 1, title: 'Test Product', price: 100 }

    basketStore.addToBasket(product)
    basketStore.removeFromBasket(1)

    expect(basketStore.items.length).toBe(0)
  })
})
