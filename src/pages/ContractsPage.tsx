/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractForm from "../components/contracts/ContractForm";
import ContractTable from "../components/contracts/ContractTable";
import { useContractStore } from "../store/contractStore";
import { useCustomerStore } from "../store/customerStore";
import { useRoomStore } from "../store/roomStore";
import { Contract } from "../types";

const ContractsPage: React.FC = () => {
  const navigation = useNavigate();
  const {
    contracts,
    pagination,
    fetchContracts,
    createContract,
    updateContract,
    deleteContract,
  } = useContractStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { rooms, fetchRooms } = useRoomStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract>();

  const handleView = (contract: Contract) => {
    navigation(`/contracts/${contract._id}`);
  };

  const handleEdit = (contract: Contract) => {
    setSelectedContract(contract);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedContract(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (contract: Contract) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      await deleteContract(contract._id);
    }
  };

  const handleFormSubmit = async (contract: Partial<Contract>) => {
    if (selectedContract) {
      await updateContract(selectedContract._id, contract);
    } else {
      await createContract(contract);
    }
    setIsFormVisible(false);
  };

  useEffect(() => {
    fetchContracts();
    fetchRooms();
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contract Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Contract
        </button>
      </div>
      {isFormVisible ? (
        <ContractForm
          customers={customers}
          rooms={rooms}
          initialData={selectedContract}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <ContractTable
          contracts={contracts}
          pagination={pagination}
          fetchData={fetchContracts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ContractsPage;
