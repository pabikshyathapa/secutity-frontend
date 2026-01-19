import axios from "../api"

 export const getAllProductApi = async (page = 1, limit = 9) => {
  return await axios.get('http://localhost:5050/api/admin/product', {
    params: { page, limit }
  });
};


export const createOneProductApi = (data) =>
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const getOneProductApi = (id) =>
    axios.get("/admin/product/" + id)

export const updateOneProductApi = (id, data) =>
    axios.put("/admin/product/" + id, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const deleteOneProductApi = (id) =>
    axios.delete("/admin/product/" + id)

