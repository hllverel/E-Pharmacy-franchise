import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axiosInstance';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ shopId, params }, thunkAPI) => {
    try {
      const { data } = await api.get(`/shop/${shopId}/product`, { params });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);