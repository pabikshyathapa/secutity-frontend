import {
  registerUserApi,
  loginUserApi,
  verifyMfaApi,
  logoutUserApi,
} from "../api/authApi";

export const registerUserService = async (data) => {
  const res = await registerUserApi(data);
  return res.data;
};

export const loginUserService = async (data) => {
  const res = await loginUserApi(data);
  return res.data; 
};

export const verifyMfaService = async (data) => {
  const res = await verifyMfaApi(data);
  return res.data; 
};

export const logoutUserService = async () => {
  const res = await logoutUserApi();
  return res.data;
};