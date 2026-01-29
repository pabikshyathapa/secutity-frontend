import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, getMyOrders, getAllOrders } from "../services/checkoutorder";
import { toast } from "react-toastify";


export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create order");
    },
  });
};


export const useMyOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    staleTime: 1000 * 60 * 5, 
    onError: (error) => {
      toast.error(error.message || "Failed to fetch orders");
    },
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ["orders", "all"],
    queryFn: getAllOrders,
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      toast.error(error.message || "Failed to fetch orders");
    },
  });
};