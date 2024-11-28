import { Card, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DTable from "../components/components/DTable";
import { useCustomerStore } from "../store/customerStore";
import { Customer, Room, ServiceRequest } from "../types";
import RequestTable from "../components/requests/RequestTable";
import { useServiceRequestStore } from "../store/serviceRequestStore";
import RequestForm from "../components/requests/RequestForm";
import { mapOptionFilters } from "../utils/helpers";

const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceRequest>();

  const currentCustomer = useCustomerStore((state) => state.currentCustomer);
  const fetchCustomer = useCustomerStore((state) => state.fetchCustomer);
  const {
    customerRequests,
    paginationRequests,
    fetchServiceRequestsByCustomer,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
  } = useServiceRequestStore();

  useEffect(() => {
    if (currentCustomer?._id) {
      const { rooms: gettedRooms, ...gettedCustomer } = currentCustomer;
      setCustomer(gettedCustomer);
      setRooms(gettedRooms || []);
    }
  }, [currentCustomer]);

  const handleFetchCustomer = useCallback(
    async (id?: string) => {
      if (id) {
        setLoading(true);
        await fetchCustomer(id);
        setLoading(false);
      }
    },
    [fetchCustomer]
  );

  useEffect(() => {
    handleFetchCustomer(id);
  }, [handleFetchCustomer, id]);

  useEffect(() => {
    console.log(customerRequests);
  }, [customerRequests]);

  const roomColumns = [
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      dataType: "select",
      filters: mapOptionFilters(["Available", "Rented"]),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      dataType: "number",
    },
    {
      title: "Property",
      dataIndex: ["property", "name"],
      key: "property|name",
    },
  ];

  const handleEdit = (service: ServiceRequest) => {
    setSelectedService(service);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedService(undefined);
    setIsFormVisible(true);
  };

  const handleDeleteServiceRequest = async (service: ServiceRequest) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      await deleteServiceRequest(service._id);
    }
  };

  const handleFormSubmit = async (service: Partial<ServiceRequest>) => {
    if (selectedService) {
      await updateServiceRequest(selectedService._id, service);
    } else {
      await createServiceRequest(service);
    }
    setIsFormVisible(false);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex justify-between items-center mb-4 pt-4">
            <h1 className="text-2xl font-bold">Customer Detail</h1>
          </div>
        }
      >
        <p>
          <strong>Name:</strong> {customer?.name}
        </p>
        <p>
          <strong>Email:</strong> {customer?.email}
        </p>
        <p>
          <strong>Phone:</strong> {customer?.phone}
        </p>
      </Card>
      <Card
        title={
          <div className="flex justify-between items-center mb-4 pt-4">
            <h1 className="text-2xl font-bold">Rented Rooms</h1>
          </div>
        }
      >
        <DTable data={rooms} columns={roomColumns} />
      </Card>
      <Card
        title={
          <div className="flex justify-between items-center mb-4 pt-4">
            <h1 className="text-2xl font-bold">Request Management</h1>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Request
            </button>
          </div>
        }
      >
        {isFormVisible && customer && (
          <RequestForm
            customer={customer}
            initialData={selectedService}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
        <RequestTable
          requests={customerRequests}
          pagination={paginationRequests}
          onEdit={handleEdit}
          fetchData={(params: any) => {
            id && fetchServiceRequestsByCustomer(id, params);
          }}
          onDelete={handleDeleteServiceRequest}
        />
      </Card>
    </div>
  );
};

export default CustomerDetailPage;
