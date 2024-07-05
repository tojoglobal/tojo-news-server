import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Country, State } from "country-state-city";

const ShowClinetList = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientInfo, setClientInfo] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/clientlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setClientInfo({
            ...clientInfo,
            clientName: result.data.Result[0].clientName,
            clientmobile: result.data.Result[0].clientmobile,
            clientemail: result.data.Result[0].clientemail,
            gender: result.data.Result[0].gender,
            clientCategory: result.data.Result[0].clientCategory,
            clientCity: result.data.Result[0].clientCity,
            clientCountryCode: result.data.Result[0].clientCountryCode,
            clientStateCode: result.data.Result[0].clientStateCode,
            clientAddress: result.data.Result[0].clientAddress,
            note: result.data.Result[0].note,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  const state = State.getStateByCodeAndCountry(
    clientInfo.clientStateCode,
    clientInfo.clientCountryCode
  );
  const country = Country.getCountryByCode(clientInfo.clientCountryCode);

  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/client" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Client Details </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/client/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        <div key={clientInfo.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span > Client Name </span>
                </td>
                <td> {clientInfo.clientName}</td>
              </tr>
              <tr>
                <td>
                  <span > Mobile </span>
                </td>
                <td>{clientInfo.clientmobile}</td>
              </tr>
              <tr>
                <td>
                  <span > Email </span>
                </td>
                <td>{clientInfo.clientemail}</td>
              </tr>
              <tr>
                <td>
                  <span > Client Category </span>
                </td>
                <td>{clientInfo.clientCategory}</td>
              </tr>
              <tr>
                <td>
                  <span > Address </span>
                </td>
                <td>{clientInfo.clientAddress}</td>
              </tr>
              <tr>
                <td>
                  <span > Country </span>
                </td>
                <td>{country ? country.name : ""}</td>
              </tr>
              <tr>
                <td>
                  <span > State </span>
                </td>
                <td>{state ? state.name : ""}</td>
              </tr>
              <tr>
                <td>
                  <span > City </span>
                </td>
                <td>{clientInfo.clientCity}</td>
              </tr>

              <tr>
                <td>
                  <span >Description</span>
                </td>
                <td>
                  {" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(clientInfo.note),
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

export default ShowClinetList;
