import { createSlice } from "@reduxjs/toolkit";
import {API, APIAuthenticated} from "../http/index"
import { STATUS } from "../globals/status/Status";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: STATUS.LOADING,
  },
  reducers: {
    setCartData(state, action) {
      state.cart = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUpdateQuantity(state, action){
       const index= state.cart.data.findIndex(
            item => item.productId._id===action.payload.productId
        )

        if(index !== -1){
            state.cart.data[index].quantity=action.payload.quantity
        }
    },
    setDeleteItemFromCart(state, action){
       state.cart.data=  state.cart.data.filter(
            item=> item.productId._id !== action.payload.productId
        );
    }
}
});

export const {setCartData, setStatus, setUpdateQuantity, setDeleteItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;



//add to cart
export function addToCart(productId, quantity=1) {
  return async function addToCartThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.post("/api/cart", {productId, quantity});
      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        dispatch(fetchCartItem());
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data?.message || "Failed to add to cart";
        dispatch(setStatus(STATUS.ERROR));
        return { success: false, error: { message: errorMsg } };
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
      const errorMessage = err.response?.data?.message || err.message || "Failed to add product to cart. Please login first.";
      return { success: false, error: { message: errorMessage } };
    }
  };
}

//get item from cart
export function fetchCartItem() {
  return async function fetchCartItemThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get("/api/cart");
      if (response.status === 200) {
        dispatch(setCartData(response.data)); 
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      // If user is not authenticated, set empty cart instead of error
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(setCartData({ message: "Cart item fetch successfully", data: [] }));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        console.error('Cart fetch error:', err);
        dispatch(setStatus(STATUS.ERROR));
      }
    }
  };
}

//update quantity
export function updateQuantity(productId, quantity=1) {
  return async function updateQuantityThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.patch("/api/cart", {productId, quantity});
      if (response.status === 200) {
        dispatch(setUpdateQuantity({productId, quantity}))
        dispatch(setStatus(STATUS.SUCCESS));

      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

//remove item from cart
export function removeCartItem(productId) {
  return async function removeCartItemThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.delete(`/api/cart/${productId}`);
      if (response.status === 200) {

      dispatch(setDeleteItemFromCart({productId}))
        dispatch(setStatus(STATUS.SUCCESS));

      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}





