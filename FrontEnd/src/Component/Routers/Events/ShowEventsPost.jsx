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
    <div className="p-3">
      <div className="w-full max-w-4xl mx-auto bg-[#172133] rounded-xl shadow-lg p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Event Information</h1>
          <div className="flex gap-3">
            <Link
              to="/dashboard/events"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
            <Link to={`/dashboard/events/edit/${id}`}>
              <button className="inline-flex cursor-pointer items-center gap-1 px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold">
                <FaEdit /> Edit
              </button>
            </Link>
          </div>
        </div>
        <hr className="border-gray-700 mb-6" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <table className="w-full text-sm text-left text-white border-separate border-spacing-y-3">
              <tbody>
                {/* Image */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell w-full md:w-40 text-gray-400">
                    Event Image
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    <img
                      className="h-40 object-cover rounded-lg border border-gray-700"
                      src={
                        event.image_url
                          ? `${state.port}/Images/${event.image_url}`
                          : "https://i.postimg.cc/KzNdw0LX/Group.png"
                      }
                      alt={event.title}
                    />
                  </td>
                </tr>

                {/* Date */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Date
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {formatDate(event.date)}
                  </td>
                </tr>

                {/* Location */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Location
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {event.location}
                  </td>
                </tr>

                {/* Title */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Title
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {event.title}
                  </td>
                </tr>

                {/* Description */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Description
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    <button
                      onClick={() => setDescVisible(!descVisible)}
                      className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition mb-2"
                    >
                      {descVisible ? "Hide" : "Show"}
                    </button>

                    {descVisible && (
                      <div
                        className="mt-2 bg-[#222e3e] rounded p-4 shadow-inner text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(event.description),
                        }}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowEventsPost;
