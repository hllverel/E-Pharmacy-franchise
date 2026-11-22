import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  items: [],
  categories: [],
  page: 1,
  totalPages: 1,
  totalItems: 0,
  isLoading: true,
  currentRequestId: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        state.items = [];
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        const { products, categories, page, totalPages, totalItems } = action.payload;
        state.items = products;
        state.categories = categories;
        state.page = page;
        state.totalPages = totalPages;
        state.totalItems = totalItems;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState);
  },
});

export const productsReducer = productsSlice.reducer;