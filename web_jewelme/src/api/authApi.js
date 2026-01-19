import api from "./api";

export const registerUserApi = (data) =>
  api.post("/auth/register", data);

export const loginUserApi = (data) =>
  api.post("/auth/login", data);

// IMPORTANT: must send email + otp
export const verifyMfaApi = (data) =>
  api.post("/auth/verify-mfa", data);

export const logoutUserApi = () =>
  api.post("/auth/logout");

export const getCsrfTokenApi = () =>
  api.get("/auth/csrf-token");