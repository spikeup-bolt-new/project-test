import { ListData, Room } from "../types";
import API from "./axiosConfig";

export const fetchRooms = async (params: any): Promise<ListData<Room>> => {
  const convertedParams = new URLSearchParams(params).toString();
  const response = await API.get(`/rooms?${convertedParams}`);
  return response.data;
};

export const createRoom = async (data: Partial<Room>): Promise<Room> => {
  const response = await API.post("/rooms", data);
  return response.data;
};

export const updateRoom = async (
  id: string,
  data: Partial<Room>
): Promise<Room> => {
  const response = await API.put(`/rooms/${id}`, data);
  return response.data;
};

export const deleteRoom = async (id: string): Promise<void> => {
  await API.delete(`/rooms/${id}`);
};
