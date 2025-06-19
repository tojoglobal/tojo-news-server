/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([clinetCount(), lawyerCount(), contactCount()]);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clinetCount = async () => {
    const result = await axios.get(`${state.port}/api/admin/blogpost`);
    if (result.data.Status) setTotalNews(result.data?.Result.length);
    else setErrorMessage(result.data.Error);
  };

  const lawyerCount = async () => {
    const result = await axios.get(`${state.port}/api/admin/user-count`);
    if (result.data.Status) setTotalTeamMember(result.data?.totalUsers);
    else setErrorMessage(result.data.Error);
  };

  const contactCount = async () => {
    const result = await axios.get(`${state.port}/api/admin/contact-count`);
    if (result.data.Status) setTotalContact(result.data.Result[0].totalContact);
    else setErrorMessage(result.data.Error);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 px-3 md:px-1 md:mb-20 mb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">
          Welcome to <span className="text-blue-400">Dashboard</span>
        </h1>
        {/* {errorMessage && (
          <div className="text-red-400 text-sm">{errorMessage}</div>
        )} */}
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="News"
          count={loading ? "..." : totalNews}
          icon="📰"
        />
        <DashboardCard
          title="Team Members"
          count={loading ? "..." : totalTeamMember}
          icon="👥"
        />
        <DashboardCard
          title="Contacts"
          count={loading ? "..." : totalContact}
          icon="✉️"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <ClinetMessageCard />
        <AppointMentCard />
      </div>
    </div>
  );
};

export default MainDashbord;
