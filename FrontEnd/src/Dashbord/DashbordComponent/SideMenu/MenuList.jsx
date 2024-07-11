import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdContacts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TiGroup } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import PropTypes from "prop-types";
import { FaDesktop, FaHashtag, FaRegNewspaper } from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu_bar"
    >
      <Menu.Item key="home" icon={<RxDashboard className="dashbord_icon" />}>
        <Link to="/dashboard" className="route_link">
          Dashbord
        </Link>
      </Menu.Item>

      <Menu.Item key="TagName" icon={<AiFillTags className="dashbord_icon" />}>
        <Link to="/dashboard/TagName" className="route_link">
          Tag Name
        </Link>
      </Menu.Item>

      {/* <Menu.SubMenu
        key="Contact"
        icon={<MdContacts className="dashbord_icon" />}
        title="Contact"
      >
        <Menu.Item key="contactList">
          <Link to="/dashboard/contact" className="route_link">
            Contact List
          </Link>
        </Menu.Item>        
      </Menu.SubMenu> */}

      <Menu.Item
        key="contactCategory"
        icon={<MdContacts className="dashbord_icon" />}
      >
        <Link to="/dashboard/author" className="route_link">
          Author
        </Link>
      </Menu.Item>

      <Menu.Item key="blog" icon={<FaRegNewspaper className="dashbord_icon" />}>
        <Link to="/dashboard/blogpost" className="route_link">
          News
        </Link>
      </Menu.Item>

      {/* <Menu.SubMenu
        key="client"
        icon={<TiGroup className="dashbord_icon" />}
        title="Client"
      >
        <Menu.Item key="clientList">
          <Link to="/dashboard/client" className="route_link">
            List of Client
          </Link>
        </Menu.Item>
       
      </Menu.SubMenu> */}

      <Menu.Item
        key="clientCategory"
        icon={<FaList className="dashbord_icon" />}
      >
        <Link to="/dashboard/newscategory" className="route_link">
          News Category
        </Link>{" "}
      </Menu.Item>

      <Menu.Item
        key="contactList"
        icon={<FaHashtag className="dashbord_icon" />}
      >
        <Link to="/dashboard/contact" className="route_link">
          News Tag
        </Link>
      </Menu.Item>

      <Menu.Item
        key="lawyers"
        icon={<SlEnvolopeLetter className="dashbord_icon" />}
      >
        <Link to="/dashboard/message" className="route_link">
          Client Mail
          {/* FaGlobeAsia */}
        </Link>
      </Menu.Item>

      <Menu.Item key="teamMember" icon={<TiGroup className="dashbord_icon" />}>
        <Link to="/dashboard/teamMember" className="route_link">
          Team Member
        </Link>
      </Menu.Item>

      <Menu.Item key="jobpost" icon={<FaDesktop className="dashbord_icon" />}>
        <Link to="/dashboard/job" className="route_link">
          Job Offer
        </Link>
      </Menu.Item>

      {/* <Menu.Item
        key="appointments"
        icon={<FaHandsHelping className="dashbord_icon" />}
      >
        <Link to="/dashboard/appointment" className="route_link">
          Appointments
        </Link>
      </Menu.Item> */}

      {/* <Menu.SubMenu
        key="siteManagement"
        icon={<MdManageAccounts className="dashbord_icon" />}
        title="WebSite Management"
      >
        <Menu.Item key="memberFirm">
          {" "}
          <Link to="/dashboard/member" className="route_link">
            Patner
          </Link>
        </Menu.Item>
      </Menu.SubMenu> */}

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
