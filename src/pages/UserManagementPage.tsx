import React, { useEffect, useState } from "react";
import UserTable from "../components/users/UserTable";
import UserForm from "../components/users/UserForm";
import { useUserStore } from "../store/userStore";
import { User } from "../types";

const UserManagementPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const { users, pagination, fetchUsers, createUser, updateUser, deleteUser } =
    useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormVisible(true);
  };

  // const handleAdd = () => {
  // };

  const handleDelete = async (user: User) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(user._id);
    }
  };

  const handleFormSubmit = async (user: Partial<User>) => {
    if (selectedUser) {
      await updateUser(selectedUser._id, user);
    } else {
      await createUser(user);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setSelectedUser(undefined);
            setIsFormVisible(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add User
        </button>
      </div>
      {isFormVisible ? (
        <UserForm
          initialData={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <UserTable
          users={users || []}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
