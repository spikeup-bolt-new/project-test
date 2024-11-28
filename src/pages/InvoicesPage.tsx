import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/invoices/InvoiceForm";
import InvoiceTable from "../components/invoices/InvoiceTable";
import { useContractStore } from "../store/contractStore";
import { useInvoiceStore } from "../store/invoiceStore";
import { Invoice } from "../types";

const InvoicesPage: React.FC = () => {
  const navigation = useNavigate();
  const {
    invoices,
    pagination,
    fetchInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    downloadInvoice,
  } = useInvoiceStore();
  const { contracts, fetchContracts } = useContractStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();

  useEffect(() => {
    fetchInvoices();
    fetchContracts();
  }, [fetchContracts, fetchInvoices]);

  const handleView = (invoice: Invoice) => {
    navigation(`/invoices/${invoice._id}`);
  };

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedInvoice(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (invoice: Invoice) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoice(invoice._id);
    }
  };

  const handleDownload = async (invoice: Invoice) => {
    downloadInvoice(invoice._id);
  };

  const handleFormSubmit = async (invoice: Partial<Invoice>) => {
    if (selectedInvoice) {
      await updateInvoice(selectedInvoice._id, invoice);
    } else {
      await createInvoice(invoice);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoice Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Invoice
        </button>
      </div>
      {isFormVisible ? (
        <InvoiceForm
          contracts={contracts}
          initialData={selectedInvoice}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <InvoiceTable
          invoices={invoices}
          pagination={pagination}
          fetchData={fetchInvoices}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={updateInvoice}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
