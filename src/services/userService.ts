import { ListData, User } from "../types";
import API from "./axiosConfig";

export const getUsers = async (params?: any): Promise<ListData<User>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/users?${convertedParams}`);
  return response.data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await API.post("/users", userData);
  return response.data;
};

export const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<User> => {
  const response = await API.put(`/users/${id}`, updateData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await API.delete(`/users/${id}`);
};
