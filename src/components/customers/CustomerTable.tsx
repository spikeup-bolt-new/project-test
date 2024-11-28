import React from "react";
import { Customer, Pagination } from "../../types";
import DTable from "../components/DTable";

interface CustomerTableProps {
  customers: Customer[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers = [],
  pagination,
  fetchData,
  onView,
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <DTable
      data={customers}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default CustomerTable;
