import React, { useEffect, useState } from "react";
import RoomForm from "../components/rooms/RoomForm";
import RoomTable from "../components/rooms/RoomTable";
import { useCustomerStore } from "../store/customerStore";
import { usePropertyStore } from "../store/propertyStore";
import { useRoomStore } from "../store/roomStore";
import { Room } from "../types";

const RoomsPage: React.FC = () => {
  const { rooms, pagination, fetchRooms, createRoom, updateRoom, deleteRoom } =
    useRoomStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { properties, fetchProperties } = usePropertyStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>();

  useEffect(() => {
    fetchRooms();
    fetchCustomers();
    fetchProperties();
  }, [fetchRooms, fetchCustomers, fetchProperties]);

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedRoom(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (room: Room) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await deleteRoom(room._id);
    }
  };

  const handleFormSubmit = async (room: Partial<Room>) => {
    if (selectedRoom) {
      await updateRoom(selectedRoom._id, room);
    } else {
      await createRoom(room);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Room Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Room
        </button>
      </div>
      {isFormVisible ? (
        <RoomForm
          initialData={selectedRoom}
          customers={customers}
          properties={properties}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <RoomTable
          rooms={rooms}
          pagination={pagination}
          fetchData={fetchRooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default RoomsPage;
