import { create } from "zustand";
import {
  createService,
  createServiceRequest,
  deleteService,
  deleteServiceRequest,
  fetchService,
  fetchServiceRequest,
  fetchServiceRequests,
  fetchServiceRequestsByCustomer,
  fetchServices,
  updateService,
  updateServiceRequest,
} from "../services/serviceRequestsService";
import { Pagination, Service, ServiceRequest } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface ServiceRequestState {
  services: Service[];
  serviceRequests: ServiceRequest[];
  customerRequests: ServiceRequest[];
  paginationServices: Pagination;
  paginationRequests: Pagination;
  fetchServices: (params?: any) => Promise<void>;
  fetchService: (id: string) => Promise<Service>;
  createService: (data: Partial<Service>) => Promise<void>;
  updateService: (id: string, data: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  fetchServiceRequests: (params?: any) => Promise<void>;
  fetchServiceRequest: (id: string) => Promise<ServiceRequest>;
  fetchServiceRequestsByCustomer: (
    customerId: string,
    params?: any
  ) => Promise<void>;
  createServiceRequest: (data: Partial<ServiceRequest>) => Promise<void>;
  updateServiceRequest: (
    id: string,
    data: Partial<ServiceRequest>
  ) => Promise<void>;
  deleteServiceRequest: (id: string) => Promise<void>;
}

export const useServiceRequestStore = create<ServiceRequestState>((set) => ({
  services: [],
  serviceRequests: [],
  customerRequests: [],
  paginationServices: DEFAUL_PAGINATION,
  paginationRequests: DEFAUL_PAGINATION,
  fetchServices: async (params) => {
    const {
      data: services,
      total,
      page,
      pageSize,
    } = await fetchServices(params);
    set({ services, paginationServices: { total, page, pageSize } });
  },
  fetchService: async (id) => {
    const services = await fetchService(id);
    return services;
  },
  createService: async (data) => {
    const service = await createService(data);
    set((state) => ({ services: [...state.services, service] }));
  },
  updateService: async (id, data) => {
    const service = await updateService(id, data);
    set((state) => ({
      services: state.services.map((c) => (c._id === id ? service : c)),
    }));
  },
  deleteService: async (id) => {
    await deleteService(id);
    set((state) => ({
      services: state.services.filter((c) => c._id !== id),
    }));
  },
  fetchServiceRequests: async (params) => {
    const {
      data: serviceRequests,
      total,
      page,
      pageSize,
    } = await fetchServiceRequests(params);
    set({ serviceRequests, paginationRequests: { total, page, pageSize } });
  },
  fetchServiceRequest: async (id) => {
    const serviceRequests = await fetchServiceRequest(id);
    return serviceRequests;
  },
  fetchServiceRequestsByCustomer: async (customerId, params) => {
    const {
      data: customerRequests,
      total,
      page,
      pageSize,
    } = await fetchServiceRequestsByCustomer(customerId, params);
    set({ customerRequests, paginationRequests: { total, page, pageSize } });
  },
  createServiceRequest: async (data) => {
    const service = await createServiceRequest(data);
    set((state) => ({ serviceRequests: [...state.serviceRequests, service] }));
  },
  updateServiceRequest: async (id, data) => {
    const service = await updateServiceRequest(id, data);
    set((state) => ({
      serviceRequests: state.serviceRequests.map((c) =>
        c._id === id ? service : c
      ),
    }));
  },
  deleteServiceRequest: async (id) => {
    await deleteServiceRequest(id);
    set((state) => ({
      serviceRequests: state.serviceRequests.filter((c) => c._id !== id),
    }));
  },
}));
