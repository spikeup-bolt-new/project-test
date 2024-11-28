import React from "react";
import { Pagination, ServiceRequest } from "../../types";
import DTable from "../components/DTable";
import { mapOptionFilters } from "../../utils/helpers";

interface RequestTableProps {
  requests: ServiceRequest[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onEdit?: (request: ServiceRequest) => void;
  onDelete?: (request: ServiceRequest) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({
  requests = [],
  pagination,
  fetchData,
  onEdit,
  onDelete,
}) => {
  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: ["customer", "name"],
    //   key: "customer",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      dataType: "select",
      filters: mapOptionFilters(["New", "Pending", "In Progress", "Completed"]),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <DTable
      data={requests}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default RequestTable;
