import { createSlice } from '@reduxjs/toolkit';
import { createShop } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  shop: null,
  isLoading: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.shop = action.payload;
        state.isLoading = false;
      })
      .addCase(createShop.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState);
  },
});

export const shopReducer = shopSlice.reducer;