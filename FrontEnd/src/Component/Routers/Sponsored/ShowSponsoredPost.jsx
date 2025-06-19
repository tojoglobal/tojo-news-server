/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [descVisible, setDescVisible] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${state.port}/api/admin/Sponsoredbyid/${id}`
        );
        if (res.data.Status && res.data.Result.length) {
          setPost(res.data.Result[0]);
          setErrorMessage(null);
        } else {
          setErrorMessage(res.data.Error || "Failed to fetch sponsored post");
          toast.error(errorMessage);
        }
      } catch (err) {
        setErrorMessage("Error fetching sponsored post");
        toast.error("Error fetching sponsored post");
      }
      setLoading(false);
    };
    fetchPost();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-10 w-10 text-[#7aa8e6]"
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="w-full max-w-4xl mx-auto bg-[#172133] rounded-xl shadow-lg p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Sponsored Post Info</h1>
          <div className="flex gap-3">
            <Link
              to="/dashboard/Sponsored"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
            <Link to={`/dashboard/Sponsored/edit/${id}`}>
              <button className="inline-flex cursor-pointer items-center gap-1 px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold">
                <FaEdit /> Edit
              </button>
            </Link>
          </div>
        </div>
        <hr className="border-gray-700 mb-6" />

        {errorMessage ? (
          <p className="text-red-500 font-semibold text-center">
            {errorMessage}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white border-separate border-spacing-y-3">
              <tbody>
                {/* Image */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell w-full md:w-40 text-gray-400">
                    Image
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    <img
                      className="h-40 object-cover rounded-lg border border-gray-700"
                      src={
                        post.image_url
                          ? `${state.port}/Images/${post.image_url}`
                          : "https://i.postimg.cc/KzNdw0LX/Group.png"
                      }
                      alt={post.title}
                    />
                  </td>
                </tr>

                {/* Title */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Title
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {post.title}
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
                      {descVisible ? "Hide description" : "Show description"}
                    </button>

                    {descVisible && (
                      <div
                        className="mt-2 bg-[#222e3e] rounded p-4 shadow-inner text-sm leading-relaxed max-h-56 overflow-y-auto"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.description),
                        }}
                      />
                    )}
                  </td>
                </tr>

                {/* Start Date */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Start Date
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {formatDate(post.start_date)}
                  </td>
                </tr>

                {/* End Date */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    End Date
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {formatDate(post.end_date)}
                  </td>
                </tr>

                {/* Published At */}
                <tr className="block md:table-row rounded-lg">
                  <td className="py-2 md:px-4 font-semibold block md:table-cell text-gray-400">
                    Published At
                  </td>
                  <td className="py-2 md:px-4 block md:table-cell">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSponsoredPost;
