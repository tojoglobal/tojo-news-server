/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HiPlus } from "react-icons/hi";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import Pagination from "../../Pagination/Pagination";

const EventsPost = () => {
  const { state } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = events.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.port}/api/admin/events`)
      .then((result) => {
        if (result.data.Status) {
          setEvents(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(() => toast.error("Error loading events."))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteDialog = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e16565",
      cancelButtonColor: "#2c324b",
      confirmButtonText: "Yes, delete it!",
      background: "#181c2f",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "font-semibold",
        cancelButton: "font-semibold",
        title: "font-bold",
        content: "font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(uuid);
      }
    });
  };

  const handleDelete = (uuid) => {
    if (!uuid) return;
    axios
      .delete(`${state.port}/api/admin/events/delete/${uuid}`)
      .then((result) => {
        if (result.data.Status) {
          setEvents((prev) => prev.filter((e) => e.uuid !== uuid));
          toast.success("Deleted successfully", {
            position: "top-right",
            style: { background: "#181c2f", color: "#fff" },
          });
        } else {
          toast.error(result.data.Error || "Failed to delete", {
            position: "top-right",
            style: { background: "#181c2f", color: "#fff" },
          });
        }
      })
      .catch(() =>
        toast.error("Failed to delete", {
          position: "top-right",
          style: { background: "#181c2f", color: "#fff" },
        })
      );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-3">
        All Events
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link to="/dashboard/events/create" className="no-underline">
          <button
            className="rounded-lg font-bold text-base md:text-lg px-7 py-2.5 bg-[#22263a] text-white flex items-center gap-2 shadow-none transition hover:bg-blue-700"
            type="button"
          >
            <HiPlus size={22} />
            Create Event
          </button>
        </Link>
      </div>
      <div className="w-full overflow-x-auto rounded-xl">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 bg-transparent text-white text-base mb-2">
          <thead>
            <tr className="bg-[#28283c]/90 text-[#7aa8e6]">
              <th className={thClass}>SL</th>
              <th className={thClass}>TITLE</th>
              <th className={thClass}>LOCATION</th>
              <th className={thClass}>DATE</th>
              <th className={thClass}>IMAGE</th>
              <th className={thClass + " text-center"}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <span className="inline-block w-9 h-9 border-4 border-[#23263a] border-t-[#7aa8e6] rounded-full animate-spin"></span>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((post, index) => (
                <tr
                  key={post.uuid}
                  className="bg-[#181c2f] border-b border-[#23263a] text-white"
                >
                  <td className={tdClass}>{startIndex + index + 1}</td>
                  <td className={tdClass}>{post.title}</td>
                  <td className={tdClass}>{post.location}</td>
                  <td className={tdClass}>{formatDate(post.date)}</td>
                  <td className={tdClass}>
                    <img
                      src={
                        post.image_url
                          ? `${state.port}/Images/${post.image_url}`
                          : "https://i.postimg.cc/KzNdw0LX/Group.png"
                      }
                      alt={post.title}
                      className="w-[70px] h-[44px] rounded-md object-cover border border-[#23263a] shadow-md"
                    />
                  </td>
                  <td className={tdClass + " text-center min-w-[150px]"}>
                    <Link
                      to={`/dashboard/events/edit/${post.uuid}`}
                      title="Edit"
                      className={iconBtnLinkClass}
                    >
                      <MdEdit size={22} color="#7aa8e6" />
                    </Link>
                    <Link
                      to={`/dashboard/events/${post.uuid}`}
                      title="Show"
                      className={iconBtnLinkClass}
                    >
                      <MdVisibility size={22} color="#7aa8e6" />
                    </Link>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteDialog(post.uuid)}
                      className={iconBtnClass}
                    >
                      <MdDelete size={22} color="#e16565" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-7">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={events.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const thClass =
  "py-3 px-3 text-[#7aa8e6] font-bold text-[15.5px] border-b border-[#2a2a44] select-none bg-transparent";
const tdClass =
  "py-3 px-3 text-white text-[15.5px] bg-transparent border-b border-[#23263a] align-middle";
const iconBtnLinkClass =
  "inline-flex items-center justify-center bg-none border-none mx-1 px-1 py-1 rounded hover:bg-[#1a2542]/60 transition cursor-pointer";
const iconBtnClass =
  "inline-flex items-center justify-center bg-none border-none mx-1 px-1 py-1 rounded hover:bg-[#23191a]/60 transition cursor-pointer outline-none";

export default EventsPost;
