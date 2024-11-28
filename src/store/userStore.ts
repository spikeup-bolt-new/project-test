import { create } from "zustand";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/userService";
import { Pagination, User } from "../types";
import { DEFAUL_PAGINATION } from "../utils/const";

interface UserState {
  users: User[];
  pagination: Pagination;
  fetchUsers: (params?: any) => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  pagination: DEFAUL_PAGINATION,
  fetchUsers: async (params) => {
    const { data: users, total, page, pageSize } = await getUsers(params);
    set({ users, pagination: { total, page, pageSize } });
  },
  createUser: async (userData) => {
    try {
      const newUser = await createUser(userData);
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  },
  updateUser: async (id, user) => {
    try {
      const updatedUser = await updateUser(id, user);
      set((state) => ({
        users:
          state.users?.map((u) =>
            u._id === updatedUser._id ? updatedUser : u
          ) || [],
      }));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },
  deleteUser: async (id) => {
    try {
      await deleteUser(id);
      set((state) => ({
        users: state.users?.filter((user) => user._id !== id) || [],
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  },
}));
