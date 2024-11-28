import { Contract, ListData } from "../types";
import API from "./axiosConfig";

export const fetchContracts = async (
  params: any
): Promise<ListData<Contract>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/contracts?${convertedParams}`);
  return response.data;
};

export const fetchContractById = async (id: string): Promise<Contract> => {
  const response = await API.get(`/contracts/${id}`);
  return response.data;
};

export const createContract = async (
  contractData: Partial<Contract>
): Promise<Contract> => {
  const response = await API.post("/contracts", contractData);
  return response.data;
};

export const updateContract = async (
  id: string,
  contractData: Partial<Contract>
): Promise<Contract> => {
  const response = await API.put(`/contracts/${id}`, contractData);
  return response.data;
};

export const deleteContract = async (id: string): Promise<void> => {
  await API.delete(`/contracts/${id}`);
};

export const uploadContractPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/contracts/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
