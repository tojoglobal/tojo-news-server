import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowPodcasts = () => {
  const { state } = useContext(AppContext);
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [podcasts, setPodcasts] = useState([]);

  //Data Fetching
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/podcasts/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setPodcasts({
            ...podcasts,
            HostedName: result.data.Result[0].name,
            HostedInfo: result.data.Result[0].hostedInfo,
            ImageName: result.data.Result[0].image,
            SpotifyUrl: result.data.Result[0].spotify,
            AppleUrl: result.data.Result[0].apple,
          });
        } else {
          alert(result.data.Error);
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id, podcasts]);

  // id toggle
  const [activeId, setActiveId] = useState(null);
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  console.log(podcasts);
  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/podcasts" className="route_link">
          {" "}
          <IoMdArrowRoundBack className="back_icon" /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Team Member Info </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/podcasts/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={podcasts.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span>Profile Image</span>
                </td>
                <td>
                  {" "}
                  <img
                    className="blog_Image"
                    src={`${state.port}/Images/${podcasts.ImageName}`}
                    alt={podcasts.ImageName}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Hosted Name </span>
                </td>
                <td> {podcasts.HostedName}</td>
              </tr>
              <tr>
                <td>
                  <span>Apple Url </span>
                </td>
                <td>{podcasts.AppleUrl}</td>
              </tr>
              <tr>
                <td>
                  <span> Spotify Url </span>
                </td>
                <td>{podcasts.SpotifyUrl}</td>
              </tr>

              <tr>
                <td>
                  <span>Hosted Info</span>
                </td>
                <td>
                  <div>
                    <span>
                      <button
                        className="txt_btn_style"
                        onClick={() => togglePopup(podcasts.uuid)}
                      >
                        {activeId === podcasts.uuid ? "Hide note" : "Show note"}
                      </button>
                    </span>
                    {activeId === podcasts.uuid && (
                      <div className="popup">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(podcasts.HostedInfo),
                          }}
                        ></div>
                        <button
                          className="txt_btn_style"
                          onClick={() => togglePopup(podcasts.uuid)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowPodcasts;
