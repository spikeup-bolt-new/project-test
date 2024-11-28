import {
  ApartmentOutlined,
  DashboardOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: DashboardOutlined },
    { name: "User Management", path: "/users", icon: TeamOutlined },
    { name: "Properties", path: "/properties", icon: ApartmentOutlined },
    { name: "Rooms", path: "/rooms", icon: HomeOutlined },
    { name: "Customers", path: "/customers", icon: UserOutlined },
    { name: "Contracts", path: "/contracts", icon: FileTextOutlined },
    { name: "Services", path: "/services", icon: ToolOutlined },
    { name: "Invoices", path: "/invoices", icon: FileSyncOutlined },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center p-6">
        <h2 className="text-2xl font-bold">My App</h2>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <Icon style={{ fontSize: 16 }} />
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          <LogoutOutlined style={{ fontSize: 16 }} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
