import DashboardCard from "./Card/CountCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClinetMessageCard from "./Card/ClinetMessageCard";
import AppointMentCard from "./Card/AppointMentCard";
import { useContext } from "react";
import { AppContext } from "../SmallComponent/AppContext";

const MainDashbord = () => {
  const { state } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  // start
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
    axios.get(`${state.port}/api/admin/client-count`).then((result) => {
      if (result.data.Status) {
        setTotalNews(result.data.Result[0].totalClient);
      } else {
        setErrorMessage(result.data.Error);
      }
    });
  };

  const lawyerCount = () => {
    axios.get(`${state.port}/api/admin/teamMember-count`).then((result) => {
      if (result.data.Status) {
        setTotalTeamMember(result.data.Result[0].totalTeamMember);
      } else {
        setErrorMessage(result.data.Error);
      }
    });
  };

  const contactCount = () => {
    axios.get(`${state.port}/api/admin/contact-count`).then((result) => {
      if (result.data.Status) {
        setTotalContact(result.data.Result[0].totalContact);
      } else {
        setErrorMessage(result.data.Error);
      }
    });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard_name">Welcome to Dashboard</h1>
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Link to="/dashboard/client" className="text-decoration-none">
            <DashboardCard title="News" count={totalNews} />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6">
          <Link to="/dashboard/teamMember" className="text-decoration-none">
            <DashboardCard title="Team Member" count={totalTeamMember} />
          </Link>
        </div>
        {/* <div className="col-sm-12 col-md-6 col-lg-4">
          <Link to="/dashboard/contact" className="text-decoration-none">
            <DashboardCard title="Contact" count={totalContact} />
          </Link>
        </div> */}
      </div>
      <br />
      {/* clinet message & appointment card */}
      <div className="row">
        <ClinetMessageCard />
        <AppointMentCard />
      </div>
    </div>
  );
};

export default MainDashbord;
