import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createShop, getShop, updateShop } from './operations';
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
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState)
      .addMatcher(
        isAnyOf(createShop.fulfilled, getShop.fulfilled, updateShop.fulfilled),
        (state, action) => {
          state.shop = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(createShop.pending, getShop.pending, updateShop.pending),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          createShop.fulfilled,
          getShop.fulfilled,
          updateShop.fulfilled,
          createShop.rejected,
          getShop.rejected,
          updateShop.rejected,
        ),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const shopReducer = shopSlice.reducer;