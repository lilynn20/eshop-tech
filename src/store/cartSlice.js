import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const incoming = action.payload
      const existing = state.items.find((item) => item.id === incoming.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: incoming.id,
          title: incoming.title,
          price: incoming.price,
          image: incoming.image,
          quantity: 1,
        })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const target = state.items.find((item) => item.id === id)
      if (!target) return
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        target.quantity = quantity
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0)

export default cartSlice.reducer
