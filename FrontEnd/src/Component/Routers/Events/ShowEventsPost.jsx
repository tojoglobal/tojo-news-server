import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowEventsPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${state.port}/api/admin/events/${id}`);
        if (res.data.Status && res.data.Result.length) {
          setEvent(res.data.Result[0]);
        } else {
          toast.error(res.data.Error || "Failed to fetch event details");
        }
      } catch (err) {
        toast.error("Error fetching event data");
      }
    };
    fetchEvent();
  }, [id, state.port]);

  // Toggle for showing/hiding event description
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // Format date
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  return (
    <div className="p-3">
      <div className="w-full max-w-3xl mx-auto bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-3xl font-bold">Event Info</h1>
          <div className="flex gap-3">
            <Link
              to="/dashboard/events"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
            <Link to={`/dashboard/events/edit/${id}`}>
              <button className="inline-flex cursor-pointer items-center gap-1 px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold">
                Edit
              </button>
            </Link>
          </div>
        </div>
        <hr className="border-gray-700 mb-6" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <tbody>
              <tr>
                <td className="py-2 font-semibold w-40">Event Image</td>
                <td className="py-2">
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
              <tr>
                <td className="py-2 font-semibold">Date</td>
                <td className="py-2">
                  <time>{formatDate(event.date)}</time>
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Location</td>
                <td className="py-2">{event.location}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Title</td>
                <td className="py-2">{event.title}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Description</td>
                <td className="py-2">
                  <button
                    className="px-3 cursor-pointer py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
                    onClick={() => togglePopup(event.uuid)}
                  >
                    {activeId === event.uuid
                      ? "Hide description"
                      : "Show description"}
                  </button>
                  {activeId === event.uuid && (
                    <div className="mt-3 bg-[#222e3e] rounded p-4 shadow-inner max-h-60 overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(event.description),
                        }}
                      ></div>
                      <button
                        className="mt-3 cursor-pointer px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition"
                        onClick={() => togglePopup(event.uuid)}
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

export default ShowEventsPost;
