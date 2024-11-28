import { Customer, ListData } from "../types";
import API from "./axiosConfig";

export const fetchCustomers = async (
  params: any
): Promise<ListData<Customer>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/customers?${convertedParams}`);
  return response.data;
};

export const fetchCustomer = async (id: string): Promise<Customer> => {
  const response = await API.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (
  data: Partial<Customer>
): Promise<Customer> => {
  const response = await API.post("/customers", data);
  return response.data;
};

export const updateCustomer = async (
  id: string,
  data: Partial<Customer>
): Promise<Customer> => {
  const response = await API.put(`/customers/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await API.delete(`/customers/${id}`);
};
