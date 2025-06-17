import DashboardCard from "./Card/CountCard";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClinetMessageCard from "./Card/ClinetMessageCard";
import AppointMentCard from "./Card/AppointMentCard";
import { AppContext } from "../SmallComponent/AppContext";

const MainDashbord = () => {
  const { state } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalNews, setTotalNews] = useState(0);
  const [totalTeamMember, setTotalTeamMember] = useState(0);
  const [totalContact, setTotalContact] = useState(0);

  useEffect(() => {
    clinetCount();
    lawyerCount();
    contactCount();
  }, []);

  const clinetCount = () => {
    axios.get(`${state.port}/api/admin/blogpost`).then((result) => {
      if (result.data.Status) setTotalNews(result.data?.Result.length);
      else setErrorMessage(result.data.Error);
    });
  };

  const lawyerCount = () => {
    axios.get(`${state.port}/api/admin/user-count`).then((result) => {
      if (result.data.Status) setTotalTeamMember(result.data?.totalUsers);
      else setErrorMessage(result.data.Error);
    });
  };

  const contactCount = () => {
    axios.get(`${state.port}/api/admin/contact-count`).then((result) => {
      if (result.data.Status)
        setTotalContact(result.data.Result[0].totalContact);
      else setErrorMessage(result.data.Error);
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
        Welcome to <span className="text-blue-400">Dashboard</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/dashboard/client" className="hover:no-underline">
          <DashboardCard title="News" count={totalNews} />
        </Link>
        <Link to="/dashboard/teamMember" className="hover:no-underline">
          <DashboardCard title="Team Member" count={totalTeamMember} />
        </Link>
      </div>
      {/* clinet message & appointment card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ClinetMessageCard />
        <AppointMentCard />
      </div>
    </div>
  );
};

export default MainDashbord;
