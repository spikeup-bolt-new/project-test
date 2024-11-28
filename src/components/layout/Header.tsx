import { BellOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
    <div className="flex items-center space-x-4">
      <button className="w-10 h-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <BellOutlined style={{ fontSize: 16 }} />
      </button>
      <button className="w-10 h-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <UserOutlined style={{ fontSize: 16 }} />
      </button>
    </div>
  </header>
);
