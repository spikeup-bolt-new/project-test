import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import ReactPlayer from "react-player";
// import { usePropertyStore } from "../../store/propertyStore";
import { Property } from "../../types";
import { Input, InputNumber, Select } from "antd";

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: (data: Partial<Property>) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  // const { uploadFiles } = usePropertyStore();
  const [formData, setFormData] = useState<Partial<Property>>(
    initialData || {
      name: "",
      type: "Building",
      address: "",
      area: 0,
      status: "Available",
      images: [],
      videos: [],
      floors: 0,
      region: "",
      amenities: [],
    }
  );

  console.log(formData, "formData");

  // const [localFiles, setLocalFiles] = useState<{
  //   images: (string | File)[];
  //   videos: (string | File)[];
  // }>({
  //   images: [],
  //   videos: [],
  // });

  // const handleFileChange = (
  //   files: (string | File)[],
  //   type: "images" | "videos"
  // ) => {
  //   setLocalFiles((prev) => ({ ...prev, [type]: files }));
  // };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const onDrop = (acceptedFiles: File[], type: "images" | "videos") => {
  //   const files = [...localFiles[type], ...acceptedFiles];
  //   handleFileChange(files, type);
  // };

  // const handleRemoveFile = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   type: "images" | "videos",
  //   index: number
  // ) => {
  //   e.preventDefault();
  //   const files = localFiles[type].filter((_, i) => i !== index);
  //   handleFileChange(files, type);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const uploadedImages = await uploadFiles(
    //   localFiles.images.filter((img) => typeof img !== "string")
    // );
    // const uploadedVideos = await uploadFiles(
    //   localFiles.videos.filter((vid) => typeof vid !== "string")
    // );

    const payload = {
      ...formData,
      // images: uploadedImages,
      // videos: uploadedVideos,
    };

    onSubmit(payload);
  };

  // const renderPreview = (
  //   files: (string | File)[],
  //   type: "images" | "videos"
  // ) => {
  //   return files.map((file, index) => (
  //     <div
  //       key={index}
  //       className="relative flex flex-col items-center space-y-2"
  //     >
  //       {type === "images" ? (
  //         typeof file === "string" ? (
  //           <img
  //             src={file}
  //             alt={file.split("/").reverse()?.[0]}
  //             className="w-32 h-32 object-cover rounded"
  //           />
  //         ) : (
  //           <img
  //             src={URL.createObjectURL(file)}
  //             alt={file.name}
  //             className="w-32 h-32 object-cover rounded"
  //           />
  //         )
  //       ) : typeof file === "string" ? (
  //         <ReactPlayer url={file} controls width="100%" height="100px" />
  //       ) : (
  //         <ReactPlayer
  //           url={URL.createObjectURL(file)}
  //           controls
  //           width="100%"
  //           height="100px"
  //         />
  //       )}
  //       <button
  //         onClick={(e) => handleRemoveFile(e, type, index)}
  //         className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
  //       >
  //         ×
  //       </button>
  //     </div>
  //   ));
  // };

  // const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
  //   useDropzone({
  //     accept: { "image/*": [] },
  //     onDrop: (files) => onDrop(files, "images"),
  //   });

  // const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
  //   useDropzone({
  //     accept: { "video/*": [] },
  //     onDrop: (files) => onDrop(files, "videos"),
  //   });

  // useEffect(() => {
  //   setLocalFiles(() => {
  //     const images =
  //       initialData?.images.map(
  //         (image) => `~/Work/IntelliSyncData/PJ_Realty/backend${image}`
  //       ) || [];
  //     const videos =
  //       initialData?.videos.map(
  //         (video) => `~/Work/IntelliSyncData/PJ_Realty/backend${video}`
  //       ) || [];
  //     return {
  //       images,
  //       videos,
  //     };
  //   });
  // }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Name
        </label>
        <Input
          placeholder="Enter Property Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <Select
          value={formData.type}
          onChange={(value) => handleChange("type", value)}
          placeholder="Select Property Type"
          className="w-full"
        >
          {["Building", "Apartment", "Office", "House"].map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <Input
          placeholder="Enter Property Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Area
        </label>
        <InputNumber
          type="number"
          placeholder="Enter Property Area (sqm)"
          value={formData.area}
          onChange={(value) => handleChange("area", value)}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <Select
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
          placeholder="Select Property Status"
          className="w-full"
        >
          {["Available", "Rented"].map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <div
          {...getImageRootProps()}
          className="p-4 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50"
        >
          <input {...getImageInputProps()} />
          <p className="text-sm text-gray-500">
            Drag & drop images, or click to upload
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {renderPreview(localFiles.images || [], "images")}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Videos
        </label>
        <div
          {...getVideoRootProps()}
          className="p-4 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50"
        >
          <input {...getVideoInputProps()} />
          <p className="text-sm text-gray-500">
            Drag & drop videos, or click to upload
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {renderPreview(localFiles.videos || [], "videos")}
        </div>
      </div> */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Floors
        </label>
        <InputNumber
          type="number"
          placeholder="Enter Property Number of Floors"
          value={formData.floors}
          onChange={(value) => handleChange("floors", value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Region
        </label>
        <Input
          placeholder="Enter Property Region"
          value={formData.region}
          onChange={(e) => handleChange("region", e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities
        </label>
        <Input
          name="amenities"
          placeholder="Enter amenities separated by commas"
          value={(formData.amenities || []).join(", ")}
          onChange={(e) =>
            handleChange(
              "amenities",
              e.target.value.split(",").map((item) => item.trim())
            )
          }
          className="w-full"
        />
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

export default PropertyForm;
