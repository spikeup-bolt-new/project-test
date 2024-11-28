import { Invoice, ListData } from "../types";
import API from "./axiosConfig";

export const fetchInvoices = async (
  params: any
): Promise<ListData<Invoice>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/invoices?${convertedParams}`);
  return response.data;
};

export const fetchInvoice = async (id: string): Promise<Invoice> => {
  const response = await API.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (
  data: Partial<Invoice>
): Promise<Invoice> => {
  const response = await API.post("/invoices", data);
  return response.data;
};

export const updateInvoice = async (
  id: string,
  data: Partial<Invoice>
): Promise<Invoice> => {
  const response = await API.put(`/invoices/${id}`, data);
  return response.data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
  await API.delete(`/invoices/${id}`);
};

export const downloadInvoice = async (id: string): Promise<void> => {
  const response = await API.get(`/invoices/${id}/pdf`, {
    responseType: "blob", // Nhận dữ liệu dạng blob
  });

  // Tạo URL từ blob
  const url = window.URL.createObjectURL(new Blob([response.data]));

  // Tạo thẻ <a> để tải file
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `invoice_${id}.pdf`); // Tên file tải về
  document.body.appendChild(link);
  link.click();

  // Dọn dẹp URL
  link.remove();
  window.URL.revokeObjectURL(url);
};
