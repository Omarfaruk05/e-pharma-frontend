import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for Product and CartItem
interface Product {
  _id: string;
  name: string;
  price: number;
  // Add any other properties of the product as needed
}

interface CartItem extends Product {
  quantity: number;
  variantId: string;
}

// Define the state type
interface CartState {
  cart: CartItem[];
}

// Initial state
const initialState: CartState = {
  cart: [],
};

// Define the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        variantId: string;
      }>
    ) => {
      const selectedProduct = state.cart.find(
        (product) => product._id === action.payload.product._id
      );

      if (!selectedProduct) {
        const product: CartItem = {
          ...action.payload.product,
          quantity: action.payload.quantity,
          variantId: action.payload.variantId,
        };
        state.cart.push(product);
      } else {
        selectedProduct.quantity += action.payload.quantity;
        selectedProduct.variantId = action.payload.variantId;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const selectedProduct = state.cart.find(
        (product) => product._id === action.payload._id
      );

      if (selectedProduct) {
        if (selectedProduct.quantity === 1) {
          state.cart = state.cart.filter(
            (product) => product._id !== selectedProduct._id
          );
        } else {
          selectedProduct.quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((x) => x._id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addToCart, decreaseQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
