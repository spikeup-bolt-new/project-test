import { User } from "../types";
import API from "./axiosConfig";

export const login = async (email: string, password: string) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData: Partial<User>) => {
  const response = await API.post(`/auth/register`, userData);
  return response.data;
};

export const logout = async () => {
  await API.post("/auth/logout");
};

export const checkAuth = async () => {
  const response = await API.get("/auth/check");
  return response.data;
};
