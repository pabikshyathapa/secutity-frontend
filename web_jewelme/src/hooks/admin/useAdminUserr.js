import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  getAllUserService, deleteUserService 
    , getUserByIdService, updateUserService , createUserService} from "../../services/admin/userService";
import { toast } from "react-toastify";

export const useAdminUser = () => {
    const query = useQuery(
        {
            queryKey: ["admin_user"],
            queryFn: () =>
                getAllUserService()
        }
    )
    const users = query.data?.data || []
    return {
        ...query, users
    }
}
export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["admin_user", id],
    queryFn: () => getUserByIdService(id),
    enabled: !!id,
  });
};

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserService,
    onSuccess: (data) => {
      toast.success(data?.message || "User updated successfully");
      queryClient.invalidateQueries(["admin_user"]); 
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update user");
      options?.onError?.(error);
    },
  });
};
export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserService,
    onSuccess: (data) => {
      toast.success(data?.message || "User created successfully");
      queryClient.invalidateQueries(["admin_user"]); 
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create user");
      options?.onError?.(error);
    },
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
    
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      
      console.error("Delete failed:", error);
    }
  });
};