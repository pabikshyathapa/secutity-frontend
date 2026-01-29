import { getAllUserApi, deleteUserApi, updateUserApi, getUserByIdApi , createUserApi} from "../../api/admin/userApi"

export const getAllUserService = async () => {
    try {
        const response = await getAllUserApi()
        return response.data
    } catch (err) {
        throw err.response?.data || { "message": "Failed to fetch" }
    }
}
export const getUserByIdService = async (id) => {
  try {
    const response = await getUserByIdApi(id);
    if (response.succes) {
      return response.data; 
    } else {
      throw new Error(response.message || "Failed to fetch user");
    }
  } catch (err) {
    throw err?.response?.data || { message: err.message || "Failed to fetch user" };
  }
};

export const createUserService = async (formData) => {
    try {
        const response = await createUserApi(formData);
        return response;
    } catch (err) {
        throw err?.response?.data || { message: "Failed to create user" };
    }
};

export const updateUserService = async ({ id, data }) => {
    try {
        const response = await updateUserApi({ id, data });
        return response;
    } catch (error) {
        throw error?.response?.data || { message: "Failed to update user" };
    }
};

export const deleteUserService = async (id) => {
  try {
    const response = await deleteUserApi(id);
    return response.data;  
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete user");
  }
};
// import axios from "axios"


// export const getAllUserService = () =>
//     axios.get("/admin/user")

// export const createOneUserService = (data) =>
//     axios.post("/admin/user", data)

// export const getOneUserService = (id) =>
//     axios.get("/admin/user/" + id)

// export const updateOneUserService = (id, data) =>
//     axios.put("/admin/user/" + id, data)

// export const deleteOneUserService = (id) =>
//     axios.delete("/admin/user/" + id)
