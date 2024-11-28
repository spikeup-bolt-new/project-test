import { ListData, Service, ServiceRequest } from "../types";
import API from "./axiosConfig";

export const fetchServices = async (
  params?: any
): Promise<ListData<Service>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(
    `/service-requests/services?${convertedParams}`
  );
  return response.data;
};

export const fetchService = async (id: string): Promise<Service> => {
  const response = await API.get(`/service-requests/services/${id}`);
  return response.data;
};

export const createService = async (
  data: Partial<Service>
): Promise<Service> => {
  const response = await API.post("/service-requests/services", data);
  return response.data;
};

export const updateService = async (
  id: string,
  data: Partial<Service>
): Promise<Service> => {
  const response = await API.put(`/service-requests/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await API.delete(`/service-requests/services/${id}`);
};

export const fetchServiceRequests = async (
  params?: any
): Promise<ListData<ServiceRequest>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(
    `/service-requests/requests?${convertedParams}`
  );
  return response.data;
};

export const fetchServiceRequest = async (
  id: string
): Promise<ServiceRequest> => {
  const response = await API.get(`/service-requests/requests/${id}`);
  return response.data;
};

export const fetchServiceRequestsByCustomer = async (
  id: string,
  params?: any
): Promise<ListData<ServiceRequest>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(
    `/service-requests/requests/customer/${id}?${convertedParams}`
  );
  return response.data;
};

export const createServiceRequest = async (
  data: Partial<ServiceRequest>
): Promise<ServiceRequest> => {
  const response = await API.post("/service-requests/requests", data);
  return response.data;
};

export const updateServiceRequest = async (
  id: string,
  data: Partial<ServiceRequest>
): Promise<ServiceRequest> => {
  const response = await API.put(`/service-requests/requests/${id}`, data);
  return response.data;
};

export const deleteServiceRequest = async (id: string): Promise<void> => {
  await API.delete(`/service-requests/requests/${id}`);
};
