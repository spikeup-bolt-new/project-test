import API from "./axiosConfig";

export const paypalCreateOrder = async (amount: string) => {
  const response = await API.post("/payments/paypal/create-order", { amount });
  return response.data.id;
};

export const paypalCaptureOrder = async (orderId: string) => {
  const response = await API.post("/payments/paypal/capture-order", {
    orderId,
  });
  return response.data;
};
