import React, { useState } from "react";
import { Contract, Invoice } from "../../types";
import { Select } from "antd";

interface InvoiceFormProps {
  contracts: Contract[];
  initialData?: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  contracts,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Invoice>>(
    initialData || {
      code: "",
      amount: 0,
      contract: undefined,
      createdAt: new Date(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: "Unpaid",
    }
  );

  const handleChange = (name: string, value: any) => {
    const findRelatedData = (list: any[], id: string) =>
      list.find((item) => item._id === id);

    setFormData((prev) => ({
      ...prev,
      [name]: name === "contract" ? findRelatedData(contracts, value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Code</label>
        <input
          value={formData.code}
          onChange={(e) => handleChange("code", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter Invoice Code"
          required
        />
      </div>

      <div>
        <label>Contract</label>
        <Select
          value={formData.contract?._id}
          onChange={(value) => handleChange("contract", value)}
          placeholder="Select Contract"
          className="w-full"
        >
          {contracts.map((contract) => (
            <Select.Option key={contract._id} value={contract._id}>
              {contract.customer.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter Invoice Amount"
          required
        />
      </div>

      <div>
        <label>Status</label>
        <Select
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
          placeholder="Select Invoice Status"
          className="w-full"
        >
          {["Paid", "Unpaid", "Overdue"].map((stt) => (
            <Select.Option key={stt} value={stt}>
              {stt}
            </Select.Option>
          ))}
        </Select>
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

export default InvoiceForm;
