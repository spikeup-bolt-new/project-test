import { pickBy } from "lodash";

export const filterParams = (params: any) =>
  pickBy(params, (value) => value != null);

export const mapOptionFilters = (array: string[]) =>
  array.map((item) => ({ label: item, value: item }));
