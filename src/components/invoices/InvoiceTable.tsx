import { CreditCardOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Invoice, Pagination } from "../../types";
import DTable from "../components/DTable";
import { PaymentPaypal } from "../components/PaymentPaypal";

interface InvoiceTableProps {
  invoices: Invoice[];
  pagination: Pagination;
  fetchData?: (params: any) => void;
  onView: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
  onUpdate: (id: string, invoice: Partial<Invoice>) => void;
  onDelete: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices = [],
  pagination,
  fetchData,
  onView,
  onEdit,
  onUpdate,
  onDelete,
  onDownload,
}) => {
  const [paypalModalVisible, setPaypalModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();

  const handlePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaypalModalVisible(true);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Contract",
      dataIndex: ["contract", "customer", "name"],
      key: "contract|customer|name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      renderActions: (record: Invoice) => [
        record.status === "Unpaid" ? (
          <Button
            className="bg-amber-400"
            type="primary"
            onClick={() => handlePayment(record)}
            icon={<CreditCardOutlined />}
            title="Renew"
          />
        ) : (
          <></>
        ),
        <Button
          className="bg-amber-400"
          type="primary"
          onClick={() => onDownload(record)}
          icon={<FilePdfOutlined />}
          title="Pdf"
        />,
      ],
    },
  ];

  return (
    <>
      <DTable
        data={invoices}
        columns={columns}
        pagination={pagination}
        fetchData={fetchData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Modal
        title="Paypal Method"
        visible={paypalModalVisible}
        onCancel={() => setPaypalModalVisible(false)}
        footer={null}
      >
        {selectedInvoice && (
          <PaymentPaypal
            amount={selectedInvoice?.amount || 0}
            onPayment={async () => {
              await onUpdate(selectedInvoice._id, {
                ...selectedInvoice,
                status: "Paid",
              });
              setPaypalModalVisible(false);
            }}
            onCancel={() => setPaypalModalVisible(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default InvoiceTable;
