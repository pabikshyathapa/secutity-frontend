import axios from "./api";

export const registerUserApi = (data) =>
  axios.post("/auth/register", data);

export const loginUserApi = (data) =>
  axios.post("/auth/login", data);

// IMPORTANT: must send email + otp
export const verifyMfaApi = (data) =>
  axios.post("/auth/verify-mfa", data);
