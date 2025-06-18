import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const ShowEpisodes = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [Episodes, setEpisodes] = useState({});
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // Fetch podcast list and episode details together for author name
    const fetchData = async () => {
      try {
        const [podcastsRes, episodeRes] = await Promise.all([
          axios.get(`${state.port}/api/admin/Podcasts`),
          axios.get(`${state.port}/api/admin/Episodes/${id}`),
        ]);

        if (podcastsRes.data.Status && episodeRes.data.Status) {
          const authorData = podcastsRes.data.Result;
          const EpisodesData = episodeRes.data.Result[0];

          const authorOne =
            authorData.find((author) => author.ID === EpisodesData.podcastID)
              ?.name || "";

          setEpisodes({
            uuid: EpisodesData.uuid,
            title: EpisodesData.title,
            audioFile: EpisodesData.audioFile,
            artical: EpisodesData.episodesInfo,
            AuthorOne: authorOne,
            dateAndTime: EpisodesData.dateAndTime,
          });
        } else {
          setErrorMessage(
            podcastsRes.data.Error ||
              episodeRes.data.Error ||
              "Failed to fetch data"
          );
          toast.error(
            podcastsRes.data.Error ||
              episodeRes.data.Error ||
              "Failed to fetch data"
          );
        }
      } catch (err) {
        setErrorMessage(String(err));
        toast.error(String(err));
      }
    };

    fetchData();
  }, [id, state.port]);

  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // format date and time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
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
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/dashboard/Episodes"
            className="inline-flex items-center gap-2 text-royal-indigo hover:underline font-semibold"
          >
            <IoMdArrowRoundBack className="text-lg" /> Back
          </Link>
          <Link to={`/dashboard/Episodes/edit/${id}`}>
            <button
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
              type="button"
            >
              Edit
            </button>
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Episode Info</h1>
        <hr className="border-gray-700 mb-6" />
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
        )}
        <div className="rounded-lg bg-[#181f33] p-6">
          <table className="min-w-full text-sm text-left text-white">
            <tbody>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Episode Audio
                </td>
                <td className="py-2">
                  {Episodes.audioFile ? (
                    <audio controls className="w-full">
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
                  ) : (
                    <span className="text-gray-400">No audio available</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Date & Time
                </td>
                <td className="py-2">
                  <time>{formatDateTime(Episodes.dateAndTime)}</time>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Author Name
                </td>
                <td className="py-2">{Episodes.AuthorOne}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Podcast Title
                </td>
                <td className="py-2">{Episodes.title}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300 align-top">
                  Podcast Info
                </td>
                <td className="py-2">
                  <button
                    className="txt_btn_style"
                    onClick={() => togglePopup(Episodes.uuid)}
                  >
                    {activeId === Episodes.uuid ? "Hide Info" : "Show Info"}
                  </button>
                  {activeId === Episodes.uuid && (
                    <div className="popup mt-2 rounded bg-[#212b3a] p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(Episodes.artical || ""),
                        }}
                      ></div>
                      <button
                        className="txt_btn_style mt-2"
                        onClick={() => togglePopup(Episodes.uuid)}
                      >
                        Close
                      </button>
                    </div>
                  )}
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
