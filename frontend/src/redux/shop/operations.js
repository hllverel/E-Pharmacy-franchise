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

export const getShop = createAsyncThunk(
  'shop/get',
  async (shopId, thunkAPI) => {
    try {
      const { data } = await api.get(`/shop/${shopId}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateShop = createAsyncThunk(
  'shop/update',
  async ({ shopId, values }, thunkAPI) => {
    try {
      const { data } = await api.put(`/shop/${shopId}/update`, values);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);