// import {
//   registerUserApi,
//   loginUserApi,
//   verifyMfaApi,
// } from "../api/authApi";

// export const registerUserService = async (data) => {
//   const res = await registerUserApi(data);
//   return res.data;
// };

// export const loginUserService = async (data) => {
//   const res = await loginUserApi(data);
//   return res.data; // OTP sent response
// };

// export const verifyMfaService = async (data) => {
//   const res = await verifyMfaApi(data);
//   return res.data; // token + user
// };
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
  return res.data; // OTP sent response
};

export const verifyMfaService = async (data) => {
  const res = await verifyMfaApi(data);
  return res.data; // user data (token is in cookie)
};

export const logoutUserService = async () => {
  const res = await logoutUserApi();
  return res.data;
};