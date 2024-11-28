import { create } from "zustand";
import {
  createContract,
  deleteContract,
  fetchContractById,
  fetchContracts,
  updateContract,
  uploadContractPDF,
} from "../services/contractsService";
import { Contract, Pagination } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface ContractState {
  contracts: Contract[];
  pagination: Pagination;
  fetchContracts: (params?: any) => Promise<void>;
  fetchContractById: (id: string) => Promise<Contract>;
  createContract: (contract: Partial<Contract>) => Promise<void>;
  updateContract: (id: string, contract: Partial<Contract>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
  uploadContractPDF: (files: File) => Promise<string>;
}

export const useContractStore = create<ContractState>((set) => ({
  contracts: [],
  pagination: DEFAUL_PAGINATION,
  fetchContracts: async (params) => {
    const {
      data: contracts,
      total,
      page,
      pageSize,
    } = await fetchContracts(params);
    set({ contracts, pagination: { total, page, pageSize } });
  },
  fetchContractById: async (id) => {
    const contract = await fetchContractById(id);
    return contract;
  },
  createContract: async (contract) => {
    const newContract = await createContract(contract);
    set((state) => ({ contracts: [...state.contracts, newContract] }));
  },
  updateContract: async (id, contract) => {
    const updatedContract = await updateContract(id, contract);
    set((state) => ({
      contracts: state.contracts.map((p) =>
        p._id === id ? updatedContract : p
      ),
    }));
  },
  deleteContract: async (id) => {
    await deleteContract(id);
    set((state) => ({
      contracts: state.contracts.filter((p) => p._id !== id),
    }));
  },
  uploadContractPDF: async (file) => {
    const fileUrls = await uploadContractPDF(file);
    return fileUrls;
  },
}));
