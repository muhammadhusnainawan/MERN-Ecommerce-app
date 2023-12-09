import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_DEL_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${window.location.origin}/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  const updatedCartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

export const removeCartProductAction = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_DEL_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};

export const shippingAdressAction = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAdress", JSON.stringify(data));
};

export const paymentMethodAction = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload:data
  })
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}
