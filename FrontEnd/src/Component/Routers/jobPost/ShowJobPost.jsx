import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const ShowJobPost = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [job, setJob] = useState({});

  // Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/jobpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setJob({
            ...job,
            jobTitle: result.data.Result[0].jobTitle,
            jobPosition: result.data.Result[0].jobPosition,
            jobTime: result.data.Result[0].jobTime,
            applyLink: result.data.Result[0].applyLink,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(err.toString());
      });
  }, [id]);

  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/job" className="route_link">
          {" "}
          <IoMdArrowRoundBack className="back_icon" /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Job Info</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/job/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={job.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span>Job Title </span>
                </td>
                <td>{job.jobTitle}</td>
              </tr>
              <tr>
                <td>
                  <span>Job Position</span>
                </td>
                <td>{job.jobPosition}</td>
              </tr>
              <tr>
                <td>
                  <span>Job Time</span>
                </td>
                <td>{job.jobTime}</td>
              </tr>
              <tr>
                <td>
                  <span>Apply Link</span>
                </td>
                <td>
                  <a href={job.applyLink} target="_blank" rel="noreferrer">
                    {job.applyLink}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowJobPost;
