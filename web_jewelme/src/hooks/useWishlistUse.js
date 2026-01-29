import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getAllWishlists
} from "../api/wishlistApi";
import { toast } from "react-toastify";

export const useFetchWishlist = (userId) => {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist(userId),
    enabled: !!userId,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:addToWishlist,
    onSuccess: (data) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?._id) {
        queryClient.invalidateQueries(["user_wishlist", user._id]);
      }
    },
    onError: () => {
      toast.error("Failed to add To Wishlist");
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["wishlist", variables.userId]);
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });
};

export const useFetchAllWishlists = () => {
  return useQuery({
    queryKey: ["wishlist_all"],
    queryFn: getAllWishlists,
  });
};