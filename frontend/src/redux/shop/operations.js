import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axiosInstance';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const createShop = createAsyncThunk(
  'shop/create',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post('/shop/create', formData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);