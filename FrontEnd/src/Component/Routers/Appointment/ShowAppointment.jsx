import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

const ShowAppointment = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/appointment/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setAppointmentDetails({
            ...appointmentDetails,
            problemTitle: result.data.Result[0].problemTitle,
            contactName: result.data.Result[0].contactName,
            ApoDate: result.data.Result[0].ApoDate,
            ApoTime: result.data.Result[0].ApoTime,
            reason: result.data.Result[0].reason,
            note: result.data.Result[0].note,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/appointment/" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Client Details </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div key={appointmentDetails.uuid} className="grid_container_div">
          
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span > Title </span>
                </td>
                <td>: {appointmentDetails.problemTitle}</td>
              </tr>
              <tr>
                <td>
                  <span > Contact Name </span>
                </td>
                <td>: {appointmentDetails.contactName}</td>
              </tr>
              <tr>
                <td>
                  <span >
                    Appointment Data & Time
                  </span>
                </td>
                <td>
                  : {appointmentDetails.ApoDate
                    ? dayjs(appointmentDetails.ApoDate).format(`DD MMM , YYYY`)
                    : ""}
                  , {appointmentDetails.ApoTime}
                </td>
              </tr>
              <tr>
                <td>
                  <span >Reason </span>
                </td>
                <td>:  {appointmentDetails.reason}</td>
              </tr>
              <tr>
                <td>
                  <span > Note</span>
                </td>
                <td> : <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(appointmentDetails.note),
                    }}
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowAppointment;
