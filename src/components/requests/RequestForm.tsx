import { Select } from "antd";
import React, { useState } from "react";
import { Customer, ServiceRequest } from "../../types";

interface RequestFormProps {
  customer: Customer;
  initialData?: ServiceRequest;
  onSubmit: (data: Partial<ServiceRequest>) => void;
  onCancel: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({
  customer,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<ServiceRequest>>(
    initialData || {
      customer,
      createdAt: new Date(),
      status: "New",
      description: "",
    }
  );

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.customer?.name}
          readOnly
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label>Status</label>
        <Select
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
          placeholder="Select Status"
          className="w-full"
        >
          {["New", "Pending", "In Progress", "Completed"].map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter document URLs"
        />
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

export default RequestForm;
