import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiTag,
  FiUsers,
  FiFileText,
  FiList,
  FiFilm,
  FiVolume2,
  FiCalendar,
  FiHash,
  FiMail,
  FiMic,
  FiHelpCircle,
  FiRadio,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";

const MenuList = ({ collapsed, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
      icon: <FiHome className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "TagName",
      icon: <FiTag className="w-5 h-5" />,
      label: "Tag Name",
      path: "/dashboard/TagName",
    },
    {
      key: "contactCategory",
      icon: <FiUsers className="w-5 h-5" />,
      label: "Author",
      path: "/dashboard/author",
    },
    {
      key: "blog",
      icon: <FiFileText className="w-5 h-5" />,
      label: "News",
      path: "/dashboard/blogpost",
    },
    {
      key: "clientCategory",
      icon: <FiList className="w-5 h-5" />,
      label: "News Category",
      path: "/dashboard/newscategory",
    },
    {
      key: "documentaries",
      icon: <FiFilm className="w-5 h-5" />,
      label: "Documentaries",
      path: "/dashboard/documentaries",
    },
    {
      key: "sponsored",
      icon: <FiVolume2 className="w-5 h-5" />,
      label: "Sponsored",
      path: "/dashboard/sponsored",
    },
    {
      key: "events",
      icon: <FiCalendar className="w-5 h-5" />,
      label: "Events",
      path: "/dashboard/events",
    },
    {
      key: "contactList",
      icon: <FiHash className="w-5 h-5" />,
      label: "News Tag",
      path: "/dashboard/contact",
    },
    {
      key: "lawyers",
      icon: <FiMail className="w-5 h-5" />,
      label: "Client Mail",
      path: "/dashboard/message",
    },
    {
      key: "episodes",
      icon: <FiMic className="w-5 h-5" />,
      label: "Episodes",
      path: "/dashboard/Episodes",
    },
    {
      key: "memberFirm",
      icon: <FiHelpCircle className="w-5 h-5" />,
      label: "Patner",
      path: "/dashboard/member",
    },
    {
      key: "podcast",
      icon: <FiRadio className="w-5 h-5" />,
      label: "Podcast",
      path: "/dashboard/podcasts",
    },
    {
      key: "jobpost",
      icon: <FiMonitor className="w-5 h-5" />,
      label: "Job Offer",
      path: "/dashboard/job",
    },
    {
      key: "setting",
      icon: <FiSettings className="w-5 h-5" />,
      label: "Setting",
      path: "/dashboard/settings",
    },
  ];

  // Handler for mobile: close modal and navigate to route
  const handleMenuClick = (path) => {
    if (typeof onNavigate === "function") onNavigate();
    navigate(path);
  };

  return (
    <nav className="px-2 py-4">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={`w-full cursor-pointer flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-left
                ${
                  selectedKeys.includes(item.key)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
              onClick={() => handleMenuClick(item.path)}
              tabIndex={0}
            >
              <span className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                {item.icon}
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
