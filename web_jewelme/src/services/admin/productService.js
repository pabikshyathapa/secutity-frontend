import {
    getAllProductApi,
    createOneProductApi,
    getOneProductApi,
    updateOneProductApi,
    deleteOneProductApi
} from "../../api/admin/productApi";

export const getAllProductService = async (page = 1, limit = 9) => {
  try {
    const res = await getAllProductApi(page, limit);
    return res.data; 
  } catch (err) {
    throw err.response?.data || { message: "Fetch failed" };
  }
};

// export const getAllProductService = async (page = 1, limit = 10) => {
//   try {
//     const res = await getAllProductApi(page, limit)
//     return res.data
//   } catch (err) {
//     throw err.response?.data || { message: "Fetch failed" }
//   }
// }
// ✅ Create one product
export const createOneProductService = async (data) => {
    try {
        const response = await createOneProductApi(data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to create product" };
    }
};

// ✅ Get one product by ID
export const getOneProductService = async (id) => {
    try {
        const response = await getOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to get product" };
    }
};

// ✅ Update one product
export const updateOneProductService = async (id, data) => {
    try {
        const response = await updateOneProductApi(id, data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update product" };
    }
};

// ✅ Delete one product
export const deleteOneProductService = async (id) => {
    try {
        const response = await deleteOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to delete product" };
    }
};

