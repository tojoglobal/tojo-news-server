import DashboardCard from "./Card/CountCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClinetMessageCard from "./Card/ClinetMessageCard";
import AppointMentCard from "./Card/AppointMentCard";

const MainDashbord = () => {  
  axios.defaults.withCredentials = true; 
  // start
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalClinet, setTotalClint] = useState(0);
  const [totalTeamMember, setTotalTeamMember] = useState(0);
  const [totalContact, setTotalContact] = useState(0);

  useEffect(() => {
    clinetCount();
    lawyerCount();
    contactCount();
  }, []);
  console.log(errorMessage);

  const clinetCount = () => {
    axios.get("http://localhost:8080/api/admin/client-count").then((result) => {
      if (result.data.Status) {
        setTotalClint(result.data.Result[0].totalClient);
      } else {
        setErrorMessage(result.data.Error);
      }
    });
  };

  const lawyerCount = () => {
    axios.get("https://api.tojoglobal.com/api/admin/teamMember-count").then((result) => {
      if (result.data.Status) {
        setTotalTeamMember(result.data.Result[0].totalTeamMember);
      } else {
        setErrorMessage(result.data.Error);
      }
    });
  };

  const contactCount = () => {
    axios.get("https://api.tojoglobal.com/api/admin/contact-count").then((result) => {
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
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Link to="/dashboard/client" className="text-decoration-none">
            <DashboardCard title="Client" count={totalClinet} />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Link to="/dashboard/teamMember" className="text-decoration-none">
            <DashboardCard title="Team Member" count={totalTeamMember} />
          </Link>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <Link to="/dashboard/contact" className="text-decoration-none">
            <DashboardCard title="Contact" count={totalContact} />
          </Link>
        </div>
      </div>
      <br />
      {/* clinet message & appointment card */}
      <div className="row">
        <ClinetMessageCard/>
        <AppointMentCard/>

      </div>
    </div>
  );
};

export default MainDashbord;
