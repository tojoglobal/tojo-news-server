import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import axios from "axios";
import Logo from "./SmallComponent/logo";
import MenuList from "./DashbordComponent/SideMenu/MenuList";
import toast from "react-hot-toast";
import { useApiLink } from "../Hook/useApiLink";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useApiLink();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  const handleLogout = () => {
    axios.get(`${state?.port}/api/admin/logout`).then((result) => {
      if (result.data.Status) {
        toast.success("Successfully Logout.");
        localStorage.removeItem("valid");
        navigate("/");
        window.location.reload();
      }
    });
  };

  const toggleCollapsed = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-full transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } bg-gray-800 border-r border-gray-700 shadow-lg`}
      >
        <div className="flex items-center justify-center h-15 px-4 border-b border-gray-700">
          <Logo collapsed={collapsed} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <MenuList collapsed={collapsed} />
        </div>
      </aside>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-15 px-4 border-b border-gray-700">
          <Logo collapsed={false} />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-md text-gray-300 hover:text-white focus:outline-none"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          <MenuList collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 flex items-center justify-between h-15 px-4 shadow-md">
          <div className="flex items-center">
            <button
              onClick={toggleCollapsed}
              className="p-2 cursor-pointer rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h1 className="ml-4 text-lg font-semibold text-white">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </header>
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-1 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
