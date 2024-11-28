import { BellOutlined } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { Contract, Pagination } from "../../types";
import { DATE_FORMAT } from "../../utils/const";
import DTable from "../components/DTable";

interface ContractTableProps {
  contracts: Contract[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onView: (contract: Contract) => void;
  onEdit: (contract: Contract) => void;
  onDelete: (contract: Contract) => void;
}

const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  pagination,
  fetchData,
  onView,
  onEdit,
  onDelete,
}) => {
  const [renewModalVisible, setRenewModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract>();
  const [selectedDuration, setSelectedDuration] = useState<number>(0);

  const handleRenew = (contract: Contract) => {
    setSelectedContract(contract);
    setRenewModalVisible(true);
  };

  const handleSaveRenew = () => {
    if (!selectedDuration || !selectedContract?._id) {
      return;
    }

    const currentEndDate = new Date(selectedContract.endDate);
    const newStartDate = currentEndDate;
    const newEndDate = new Date(
      currentEndDate.setFullYear(
        currentEndDate.getFullYear() + selectedDuration
      )
    );

    onEdit({
      ...selectedContract,
      startDate: newStartDate,
      endDate: newEndDate,
    });
    setRenewModalVisible(false);
    setSelectedDuration(0);
  };

  const getRowClassName = (record: Contract) => {
    const today = new Date();
    const endDate = new Date(record.endDate);
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    if (endDate < today) {
      return "contract-expired bg-gray-400 hover:bg-gray-500";
    } else if (endDate < oneMonthLater) {
      return "contract-warning-expired bg-yellow-100 hover:bg-yellow-200";
    }
    return "";
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      key: "customer|name",
    },
    {
      title: "Room",
      dataIndex: ["room", "name"],
      key: "room|name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: Date) => moment(value).format(DATE_FORMAT),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (value: Date) => moment(value).format(DATE_FORMAT),
    },
    {
      title: "Payment Terms",
      dataIndex: "paymentTerms",
      key: "paymentTerms",
    },
    {
      title: "Actions",
      key: "actions",
      renderActions: (record: Contract) => [
        <Button
          className="bg-amber-400"
          type="primary"
          onClick={() => handleRenew(record)}
          icon={<BellOutlined />}
          title="Renew"
        />,
      ],
    },
  ];

  return (
    <>
      <DTable
        data={contracts}
        columns={columns}
        pagination={pagination}
        fetchData={fetchData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        rowClassName={getRowClassName}
      />
      <Modal
        title="Renew Contract"
        visible={renewModalVisible}
        onCancel={() => setRenewModalVisible(false)}
        onOk={handleSaveRenew}
        okText="Save"
        cancelText="Cancel"
      >
        <div>
          <p>Select Renewal Duration:</p>
          <Select
            className="w-full"
            placeholder="Select duration"
            value={selectedDuration}
            onChange={(value) => setSelectedDuration(value)}
          >
            {[1, 2, 3, 4, 5].map((year) => (
              <Select.Option key={year} value={year}>
                {year} year{year > 1 ? "s" : ""}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default ContractTable;
