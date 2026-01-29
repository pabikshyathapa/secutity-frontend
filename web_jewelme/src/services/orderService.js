import {
  checkoutOrderApi,
  getOrdersByUserApi
} from "../api/orderApi";

export const checkoutOrderService = async (data) => {
  try {
    const response = await checkoutOrderApi(data);
    console.log("CHECKOUT ORDER RESPONSE", response.data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to place order" };
  }
};

export const getOrdersByUserService = async (userId) => {
  try {
    const response = await getOrdersByUserApi(userId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch orders" };
  }
};
