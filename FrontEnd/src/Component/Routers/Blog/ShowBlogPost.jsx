import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const ShowBlogPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [blogpost, setBlogpost] = useState({});
  const [activeId, setActiveId] = useState(null);

  // Fetch authors, blogpost, and news category details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, newsCategoryResponse, blogPostResponse] =
          await Promise.all([
            axios.get(`${state.port}/api/admin/author`),
            axios.get(`${state.port}/api/admin/newsCategory`),
            axios.get(`${state.port}/api/admin/blogpost/${id}`),
          ]);

        if (
          authorResponse.data.Status &&
          newsCategoryResponse.data.Status &&
          blogPostResponse.data.Status
        ) {
          const authorData = authorResponse.data.Result;
          const newsCategoryData = newsCategoryResponse.data.Result;
          const blogPostData = blogPostResponse.data.Result[0];

          const newsCatagory =
            newsCategoryData.find(
              (catgory) => catgory.ID === blogPostData.category_id
            )?.name || "";

          const authorOne =
            authorData.find((author) => author.ID === blogPostData.author1_id)
              ?.name || "";
          const authorTwo =
            authorData.find((author) => author.ID === blogPostData.author2_id)
              ?.name || "";

          setBlogpost({
            title: blogPostData.title,
            subTitle: blogPostData.subtitle,
            AuthorOne: authorOne,
            AuthorTwo: authorTwo,
            newsCategory: newsCatagory,
            Image: blogPostData.thumble,
            artical: blogPostData.articalpost,
            dateAndTime: blogPostData.dateAndTime,
            uuid: blogPostData.uuid,
          });
        } else {
          toast.error("Failed to fetch blog post details");
        }
      } catch (err) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [id, state.port]);

  // Toggle for showing/hiding blog text
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // Format date and time
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
    <div className="min-h-[calc(100vh-64px)] bg-[#101829] flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-3xl bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-3xl font-bold">Blog Info</h1>
          <div className="flex gap-3">
            <Link
              to="/dashboard/blogpost"
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-gray-700 hover:bg-gray-600 transition text-white"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
            <Link to={`/dashboard/blogpost/edit/${id}`}>
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
                <td className="py-2 font-semibold w-40">Blog Image</td>
                <td className="py-2">
                  <img
                    className="h-28 w-28 object-cover rounded-lg border border-gray-700"
                    src={`${state.port}/Images/${blogpost.Image}`}
                    alt={blogpost.Image}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Date & Time</td>
                <td className="py-2">
                  <time>{formatDateTime(blogpost.dateAndTime)}</time>
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Author Name</td>
                <td className="py-2">
                  {blogpost.AuthorOne}
                  {blogpost.AuthorTwo ? ` & ${blogpost.AuthorTwo}` : ""}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Blog Category</td>
                <td className="py-2">{blogpost.newsCategory}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Blog Title</td>
                <td className="py-2">{blogpost.title}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Blog Text</td>
                <td className="py-2">
                  <button
                    className="px-3 cursor-pointer py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
                    onClick={() => togglePopup(blogpost.uuid)}
                  >
                    {activeId === blogpost.uuid ? "Hide blog" : "Show blog"}
                  </button>
                  {activeId === blogpost.uuid && (
                    <div className="mt-3 bg-[#222e3e] rounded p-4 shadow-inner max-h-60 overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blogpost.artical),
                        }}
                      ></div>
                      <button
                        className="mt-3 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition"
                        onClick={() => togglePopup(blogpost.uuid)}
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

export default ShowBlogPost;
