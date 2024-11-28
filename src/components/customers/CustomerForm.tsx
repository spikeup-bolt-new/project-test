import React, { useState } from "react";
import { Customer } from "../../types";

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (data: Partial<Customer>) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Customer>>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      identificationDocs: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter customer name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter customer email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter phone number"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Identification Documents (Comma Separated URLs)
        </label>
        <textarea
          name="identificationDocs"
          value={formData.identificationDocs?.join(", ") || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              identificationDocs: e.target.value
                .split(",")
                .map((doc) => doc.trim()),
            }))
          }
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

export default CustomerForm;
