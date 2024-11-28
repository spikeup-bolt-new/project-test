import { create } from "zustand";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomer,
  fetchCustomers,
  updateCustomer,
} from "../services/customersService";
import { Customer, Pagination } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface CustomerState {
  customers: Customer[];
  currentCustomer?: Customer;
  pagination: Pagination;
  fetchCustomers: (params?: any) => Promise<void>;
  fetchCustomer: (id: string) => Promise<void>;
  createCustomer: (customer: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  currentCustomer: undefined,
  pagination: DEFAUL_PAGINATION,
  fetchCustomers: async (params) => {
    console.log(params, "customers");

    const {
      data: customers,
      total,
      page,
      pageSize,
    } = await fetchCustomers(params);
    set({ customers, pagination: { total, page, pageSize } });
  },
  fetchCustomer: async (id) => {
    const currentCustomer = await fetchCustomer(id);
    set({ currentCustomer });
  },
  createCustomer: async (customer) => {
    const newCustomer = await createCustomer(customer);
    set((state) => ({ customers: [...state.customers, newCustomer] }));
  },
  updateCustomer: async (id, customer) => {
    const updatedCustomer = await updateCustomer(id, customer);
    set((state) => ({
      customers: state.customers.map((c) =>
        c._id === id ? updatedCustomer : c
      ),
    }));
  },
  deleteCustomer: async (id) => {
    await deleteCustomer(id);
    set((state) => ({
      customers: state.customers.filter((c) => c._id !== id),
    }));
  },
}));
