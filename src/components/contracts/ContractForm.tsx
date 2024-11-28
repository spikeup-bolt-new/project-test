import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Select, Upload } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import React, { useState } from "react";
import { Contract, Customer, Room } from "../../types";
import { DATE_FORMAT } from "../../utils/const";

dayjs.extend(customParseFormat);

interface ContractFormProps {
  initialData?: Contract;
  customers: Customer[];
  rooms: Room[];
  onSubmit: (data: Partial<Contract>) => void;
  onCancel: () => void;
}

const ContractForm: React.FC<ContractFormProps> = ({
  initialData,
  customers,
  rooms,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Contract>>(
    initialData || {
      customer: undefined,
      room: undefined,
      startDate: new Date(),
      endDate: new Date(),
      paymentTerms: "",
      cancellationPolicy: "",
      renewalReminderSent: false,
      pdfPath: "",
    }
  );

  const handleInputChange = (name: string, value: any) => {
    const findRelatedData = (list: any[], id: string) =>
      list.find((item) => item._id === id);
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "customer"
          ? findRelatedData(customers, value)
          : name === "room"
          ? findRelatedData(rooms, value)
          : value,
    }));
  };

  const handleFileChange = (file: any) => {
    handleInputChange("pdfFile", file.file.originFileObj || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Customer</label>
        <Select
          value={formData.customer?._id}
          onChange={(value) => handleInputChange("customer", value)}
          placeholder="Select Customer"
          className="w-full"
        >
          {customers.map((customer) => (
            <Select.Option key={customer._id} value={customer._id}>
              {customer.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <label>Room</label>
        <Select
          value={formData.room?._id}
          onChange={(value) => handleInputChange("room", value)}
          placeholder="Select Property"
          className="w-full"
        >
          {rooms.map((room) => (
            <Select.Option key={room._id} value={room._id}>
              {room.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <label>Start Date</label>
        <DatePicker
          value={dayjs(
            moment(formData.startDate).format(DATE_FORMAT),
            DATE_FORMAT
          )}
          format={DATE_FORMAT}
          onChange={(date) => handleInputChange("startDate", date.toDate())}
          className="w-full"
        />
      </div>

      <div>
        <label>End Date</label>
        <DatePicker
          value={dayjs(
            moment(formData.endDate).format(DATE_FORMAT),
            DATE_FORMAT
          )}
          format={DATE_FORMAT}
          onChange={(date) => handleInputChange("endDate", date.toDate())}
          className="w-full"
        />
      </div>

      <div>
        <label>Payment Terms</label>
        <textarea
          value={formData.paymentTerms}
          onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter Payment Terms"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cancellation Policy
        </label>
        <input
          type="text"
          name="cancellationPolicy"
          value={formData.cancellationPolicy}
          onChange={(e) =>
            handleInputChange("cancellationPolicy", e.target.value)
          }
          className="w-full p-2 border rounded"
          placeholder="Enter Cancellation Policy"
          required
        />
      </div>

      <div>
        <Checkbox
          checked={formData.renewalReminderSent}
          onChange={(e) =>
            handleInputChange("renewalReminderSent", e.target.checked)
          }
        >
          Cancellation Policy
        </Checkbox>
      </div>

      <div>
        <label>Upload Contract (PDF)</label>
        <Upload
          accept=".pdf"
          beforeUpload={() => false}
          onChange={handleFileChange}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload PDF</Button>
        </Upload>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ContractForm;
