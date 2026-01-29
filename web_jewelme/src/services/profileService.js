import api from "../api/api";

export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await api.put("/profile/update", profileData);
  return res.data;
};

export const changePassword = async (passwordData) => {
  const res = await api.put("/profile/change-password", passwordData);
  return res.data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const res = await api.put("/profile/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};