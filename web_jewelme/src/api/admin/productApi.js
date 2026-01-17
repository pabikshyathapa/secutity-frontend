import axios from "../api"

 // ✅ Get all products
 export const getAllProductApi = async (page = 1, limit = 9) => {
  return await axios.get('http://localhost:5050/api/admin/product', {
    params: { page, limit }
  });
};
// export const getAllProductApi = (page = 1, limit = 10) =>
//   axios.get(`/admin/product?page=${page}&limit=${limit}`)

// ✅ Create a new product (with image)
export const createOneProductApi = (data) =>
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

// ✅ Get a single product by ID
export const getOneProductApi = (id) =>
    axios.get("/admin/product/" + id)

// ✅ Update a product (with image update support)
export const updateOneProductApi = (id, data) =>
    axios.put("/admin/product/" + id, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

// ✅ Delete a product
export const deleteOneProductApi = (id) =>
    axios.delete("/admin/product/" + id)

// import axios from "../api"

// export const getAllProductApi = (params) => axios.get("/admin/product", {params})

// export const getOneProductApi = (id) => 
//     axios.get("/admin/product/" + id)

// import axios from "../api"; //mycode

// // GET all products (with pagination & search support)
// export const getAllProductApi = (params) =>
//   axios.get("/admin/product", { params });

// // export const createOneProductApi= (data) => {
// //   const token = localStorage.getItem("token"); 
// //     return axios.post("/admin/product", data, {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //       Authorization: `Bearer ${token}`, // Add this line
// //     },
// //   });
// // };

// // CREATE one product (multipart/form-data for file upload)
// export const createOneProductApi = (data) =>
//   axios.post("/admin/product", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

// // UPDATE one product (e.g., with image)
// export const updateOneProductApi = (id, data) =>
//   axios.put(`/admin/product/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

// // GET one product by ID
// export const getOneProductApi = (id) =>
//   axios.get(`/admin/product/${id}`);

// // DELETE one product
// export const deleteOneProductApi = (id) =>
//   axios.delete(`/admin/product/${id}`);
