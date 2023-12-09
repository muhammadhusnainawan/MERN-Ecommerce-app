import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
} from "../constants/productConstants";
const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: null };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, error: null };
    case PRODUCT_LIST_FAILS:
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

const initState = {
  loading: false,
  product: { reviews: [] },
  error: null,
};
export const productDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
