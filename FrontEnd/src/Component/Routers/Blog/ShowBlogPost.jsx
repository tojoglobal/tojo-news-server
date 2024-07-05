import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const ShowBlogPost = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogpost, setBlogpost] = useState([]);
  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/blogpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setBlogpost({
            ...blogpost,
            title: result.data.Result[0].blogtitle,
            file: result.data.Result[0].blogImg,
            artcl: result.data.Result[0].description,
            authorName: result.data.Result[0].authorName,
          });
        } else {
          alert(result.data.Error);
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // id toggle
  const [activeId, setActiveId] = useState(null);
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  console.log(blogpost);
  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/blogpost" className="route_link">
          {" "}
          <IoMdArrowRoundBack className="back_icon" /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Team Member Info </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
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
                    className="img-fluid"
                    src={`https://api.tojoglobal.com/Images/${blogpost.file}`}
                    alt={blogpost.img}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Name </span>
                </td>
                <td> {blogpost.authorName}</td>
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
                            __html: DOMPurify.sanitize(blogpost.artcl),
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
