import { create } from "zustand";
import {
  createInvoice,
  deleteInvoice,
  downloadInvoice,
  fetchInvoice,
  fetchInvoices,
  updateInvoice,
} from "../services/invoicesService";
import { Invoice, Pagination } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface InvoiceState {
  invoices: Invoice[];
  currentInvoice?: Invoice;
  pagination: Pagination;
  fetchInvoices: (params?: any) => Promise<void>;
  fetchInvoice: (id: string) => Promise<void>;
  createInvoice: (invoice: Partial<Invoice>) => Promise<void>;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  downloadInvoice: (id: string) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  currentInvoice: undefined,
  pagination: DEFAUL_PAGINATION,
  fetchInvoices: async (params) => {
    const {
      data: invoices,
      total,
      page,
      pageSize,
    } = await fetchInvoices(params);
    set({ invoices, pagination: { total, page, pageSize } });
  },
  fetchInvoice: async (id) => {
    const currentInvoice = await fetchInvoice(id);
    set({ currentInvoice });
  },
  createInvoice: async (invoice) => {
    const newInvoice = await createInvoice(invoice);
    set((state) => ({ invoices: [...state.invoices, newInvoice] }));
  },
  updateInvoice: async (id, invoice) => {
    const updatedInvoice = await updateInvoice(id, invoice);
    set((state) => ({
      invoices: state.invoices.map((c) => (c._id === id ? updatedInvoice : c)),
    }));
  },
  deleteInvoice: async (id) => {
    await deleteInvoice(id);
    set((state) => ({
      invoices: state.invoices.filter((c) => c._id !== id),
    }));
  },
  downloadInvoice: async (id) => {
    await downloadInvoice(id);
  },
}));
