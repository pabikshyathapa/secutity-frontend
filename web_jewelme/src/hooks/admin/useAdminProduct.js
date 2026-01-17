import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAllProductService,
    createOneProductService,
    getOneProductService,
    updateOneProductService,
    deleteOneProductService
} from "../../services/admin/productService";
import { toast } from "react-toastify";

// ✅ Fetch all products
export const useAdminProduct = (page = 1, limit = 9) => {
  const query = useQuery({
    queryKey: ["admin_product", page],
    queryFn: () => getAllProductService(page, limit)
  });

  const products = query.data?.data || [];
  const total = query.data?.total || 0;
  const pages = query.data?.pages || 1;

  return {
    ...query,
    products,
    total,
    pages
  };
};

// export const useAdminProduct = (page = 1, limit = 10) => {
//   const query = useQuery({
//     queryKey: ["admin_product", page],
//     queryFn: () => getAllProductService(page, limit)
//   })

//   const products = query.data?.data || []
//   const total = query.data?.total || 0
//   const pages = query.data?.pages || 1

//   return {
//     ...query,
//     products,
//     total,
//     pages
//   }
// }

// ✅ Create product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOneProductService,
        onSuccess: () => {
            toast.success("Product created");
            queryClient.invalidateQueries(["admin_product"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create product");
        }
    });
};

// ✅ Get one product by ID
export const useGetOneProduct = (id) => {
    const query = useQuery({
        queryKey: ["admin_product_detail", id],
        queryFn: () => getOneProductService(id),
        enabled: !!id,
        retry: false
    });

    const product = query.data?.data || {};

    return {
        ...query,
        product
    };
};

// ✅ Update product
export const useUpdateOneProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateOneProductService(id, data),
        onSuccess: () => {
            toast.success("Product updated");
            queryClient.invalidateQueries(["admin_product"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update product");
        }
    });
};

// ✅ Delete product
export const useDeleteOneProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOneProductService,
        mutationKey: ["admin_product_delete"],
        onSuccess: () => {
            toast.success("Product deleted");
            queryClient.invalidateQueries(["admin_product"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to delete product");
        }
    });
};


