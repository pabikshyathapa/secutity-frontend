import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

export const addToWishlistService = async (data) => {
  try {
    const response = await addToWishlist(data);
    console.log("ADD CART RESPONSE", response.data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add to Wishlist" };
  }
};

export const getWishlistService = async (userId) => {
  try {
    const response = await getWishlist(userId);
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch wishlist" };
  }
};

export const removeFromWishlistService = async (data) => {
  try {
    const response = await removeFromWishlist(data);
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to remove from wishlist" };
  }
};
export const getAllWishlistsService = async () => {
  try {
    const response = await getAllWishlists();
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch all wishlists" };
  }
};
