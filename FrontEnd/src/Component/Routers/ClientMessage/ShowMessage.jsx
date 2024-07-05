import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ShowMessage = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientMessage, setClientMessage] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/clientMessage/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setClientMessage({
            ...clientMessage,
            Name: result.data.Result[0].Name,
            Email: result.data.Result[0].Email,
            phoneNumber: result.data.Result[0].phoneNumber,
            Subject: result.data.Result[0].Subject,
            message: result.data.Result[0].message,
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
        <Link to="/dashboard/message/" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Client Details </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* ++++++========part 3 =======++++++++ */}
      <div key={clientMessage.uuid} className="grid_container_div">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <span>Contact name </span>
              </td>
              <td>{clientMessage.Name}</td>
            </tr>
            <tr>
              <td>
                <span> Contact Email </span>
              </td>
              <td>{clientMessage.Email}</td>
            </tr>
            <tr>
              <td>
                <span> Contact Number</span>{" "}
              </td>
              <td>+{clientMessage.phoneNumber}</td>
            </tr>
            <tr>
              <td>
                <span>Subject </span>{" "}
              </td>
              <td>{clientMessage.Subject}</td>
            </tr>

            <tr>
              <td>
                <span> Message </span>{" "}
              </td>
              <td>{clientMessage.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowMessage;
