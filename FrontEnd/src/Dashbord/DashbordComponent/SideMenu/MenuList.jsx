import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { MdContacts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {
  FaList,
  FaHandsHelping,
  FaCalendarAlt,
  FaBullhorn,
  FaFilm,
} from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import {
  FaDesktop,
  FaHashtag,
  FaRegNewspaper,
  FaPodcast,
} from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoMicOutline } from "react-icons/io5";

const MenuList = ({ darkTheme, collapsed }) => {
  const location = useLocation();

  // Highlight active menu item
  const selectedKeys = (() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/dashboard/tagname")) return ["TagName"];
    if (path.includes("/dashboard/author")) return ["contactCategory"];
    if (path.includes("/dashboard/blogpost")) return ["blog"];
    if (path.includes("/dashboard/newscategory")) return ["clientCategory"];
    if (path.includes("/dashboard/documentaries")) return ["documentaries"];
    if (path.includes("/dashboard/sponsored")) return ["sponsored"];
    if (path.includes("/dashboard/events")) return ["events"];
    if (path.includes("/dashboard/contact")) return ["contactList"];
    if (path.includes("/dashboard/message")) return ["lawyers"];
    if (path.includes("/dashboard/episodes")) return ["episodes"];
    if (path.includes("/dashboard/member")) return ["memberFirm"];
    if (path.includes("/dashboard/podcasts")) return ["podcast"];
    if (path.includes("/dashboard/job")) return ["jobpost"];
    if (path.includes("/dashboard/settings")) return ["setting"];
    return ["home"];
  })();

  const menuItems = [
    {
      key: "home",
      icon: <RxDashboard className="text-lg" />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "TagName",
      icon: <AiFillTags className="text-lg" />,
      label: <Link to="/dashboard/TagName">Tag Name</Link>,
    },
    {
      key: "contactCategory",
      icon: <MdContacts className="text-lg" />,
      label: <Link to="/dashboard/author">Author</Link>,
    },
    {
      key: "blog",
      icon: <FaRegNewspaper className="text-lg" />,
      label: <Link to="/dashboard/blogpost">News</Link>,
    },
    {
      key: "clientCategory",
      icon: <FaList className="text-lg" />,
      label: <Link to="/dashboard/newscategory">News Category</Link>,
    },
    {
      key: "documentaries",
      icon: <FaFilm className="text-lg" />,
      label: <Link to="/dashboard/documentaries">Documentaries</Link>,
    },
    {
      key: "sponsored",
      icon: <FaBullhorn className="text-lg" />,
      label: <Link to="/dashboard/sponsored">Sponsored</Link>,
    },
    {
      key: "events",
      icon: <FaCalendarAlt className="text-lg" />,
      label: <Link to="/dashboard/events">Events</Link>,
    },
    {
      key: "contactList",
      icon: <FaHashtag className="text-lg" />,
      label: <Link to="/dashboard/contact">News Tag</Link>,
    },
    {
      key: "lawyers",
      icon: <SlEnvolopeLetter className="text-lg" />,
      label: <Link to="/dashboard/message">Client Mail</Link>,
    },
    {
      key: "episodes",
      icon: <IoMicOutline className="text-lg" />,
      label: <Link to="/dashboard/Episodes">Episodes</Link>,
    },
    {
      key: "memberFirm",
      icon: <FaHandsHelping className="text-lg" />,
      label: <Link to="/dashboard/member">Patner</Link>,
    },
    {
      key: "podcast",
      icon: <FaPodcast className="text-lg" />,
      label: <Link to="/dashboard/podcasts">Podcast</Link>,
    },
    {
      key: "jobpost",
      icon: <FaDesktop className="text-lg" />,
      label: <Link to="/dashboard/job">Job Offer</Link>,
    },
    {
      key: "setting",
      icon: <SettingOutlined className="text-lg" />,
      label: "Setting",
    },
  ];

  return (
    <div className={`h-screen flex flex-col`}>
      <div className="flex-1 overflow-y-auto">
        <Menu
          theme={darkTheme ? "dark" : "light"}
          mode="inline"
          selectedKeys={selectedKeys}
          inlineCollapsed={collapsed}
          items={menuItems}
          style={{
            borderRight: 0,
            flex: 1,
            padding: "8px 0",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default MenuList;
