
import axios from '../api/api'

const BASE_URL = "http://localhost:5050/api/order"; 

export const checkoutOrderApi = (data) => {
  return axios.post(`${BASE_URL}/checkout`, data);
};

export const getOrdersByUserApi = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`);
};
