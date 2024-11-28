import React from "react";
import { Pagination, Service } from "../../types";
import DTable from "../components/DTable";

interface ServiceTableProps {
  services: Service[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services = [],
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "PackageType",
      dataIndex: "packageType",
      key: "packageType",
    },
  ];

  return (
    <DTable
      data={services}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default ServiceTable;
