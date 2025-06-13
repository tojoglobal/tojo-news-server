import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import DOMPurify from "dompurify";

const ShowEventsPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/events/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEvent(result.data.Result[0]);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, [id, state.port]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container dashboard_All">
      <h1 className="dashboard_name">Event Info</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-left mt-3">
          <h5>
            <Link to="/dashboard/events" className="route_link">
              <IoMdArrowRoundBack className="back_icon" /> Back
            </Link>
          </h5>
        </div>
        <div className="btn-text-right">
          <Link to={`/dashboard/events/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        <div className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>Image</td>
                <td>
                  <img
                    className="blog_Image"
                    src={
                      event.image_url
                        ? `${state.port}/Images/${event.image_url}`
                        : "https://i.postimg.cc/KzNdw0LX/Group.png"
                    }
                    alt={event.title}
                  />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{event.title}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(event.description),
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{event.location}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{formatDate(event.date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowEventsPost;
