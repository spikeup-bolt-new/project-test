import React, { useEffect, useState } from "react";
import ServiceForm from "../components/services/ServiceForm";
import ServiceTable from "../components/services/ServiceTable";
import { useServiceRequestStore } from "../store/serviceRequestStore";
import { Service } from "../types";

const ServicesPage: React.FC = () => {
  const {
    services,
    paginationServices,
    fetchServices,
    createService,
    updateService,
    deleteService,
  } = useServiceRequestStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service>();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedService(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (service: Service) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(service._id);
    }
  };

  const handleFormSubmit = async (service: Partial<Service>) => {
    if (selectedService) {
      await updateService(selectedService._id, service);
    } else {
      await createService(service);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Service
        </button>
      </div>
      {isFormVisible ? (
        <ServiceForm
          initialData={selectedService}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <ServiceTable
          services={services}
          pagination={paginationServices}
          fetchData={fetchServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ServicesPage;
