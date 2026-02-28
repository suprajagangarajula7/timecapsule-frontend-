import api from "../api/api";

// REGISTER
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// LOGIN ✅ IMPORTANT
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};