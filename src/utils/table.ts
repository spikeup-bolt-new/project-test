import { SorterResult } from "antd/es/table/interface";

export const buildSortString = (sorter: SorterResult<any> | SorterResult<any>[]) => {
  if (Array.isArray(sorter)) {
    return sorter.map(s => `${s.field}___${s.order}`).join(",");
  }
  return sorter?.field ? `${sorter.field}___${sorter.order}` : undefined;
};

export const buildFilterParams = (filters: Record<string, any>) => {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};