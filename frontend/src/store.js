import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducer";
import { cartReducer } from "../src/reducers/cartReducer";
import {
  userLoginReducer,
  userRegistrationReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "../src/reducers/userReducer";
import { orderCreateReducer } from "./reducers/orderReducer";

const shippingAdressFromStorage = localStorage.getItem("shippingAdress")
  ? JSON.parse(localStorage.getItem("shippingAdress"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  orderCreate: orderCreateReducer,
});
const middleware = [thunk];
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAdress: shippingAdressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
