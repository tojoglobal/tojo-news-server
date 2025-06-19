import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowEventsPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descVisible, setDescVisible] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const res = await axios.get(`${state.port}/api/admin/events/${id}`);
        if (res.data.Status && res.data.Result.length) {
          setEvent(res.data.Result[0]);
          setError(null);
        } else {
          setError(res.data.Error || "Failed to load event details");
        }
      } catch {
        setError("Network error while fetching event data");
      }
      setLoading(false);
    }
    fetchEvent();
  }, [id, state.port]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121923]">
        <svg
          className="animate-spin h-12 w-12 text-[#7aa8e6]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#121923] p-4">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121923] py-8 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-[#172133] rounded-2xl shadow-xl p-6 md:p-10 text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            Event Information
          </h1>
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <Link
              to="/dashboard/events"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-semibold shadow-md"
            >
              <IoMdArrowRoundBack className="text-2xl" /> Back
            </Link>
            <Link to={`/dashboard/events/edit/${id}`}>
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md">
                <FaEdit /> Edit
              </button>
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg max-h-[300px] md:max-h-full">
            <img
              src={
                event.image_url
                  ? `${state.port}/Images/${event.image_url}`
                  : "https://i.postimg.cc/KzNdw0LX/Group.png"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#7aa8e6] mb-2">
                Date
              </h2>
              <p className="text-lg">{formatDate(event.date)}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#7aa8e6] mb-2">
                Location
              </h2>
              <p className="text-lg">{event.location}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#7aa8e6] mb-2">
                Title
              </h2>
              <p className="text-lg">{event.title}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-[#7aa8e6] mb-4 flex items-center justify-between">
                Description
                <button
                  onClick={() => setDescVisible(!descVisible)}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition font-semibold"
                >
                  {descVisible ? "Hide" : "Show"}
                </button>
              </h2>

              {/* Description Panel */}
              {descVisible && (
                <div
                  className="bg-[#222e3e] rounded-lg p-6 shadow-inner max-h-[300px] overflow-y-auto leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(event.description),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEventsPost;
