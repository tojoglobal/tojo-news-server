import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowEpisodes = () => {
  // Router
  const { id } = useParams();
  const { state } = useContext(AppContext);

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [Episodes, setEpisodes] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Episodes/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEpisodes({
            ...Episodes,
            title: result.data.Result[0].title,
            audioFile: result.data.Result[0].audioFile,
            episodesInfo: result.data.Result[0].episodesInfo,
            AuthorOne: result.data.Result[0].podcastID,
            dateAndTime: result.data.Result[0].dateAndTime,
          });
        } else {
          alert(result.data.Error);
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch authors and blog post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, EpisodesResponse] = await Promise.all([
          axios.get(`${state.port}/api/admin/Podcasts`),
          axios.get(`${state.port}/api/admin/Episodes/${id}`),
        ]);

        if (authorResponse.data.Status && EpisodesResponse.data.Status) {
          const authorData = authorResponse.data.Result;
          const EpisodesData = EpisodesResponse.data.Result[0];

          const authorOne =
            authorData.find((author) => author.ID === EpisodesData.podcastID)
              ?.name || "";

          setEpisodes({
            title: EpisodesData.title,
            AuthorOne: authorOne,
            audioFile: EpisodesData.audioFile,
            artical: EpisodesData.episodesInfo,
            dateAndTime: EpisodesData.dateAndTime,
          });
        } else {
          alert("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  // id toggle
  const [activeId, setActiveId] = useState(null);
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // formate date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = { month: "long", day: "2-digit", year: "numeric" };

    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .toUpperCase();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="container dashboard_All">
      <h1 className="dashboard_name">Blog Info </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-left mt-3">
          <h5>
            <Link to="/dashboard/Episodes" className="route_link">
              {" "}
              <IoMdArrowRoundBack className="back_icon" /> Back
            </Link>
          </h5>
        </div>
        <div className="btn-text-right">
          <Link to={`/dashboard/Episodes/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={Episodes.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span>Episods Audio</span>
                </td>
                <td>
                  <audio controls>
                    <source
                      src={`${state.port}/Audio/${Episodes.audioFile}`}
                      type="audio/mpeg"
                    />
                    <source
                      src={`${state.port}/Audio/${Episodes.audioFile}`}
                      type="audio/ogg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Date & Time </span>
                </td>
                <td>
                  <time>{formatDateTime(Episodes.dateAndTime)}</time>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Author Name</span>
                </td>
                <td>{Episodes.AuthorOne}</td>
              </tr>

              <tr>
                <td>
                  <span>Podcastes Title </span>
                </td>
                <td>{Episodes.title}</td>
              </tr>

              <tr>
                <td>
                  <span>Podcastes Info</span>
                </td>
                <td>
                  <div>
                    <span>
                      <button
                        className="txt_btn_style"
                        onClick={() => togglePopup(Episodes.uuid)}
                      >
                        {activeId === Episodes.uuid ? "Hide note" : "Show note"}
                      </button>
                    </span>
                    {activeId === Episodes.uuid && (
                      <div className="popup">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(Episodes.artical),
                          }}
                        ></div>
                        <button
                          className="txt_btn_style"
                          onClick={() => togglePopup(Episodes.uuid)}
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

export default ShowEpisodes;
