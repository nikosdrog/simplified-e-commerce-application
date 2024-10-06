import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import ProductItem from './ProductItem.vue'
import { useBasketStore } from '@/stores/basketStore'
import { createPinia, setActivePinia } from 'pinia'
import { formatNumber } from '@/utils/numberFormatter'

describe('ProductItem.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Initialize Pinia store
  })

  const product = {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    image: '/test-image',
    mobileImage: '/test-mobile-image',
  }

  const generic = {
    addToCart: 'Add to Cart',
  }

  it('adds product to basket when "Add to Cart" is clicked', async () => {
    const { getByText } = render(ProductItem, {
      props: { product, generic },
      global: {
        config: {
          globalProperties: {
            $formatNumber: formatNumber,
          },
        },
      },
    })
    const basketStore = useBasketStore()

    // Simulate clicking "Add to Cart"
    const button = getByText('Add to Cart')
    await fireEvent.click(button)

    // Check if the product is added to the basket
    expect(basketStore.items[0].product.title).toBe('Test Product')
  })

  it('updates quantity in the basket', async () => {
    const { getByLabelText, getByText } = render(ProductItem, {
      props: { product, generic },
      global: {
        config: {
          globalProperties: {
            $formatNumber: formatNumber,
          },
        },
      },
    })
    const basketStore = useBasketStore()

    // Clear the basket before the test
    basketStore.clearBasket()

    // Add product to the basket
    basketStore.addToBasket(product)
    console.log('Initial quantity:', basketStore.items[0].quantity) // Debug to check the quantity

    // Check the initial quantity
    expect(basketStore.items[0].quantity).toBe(1)

    // Simulate clicking the button to increase quantity
    const addButton = getByLabelText('Add product to basket')
    await fireEvent.click(addButton)

    // Check if the quantity increased correctly
    console.log('Quantity after clicking +:', basketStore.items[0].quantity) // Debug to check the quantity after clicking
    expect(basketStore.items[0].quantity).toBe(2)
  })
})
