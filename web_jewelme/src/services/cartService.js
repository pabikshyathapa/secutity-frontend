import {
  getMyCartApi,
  addToCartApi,
  updateCartItemApi,
  deleteCartItemApi,
  clearCartApi,
} from "../api/cartApi";

export const getMyCartService = async () => {
  const res = await getMyCartApi();
  return res.data.data; 
};

export const addToCartService = async (data) => {
  const res = await addToCartApi(data);
  return res.data.data;
};

export const updateCartItemService = async (data) => {
  const res = await updateCartItemApi(data);
  return res.data.data;
};

export const deleteCartItemService = async (data) => {
  const res = await deleteCartItemApi(data);
  return res.data.data;
};

export const clearCartService = async () => {
  const res = await clearCartApi();
  return res.data;
};
