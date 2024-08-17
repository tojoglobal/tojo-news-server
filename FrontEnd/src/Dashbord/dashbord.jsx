import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import ToggleThemeButton from "./SmallComponent/ToggleThemeButton";
import { useState } from "react";
import { Content, Header } from "antd/es/layout/layout";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Logout from "./SmallComponent/logout";
import axios from "axios";
import Logo from "./SmallComponent/logo";
import MenuList from "./DashbordComponent/SideMenu/MenuList";
import Clock from "./SmallComponent/Clock";

const Dashboard = () => {
  // handle logout function
  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("https://api.tojonews.com/api/admin/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        anvigate("/");
        location.reload("/");
      }
    });
  };

  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Sider
          className="sidebar"
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? "dark" : "light"}
        >
          <Logo />

          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Logout handleLogout={handleLogout} />
            <Button
              type="text"
              onClick={toggleCollapsed}
              className="toggle"
              icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            />
            <Clock />
          </Header>

          <Content className="main_router">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
