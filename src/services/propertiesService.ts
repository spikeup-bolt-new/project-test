import { ListData, Property } from "../types";
import API from "./axiosConfig";

export const getProperties = async (
  params: any
): Promise<ListData<Property>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/properties?${convertedParams}`);
  return response.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await API.get(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (
  propertyData: Partial<Property>
): Promise<Property> => {
  const response = await API.post("/properties", propertyData);
  return response.data;
};

export const updateProperty = async (
  id: string,
  propertyData: Partial<Property>
): Promise<Property> => {
  const response = await API.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id: string): Promise<void> => {
  await API.delete(`/properties/${id}`);
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post("/properties/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.files;
};
