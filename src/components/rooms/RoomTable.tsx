import React from "react";
import { Pagination, Room } from "../../types";
import DTable from "../components/DTable";
import { mapOptionFilters } from "../../utils/helpers";

interface RoomTableProps {
  rooms: Room[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
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
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      dataType: "select",
      filters: mapOptionFilters(["Available", "Rented"]),
    },
    {
      title: "Tenant",
      dataIndex: ["tenant", "name"],
      key: "tenant|name",
    },
    {
      title: "Property",
      dataIndex: ["property", "name"],
      key: "property|name",
    },
  ];

  return (
    <DTable
      data={rooms}
      columns={columns}
      pagination={pagination}
      fetchData={fetchData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default RoomTable;
