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
export const createOneProductService = async (data) => {
    try {
        const response = await createOneProductApi(data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to create product" };
    }
};

export const getOneProductService = async (id) => {
    try {
        const response = await getOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to get product" };
    }
};

export const updateOneProductService = async (id, data) => {
    try {
        const response = await updateOneProductApi(id, data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update product" };
    }
};

export const deleteOneProductService = async (id) => {
    try {
        const response = await deleteOneProductApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to delete product" };
    }
};

