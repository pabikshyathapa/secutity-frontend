import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrdersByUserService,
  checkoutOrderService
} from "../services/orderService";
import { toast } from "react-toastify";


export const useUserOrders = (userId) => {
  const query = useQuery({
    queryKey: ["user_orders", userId],
    queryFn: () => getOrdersByUserService(userId),
    enabled: !!userId
  });

  const userOrders = query.data?.data || [];
  return { ...query, userOrders };
};


export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkoutOrderService,
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries(["user_orders"]);
      queryClient.invalidateQueries(["user_cart"]); // Optional: clear cart after order
    },
    onError: (err) => {
      toast.error(err.message || "Failed to place order");
    }
  });
};
