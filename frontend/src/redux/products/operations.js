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

export const createProduct = createAsyncThunk(
  'products/create',
  async ({ shopId, formData }, thunkAPI) => {
    try {
      const { data } = await api.post(`/shop/${shopId}/product/add`, formData);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ shopId, productId, formData }, thunkAPI) => {
    try {
      const { data } = await api.put(
        `/shop/${shopId}/product/${productId}/edit`,
        formData,
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async ({ shopId, productId }, thunkAPI) => {
    try {
      await api.delete(`/shop/${shopId}/product/${productId}/delete`);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);