import React from "react";
import { Pagination, User } from "../../types";
import DTable from "../components/DTable";

interface UserTableProps {
  users: User[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  pagination,
  fetchData,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <DTable
      data={users}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default UserTable;
