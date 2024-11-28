import { create } from "zustand";
import {
  createRoom,
  deleteRoom,
  fetchRooms,
  updateRoom,
} from "../services/roomsService";
import { Pagination, Room } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface RoomState {
  rooms: Room[];
  pagination: Pagination;
  fetchRooms: (params?: any) => Promise<void>;
  createRoom: (room: Partial<Room>) => Promise<void>;
  updateRoom: (id: string, room: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  pagination: DEFAUL_PAGINATION,
  fetchRooms: async (params) => {
    const { data: rooms, total, page, pageSize } = await fetchRooms(params);
    set({ rooms, pagination: { total, page, pageSize } });
  },
  createRoom: async (room) => {
    const newRoom = await createRoom(room);
    set((state) => ({ rooms: [...state.rooms, newRoom] }));
  },
  updateRoom: async (id, room) => {
    const updatedRoom = await updateRoom(id, room);
    set((state) => ({
      rooms: state.rooms.map((b) => (b._id === id ? updatedRoom : b)),
    }));
  },
  deleteRoom: async (id) => {
    await deleteRoom(id);
    set((state) => ({
      rooms: state.rooms.filter((b) => b._id !== id),
    }));
  },
}));
