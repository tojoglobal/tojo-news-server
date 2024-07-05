import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const ShowContactList = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactInfo, setContactInfo] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/contactlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setContactInfo({
            ...contactInfo,
            contactName: result.data.Result[0].contactName,
            category: result.data.Result[0].category,
            mobileNo: result.data.Result[0].mobileNo,
            eamil: result.data.Result[0].eamil,
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
        <Link to="/dashboard/contact" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Contact Details </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/contact/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        <div key={contactInfo.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span > Contact Name </span>
                </td>
                <td> {contactInfo.contactName}</td>
              </tr>
              <tr>
                <td>
                  <span > Mobile No </span>
                </td>
                <td>{contactInfo.mobileNo}</td>
              </tr>
              <tr>
                <td>
                  <span > Email </span>
                </td>
                <td>{contactInfo.eamil}</td>
              </tr>
              <tr>
                <td>
                  <span > Category </span>
                </td>
                <td>{contactInfo.category}</td>
              </tr>

              <tr>
                <td>
                  <span >Note</span>
                </td>
                <td>
                  {" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(contactInfo.note),
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

export default ShowContactList;
