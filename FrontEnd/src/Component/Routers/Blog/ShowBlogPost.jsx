import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const ShowBlogPost = () => {
  const { state } = useContext(AppContext);
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogpost, setBlogpost] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/blogpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setBlogpost({
            ...blogpost,
            title: result.data.Result[0].title,
            subTitle: result.data.Result[0].subtitle,
            AuthorOne: result.data.Result[0].author1_id,
            AuthorTwo: result.data.Result[0].author2_id,
            newsCategory: result.data.Result[0].category_id,
            Image: result.data.Result[0].thumble,
            artical: result.data.Result[0].articalpost,
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
            <Link to="/dashboard/blogpost" className="route_link">
              {" "}
              <IoMdArrowRoundBack className="back_icon" /> Back
            </Link>
          </h5>
        </div>
        <div className="btn-text-right">
          <Link to={`/dashboard/blogpost/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={blogpost.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span>Blog Image</span>
                </td>
                <td>
                  {" "}
                  <img
                    className="blog_Image"
                    src={`${state.port}/Images/${blogpost.Image}`}
                    alt={blogpost.Image}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Date & Time </span>
                </td>
                <td>
                  <time>{formatDateTime(blogpost.dateAndTime)}</time>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Author Name</span>
                </td>
                <td>
                  {blogpost.AuthorOne}
                  {blogpost.AuthorTwo ? ` & ${blogpost.AuthorTwo}` : ""}
                </td>
              </tr>

              <tr>
                <td>
                  <span>Blog Category</span>
                </td>
                <td>{blogpost.newsCategory}</td>
              </tr>
              <tr>
                <td>
                  <span>Job Title </span>
                </td>
                <td>{blogpost.title}</td>
              </tr>

              <tr>
                <td>
                  <span>Blog Text</span>
                </td>
                <td>
                  <div>
                    <span>
                      <button
                        className="txt_btn_style"
                        onClick={() => togglePopup(blogpost.uuid)}
                      >
                        {activeId === blogpost.uuid ? "Hide note" : "Show note"}
                      </button>
                    </span>
                    {activeId === blogpost.uuid && (
                      <div className="popup">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blogpost.artical),
                          }}
                        ></div>
                        <button
                          className="txt_btn_style"
                          onClick={() => togglePopup(blogpost.uuid)}
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

export default ShowBlogPost;
