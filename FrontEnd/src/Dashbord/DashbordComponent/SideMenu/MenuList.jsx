import { Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdContacts, MdManageAccounts } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { FaList, FaHandsHelping, FaGlobeAsia } from "react-icons/fa";
import PropTypes from "prop-types";
import { FaDesktop } from "react-icons/fa6";

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu_bar"
    >
      <Menu.Item key="home" icon={<HomeOutlined className="dashbord_icon" />}>
        <Link to="/dashboard" className="route_link">
          Dashbord
        </Link>
      </Menu.Item>

      <Menu.SubMenu
        key="Contact"
        icon={<MdContacts className="dashbord_icon" />}
        title="Contact"
      >
        <Menu.Item key="contactList">
          <Link to="/dashboard/contact" className="route_link">
            Contact List
          </Link>
        </Menu.Item>
        <Menu.Item key="contactCategory">
          <Link to="/dashboard/contact/category" className="route_link">
            Contact Category
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key="client"
        icon={<TiGroup className="dashbord_icon" />}
        title="Client"
      >
        <Menu.Item key="clientList">
          <Link to="/dashboard/client" className="route_link">
            List of Client
          </Link>
        </Menu.Item>
        <Menu.Item key="clientCategory">
          <Link to="/dashboard/client/category" className="route_link">
            Client Category
          </Link>{" "}
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="lawyers" icon={<FaGlobeAsia className="dashbord_icon" />}>
        <Link to="/dashboard/message" className="route_link">
          Clinet Message
        </Link>
      </Menu.Item>

      <Menu.Item key="teamMember" icon={<FaList className="dashbord_icon" />}>
        <Link to="/dashboard/teamMember" className="route_link">
          Team Member
        </Link>
      </Menu.Item>

      <Menu.Item key="jobpost" icon={<FaDesktop className="dashbord_icon" />}>
        <Link to="/dashboard/job" className="route_link">
          Job Offer
        </Link>
      </Menu.Item>

      <Menu.Item
        key="appointments"
        icon={<FaHandsHelping className="dashbord_icon" />}
      >
        <Link to="/dashboard/appointment" className="route_link">
          Appointments
        </Link>
      </Menu.Item>

      <Menu.SubMenu
        key="siteManagement"
        icon={<MdManageAccounts className="dashbord_icon" />}
        title="WebSite Management"
      >
        <Menu.Item key="blog">
          <Link to="/dashboard/blogpost" className="route_link">
            Blog
          </Link>
        </Menu.Item>

        <Menu.Item key="faq">
          {" "}
          <Link to="/dashboard/faq" className="route_link">
            FAQ
          </Link>
        </Menu.Item>

        <Menu.Item key="memberFirm">
          {" "}
          <Link to="/dashboard/member" className="route_link">
            Patner
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        key="setting"
        icon={<SettingOutlined className="dashbord_icon" />}
      >
        Setting
      </Menu.Item>
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MenuList;
