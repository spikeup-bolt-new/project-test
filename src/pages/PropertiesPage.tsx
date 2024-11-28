import React, { useEffect, useState } from "react";
import PropertyTable from "../components/properties/PropertyTable";
import PropertyForm from "../components/properties/PropertyForm";
import { usePropertyStore } from "../store/propertyStore";
import { Property } from "../types";

const PropertiesPage: React.FC = () => {
  const {
    properties,
    pagination,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  } = usePropertyStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedProperty(undefined);
    setIsFormVisible(true);
  };

  const handleDelete = async (property: Property) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await deleteProperty(property._id);
    }
  };

  const handleFormSubmit = async (property: Partial<Property>) => {
    if (selectedProperty) {
      await updateProperty(selectedProperty._id, property);
    } else {
      await createProperty(property);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Property Management</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Property
        </button>
      </div>
      {isFormVisible ? (
        <PropertyForm
          initialData={selectedProperty}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <PropertyTable
          properties={properties}
          pagination={pagination}
          fetchData={fetchProperties}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PropertiesPage;
