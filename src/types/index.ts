export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type Property = {
  _id: string;
  name: string;
  type: string;
  address: string;
  area: number;
  status: string;
  images: string[];
  videos: string[];
  floors: number;
  region: string;
  amenities: string[];
};

export type Room = {
  _id: string;
  name: string;
  floor: string;
  status: string;
  price: number;
  tenant: Customer;
  property?: Property;
};

export type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  identificationDocs: string[];
  rooms?: Room[];
};

export type Contract = {
  _id: string;
  customer: Customer;
  room: Room;
  startDate: Date;
  endDate: Date;
  paymentTerms: string;
  cancellationPolicy: string;
  renewalReminderSent: boolean;
  pdfPath: string;
};

export type Service = {
  _id: string;
  name: string;
  description: string;
  packageType: string;
};

export type ServiceRequest = {
  _id: string;
  customer: Customer;
  description: string;
  status: string;
  createdAt: Date;
};

export type Invoice = {
  _id: string;
  code: string;
  contract: Contract;
  amount: number;
  status: string;
  dueDate: Date;
  createdAt: Date;
};

export type ListData<T> = {
  data: T[];
  search?: string;
  sort?: string;
  total: number;
  page: number;
  pageSize: number;
};

export type Pagination = {
  page?: number;
  pageSize?: number;
  total?: number;
};
