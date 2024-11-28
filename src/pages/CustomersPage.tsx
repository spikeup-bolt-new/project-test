import React, { useEffect, useState } from "react";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";
import { useCustomerStore } from "../store/customerStore";
import { Customer } from "../types";
import { useNavigate } from "react-router-dom";

const CustomersPage: React.FC = () => {
  const navigation = useNavigate();
  const {
    customers,
    pagination,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomerStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleView = (customer: Customer) => {
    navigation(`/customers/${customer._id}`);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (customer: Customer) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(customer._id);
    }
  };

  const handleFormSubmit = async (customer: Partial<Customer>) => {
    if (selectedCustomer) {
      await updateCustomer(selectedCustomer._id, customer);
    } else {
      await createCustomer(customer);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Customer
        </button>
      </div>
      {isFormVisible ? (
        <CustomerForm
          initialData={selectedCustomer}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <CustomerTable
          customers={customers}
          pagination={pagination}
          fetchData={fetchCustomers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CustomersPage;
