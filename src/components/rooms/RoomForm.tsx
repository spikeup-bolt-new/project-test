import React, { useState } from "react";
import { Customer, Property, Room } from "../../types";

interface RoomFormProps {
  initialData?: Room;
  customers: Customer[];
  properties: Property[];
  onSubmit: (data: Partial<Room>) => void;
  onCancel: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({
  initialData,
  customers = [],
  properties = [],
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Room>>(
    initialData || {
      name: "",
      floor: "",
      status: "Available",
      price: 0,
      tenant: undefined,
      property: undefined,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const findRelatedData = (list: any[], id: string) =>
      list.find((item) => item._id === id);

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "tenant"
          ? findRelatedData(customers, value)
          : name === "property"
          ? findRelatedData(properties, value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Room Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Floor</label>
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tenant
        </label>
        <select
          name="tenant"
          value={formData.tenant?._id || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a tenant</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property
        </label>
        <select
          name="property"
          value={formData.property?._id || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select a property
          </option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
