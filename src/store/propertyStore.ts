import { create } from "zustand";
import {
  createProperty,
  deleteProperty,
  getProperties,
  updateProperty,
  uploadFiles,
} from "../services/propertiesService";
import { Pagination, Property } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface PropertyState {
  properties: Property[];
  pagination: Pagination;
  fetchProperties: (params?: any) => Promise<void>;
  createProperty: (property: Partial<Property>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  uploadFiles: (files: File[]) => Promise<string[]>;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  pagination: DEFAUL_PAGINATION,
  fetchProperties: async (params) => {
    const {
      data: properties,
      total,
      page,
      pageSize,
    } = await getProperties(params);
    set({ properties, pagination: { total, page, pageSize } });
  },
  createProperty: async (property) => {
    const newProperty = await createProperty(property);
    set((state) => ({ properties: [...state.properties, newProperty] }));
  },
  updateProperty: async (id, property) => {
    const updatedProperty = await updateProperty(id, property);
    set((state) => ({
      properties: state.properties.map((p) =>
        p._id === id ? updatedProperty : p
      ),
    }));
  },
  deleteProperty: async (id) => {
    await deleteProperty(id);
    set((state) => ({
      properties: state.properties.filter((p) => p._id !== id),
    }));
  },
  uploadFiles: async (files) => {
    const fileUrls = await uploadFiles(files);
    return fileUrls;
  },
}));
