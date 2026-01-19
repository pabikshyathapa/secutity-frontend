// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getUserCartService,
//   addToCartService,
//   updateCartItemService,
//   deleteCartItemService,
//   getAllCartItemsService,
//   clearAllCartItemsService
// } from "../services/cartService";

// // export const useUserCart = (userId) => {
// //   return useQuery({
// //     queryKey: ["user_cart", userId],
// //     queryFn: () => getUserCartService(userId),
// //     enabled: !!userId,
// //   });
// // };
// export const useUserCart = (userId) => {
//   return useQuery({
//     queryKey: ["user_cart", userId],
//     queryFn: () => getUserCartService(userId),
//     enabled: !!userId, // Only fetch when userId is available
//   });
// };
 
// export const useAddToCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addToCartService,
//     onSuccess: (data) => {
//       // toast.success(data.message);
//       // Invalidate cart so it refetches
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (user?._id) {
//         queryClient.invalidateQueries(["user_cart", user._id]);
//       }
//     },
//     onError: () => {
//       toast.error("Failed to add to cart");
//     },
//   });
// };

// // Update cart item

// export const useDeleteCartItem = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ userId, productId }) => deleteCartItemService(userId, productId),
//     onSuccess: (_, { userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["user_cart", userId] });
//     }
//   });
// };

// export const useUpdateCartItem = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ userId, productId, quantity }) =>
//       updateCartItemService(userId, productId, quantity),
//     onSuccess: (_, { userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["user_cart", userId] });
//     }
//   });
// };


// export const useAllCartItems = () => {
//   return useQuery({
//     queryKey: ["all_cart_items"],
//     queryFn: getAllCartItemsService,
//   });
// };

// export const useClearAllCartItems = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: clearAllCartItemsService,
//     onSuccess: (data) => {
//       // toast.success(data.message || "All cart items cleared");
//       queryClient.invalidateQueries(["all_cart_items"]);
//       queryClient.invalidateQueries({ queryKey: ["user_cart"] });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to clear all cart items");
//     }
//   });
// };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyCartService,
  addToCartService,
  updateCartItemService,
  deleteCartItemService,
  clearCartService,
} from "../services/cartService";

export const useAllCartItems = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getMyCartService,
  });

export const useAddToCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addToCartService,
    onSuccess: () => qc.invalidateQueries(["cart"]),
  });
};

export const useUpdateCartItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateCartItemService,
    onSuccess: () => qc.invalidateQueries(["cart"]),
  });
};

export const useDeleteCartItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItemService,
    onSuccess: () => qc.invalidateQueries(["cart"]),
  });
};

export const useClearCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearCartService,
    onSuccess: () => qc.invalidateQueries(["cart"]),
  });
};
