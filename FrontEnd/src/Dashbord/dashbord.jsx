import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Drawer } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState, useEffect } from "react";
import { Content, Header } from "antd/es/layout/layout";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Logout from "./SmallComponent/logout";
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
    <Layout className="h-screen overflow-hidden bg-[#13162a] text-white">
      {/* Desktop Sidebar */}
      <Sider
        className="hidden md:flex flex-col h-screen sticky top-0 left-0 z-30 border-r border-[#23263a] bg-[#181c2f]"
        collapsed={collapsed}
        collapsible
        trigger={null}
        width={250}
        collapsedWidth={80}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-6 px-2">
            <Logo collapsed={collapsed} />
          </div>
          {/* Sidebar Scroll */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <MenuList darkTheme={true} collapsed={collapsed} />
          </div>
        </div>
      </Sider>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        bodyStyle={{ padding: 0, background: "#181c2f" }}
        width={250}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-3 p-2">
            <Logo collapsed={false} />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <MenuList darkTheme={true} collapsed={false} />
          </div>
        </div>
      </Drawer>

      {/* Main Layout */}
      <Layout className="flex-1 min-w-0 h-screen bg-[#13162a] text-white">
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: "#181c2f",
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 16,
            height: 64,
            color: "white",
          }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              onClick={toggleCollapsed}
              className="toggle text-white"
              icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            />
          </div>
          <Logout handleLogout={handleLogout} />
        </Header>
        <Content className="h-[calc(100vh-64px)] flex-1 overflow-y-auto p-2 md:p-6 bg-[#101829] transition-colors duration-300 text-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
