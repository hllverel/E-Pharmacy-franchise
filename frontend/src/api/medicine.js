import { api } from './axiosInstance';

export const getProductRequest = async (shopId, productId) => {
  const { data } = await api.get(`/shop/${shopId}/product/${productId}`);
  return data.data;
};

export const getReviewsRequest = async (shopId, productId, params) => {
  const { data } = await api.get(
    `/shop/${shopId}/product/${productId}/reviews`,
    { params },
  );
  return data.data;
};