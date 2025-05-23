/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const ShowSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sponsoredPost, setSponsoredPost] = useState({});

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Sponsoredbyid/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setSponsoredPost(result.data.Result[0]);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

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
      <h1 className="dashboard_name">Sponsored Post Info</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-left mt-3">
          <h5>
            <Link to="/dashboard/Sponsored" className="route_link">
              {" "}
              <IoMdArrowRoundBack className="back_icon" /> Back
            </Link>
          </h5>
        </div>
        <div className="btn-text-right">
          <Link to={`/dashboard/Sponsored/edit/${id}`}>
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
                <td>
                  <span>Image</span>
                </td>
                <td>
                  <img
                    className="blog_Image"
                    src={
                      sponsoredPost.image_url
                        ? `${state.port}/Images/${sponsoredPost.image_url}`
                        : "https://i.postimg.cc/KzNdw0LX/Group.png"
                    }
                    alt={sponsoredPost.title}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>Title</span>
                </td>
                <td>{sponsoredPost.title}</td>
              </tr>
              <tr>
                <td>
                  <span>Description</span>
                </td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(sponsoredPost.description),
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Sponsor ID</span>
                </td>
                <td>{sponsoredPost.sponsor_id || "N/A"}</td>
              </tr>
              <tr>
                <td>
                  <span>Start Date</span>
                </td>
                <td>{formatDate(sponsoredPost.start_date)}</td>
              </tr>
              <tr>
                <td>
                  <span>End Date</span>
                </td>
                <td>{formatDate(sponsoredPost.end_date)}</td>
              </tr>
              <tr>
                <td>
                  <span>Published At</span>
                </td>
                <td>
                  {sponsoredPost.published_at
                    ? new Date(sponsoredPost.published_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowSponsoredPost;
