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
    <div className="p-2 md:p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-[#172133] rounded-xl shadow-lg p-4 md:p-8 text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-wide">
            Sponsored Post Info
          </h1>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              to="/dashboard/Sponsored"
              className="inline-flex items-center gap-1 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition text-white w-full md:w-auto justify-center"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
            <Link
              to={`/dashboard/Sponsored/edit/${id}`}
              className="w-full md:w-auto"
            >
              <button className="inline-flex cursor-pointer items-center gap-1 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold w-full justify-center">
                <FaEdit /> Edit
              </button>
            </Link>
          </div>
        </div>
        <hr className="border-gray-700 mb-2 md:mb-6" />
        {/* Table */}
        {errorMessage ? (
          <p className="text-red-500 font-semibold text-center">
            {errorMessage}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white border-separate border-spacing-y-4">
              <tbody>
                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold w-40 whitespace-nowrap rounded-l-lg">
                    Image
                  </td>
                  <td className="py-3 px-4 rounded-r-lg">
                    <img
                      src={
                        post.image_url
                          ? `${state.port}/Images/${post.image_url}`
                          : "https://i.postimg.cc/KzNdw0LX/Group.png"
                      }
                      alt={post.title}
                      className="max-w-xs w-full h-auto rounded-lg object-cover shadow-lg"
                    />
                  </td>
                </tr>

                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    Title
                  </td>
                  <td className="py-3 px-4">{post.title}</td>
                </tr>

                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    Description
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setDescVisible(!descVisible)}
                      className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-xs mb-2"
                    >
                      {descVisible ? "Hide description" : "Show description"}
                    </button>
                    {descVisible && (
                      <div className="bg-[#222e3e] rounded p-4 shadow-inner max-h-56 overflow-y-auto text-sm leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.description),
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>

                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    Start Date
                  </td>
                  <td className="py-3 px-4">{formatDate(post.start_date)}</td>
                </tr>

                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    End Date
                  </td>
                  <td className="py-3 px-4">{formatDate(post.end_date)}</td>
                </tr>

                <tr className="bg-[#1f2a42] rounded-lg shadow-md">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    Published At
                  </td>
                  <td className="py-3 px-4">
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
