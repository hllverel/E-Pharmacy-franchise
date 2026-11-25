import { api } from './axiosInstance';

export const getStatisticsRequest = async () => {
  const { data } = await api.get('/statistics');
  return data.data;
};

export const getClientGoodsRequest = async (clientId) => {
  const { data } = await api.get(`/statistics/${clientId}/goods`);
  return data.data;
};