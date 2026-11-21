import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader } from '../../api/axiosInstance';
import { getErrorMessage } from '../../utils/getErrorMessage';


export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/user/register', credentials);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/user/login', credentials);
      const { token } = data.data;
      setAuthHeader(token);
      const info = await api.get('/user/user-info');
      return { token, ...info.data.data };
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await api.get('/user/logout');
  } finally {
    clearAuthHeader();
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) {
      return thunkAPI.rejectWithValue('No token');
    }
    try {
      setAuthHeader(token);
      const { data } = await api.get('/user/user-info');
      return data.data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);