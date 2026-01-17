// src/api/wishlistApi.js
import axios from "../api/api";

const BASE_URL = "http://localhost:5050/api/wishlist"; 

export const addToWishlist = async ({ userId, productId, name, price, filepath }) => {
  const response = await axios.post(`${BASE_URL}/add`, {
    userId,
    productId,
    name,
    price,
    filepath,
  });
  return response.data;
};


export const getWishlist = async (userId) => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

export const removeFromWishlist = async ({ userId, productId }) => {
  const response = await axios.post(`${BASE_URL}/remove`, {
    userId,
    productId,
  });
  return response.data;
};

export const getAllWishlists = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};