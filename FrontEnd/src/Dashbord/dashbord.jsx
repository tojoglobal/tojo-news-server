import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApiLink } from "../Hook/useApiLink";
import { useMediaQuery } from "react-responsive";
import Logo from "./SmallComponent/logo";
import MenuList from "./DashbordComponent/SideMenu/MenuList";
import Logout from "./SmallComponent/logout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useApiLink();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setSidebarCollapsed(isMobile);
    setSidebarOpen(false);
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

  return (
    <div className="w-full min-h-screen flex bg-gradient-to-br from-[#0a074b] via-[#171b3d] to-[#1c1f2e] text-white font-sans relative">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen flex flex-col transition-all
          duration-300
          bg-[#181c2f]/[.97] border-r border-[#23263a]
          shadow-xl
          ${
            isMobile
              ? sidebarOpen
                ? "w-60"
                : "w-0"
              : sidebarCollapsed
              ? "w-20"
              : "w-64"
          }
          ${isMobile ? "md:hidden" : "md:flex"}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-6 px-2 border-b border-[#23263a] min-h-[64px]">
            <Logo collapsed={isMobile ? false : sidebarCollapsed} />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">
            <MenuList
              darkTheme={true}
              collapsed={isMobile ? false : sidebarCollapsed}
            />
          </div>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main */}
      <div
        className={`
          flex flex-col flex-1 min-h-screen transition-all duration-300
          ${isMobile ? "pl-0" : sidebarCollapsed ? "pl-20" : "pl-64"}
        `}
      >
        {/* Header */}
        <header
          className="
            sticky top-0 z-20 w-full flex items-center justify-between
            px-2 md:px-8 h-16 bg-[#181c2f]/[.98] border-b border-[#23263a]
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle */}
            <button
              onClick={() => {
                if (isMobile) setSidebarOpen((p) => !p);
                else setSidebarCollapsed((p) => !p);
              }}
              className="p-2 rounded-lg hover:bg-[#22263a] focus:outline-none bg-transparent transition"
              aria-label="Toggle sidebar"
              tabIndex={0}
            >
              {isMobile ? (
                <AiOutlineMenuFold className="text-2xl" />
              ) : sidebarCollapsed ? (
                <AiOutlineMenuUnfold className="text-2xl" />
              ) : (
                <AiOutlineMenuFold className="text-2xl" />
              )}
            </button>
            <span className="ml-2 font-bold text-lg text-[#7aa8e6] tracking-wide hidden md:block">
              Admin Panel
            </span>
          </div>
          <Logout handleLogout={handleLogout} />
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-0 bg-gradient-to-br from-[#171b3d] via-[#181c2f]/[.94] to-[#101829] transition-colors duration-300 p-2 md:p-7 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
