import React from "react";
import { Pagination, Property } from "../../types";
import DTable from "../components/DTable";
import { mapOptionFilters } from "../../utils/helpers";

interface PropertyTableProps {
  properties: Property[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      dataType: "select",
      filters: mapOptionFilters(["Building", "Apartment", "Office", "House"]),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      dataType: "number",
      render: (text: string) => `${text} sqm`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      dataType: "select",
      filters: mapOptionFilters(["Available", "Rented"]),
    },
  ];
  return (
    <DTable
      data={properties}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default PropertyTable;
