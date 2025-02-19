import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/api';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setLoadingFalse, setError } = productSlice.actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const products = await fetchProducts();
    dispatch(setProducts(products));
    dispatch(setLoadingFalse()); 
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoadingFalse());
  }
};

export default productSlice.reducer;
