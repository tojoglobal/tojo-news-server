import axios from "axios";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineArrowDownward } from "react-icons/md";
import Pagination from "../../Pagination/Pagination";

const BlogPost = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogpost, setBlogpost] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [BlogPostToDelete, setBlogPostToDelete] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  // fetch data
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/blogpost")
      .then((result) => {
        if (result.data.Status) {
          setBlogpost(result.data.Result);
          setPaginatedData(result.data.Result.slice(0, itemsPerPage));
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(blogpost.slice(startIndex, endIndex));
  }, [currentPage, blogpost]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // matrial dialog box
  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  // diolog box open and cloge function
  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // data delete and cancel function
  const handleCancel = () => {
    toast.error(`Cancel`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setOpen(false);
    // setDataDeleteCancel(true)
  };

  const handleDelete = () => {
    axios
      .delete(`https://api.tojoglobal.com/api/admin/blogpost/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/blogpost");
          setBlogPostToDelete(`deleted successfully`);
          toast.success(`deleted successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setBlogPostToDelete(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">All blog post </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <Link to="/dashboard/blogpost/create">
            <button className="button-62" role="button">
              Create Blog Post{" "}
              <span>
                {" "}
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{BlogPostToDelete}</p>
        </div>
        {/* table start */}
        <div>
          <div>
            <table id="customers" className="">
              <tr>
                <th>SL</th>
                <th>TITLE</th>
                <th>BLOG TUMBLER</th>
                <th>ACTIONS</th>
              </tr>

              {paginatedData.length > 0 &&
                paginatedData.map((bgPost, index) => (
                  <tr key={bgPost.uuid}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{bgPost.blogtitle}</td>
                    <td>
                      <img
                        className="Team_member_Image"
                        src={`https://api.tojoglobal.com/Images/${bgPost.blogImg}`}
                        alt={bgPost.blogImg}
                      />
                    </td>
                    <td>
                      <div className="dropdown">
                        <button className="dropbtn">
                          Select <MdOutlineArrowDownward />
                        </button>
                        <div className="dropdown-content">
                          <Link
                            to={`/dashboard/blogpost/edit/${bgPost.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
                          </Link>
                          {/* </span> */}

                          <Link
                            to={`/dashboard/blogpost/${bgPost.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> SHOW</span>
                          </Link>

                          <span
                            onClick={() => handleClickOpen(bgPost.uuid)}
                            className="actionBtn"
                          >
                            {" "}
                            DELETE
                          </span>
                        </div>
                      </div>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle
                          id="responsive-dialog-title "
                          className="icon_div"
                        >
                          <div style={{ textAlign: "center" }}>
                            <BsExclamationCircle className="icon" />
                            <h3 style={{ paddingTop: "20px" }}>
                              Are You sure?{" "}
                            </h3>
                          </div>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure delete this contact Info
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            autoFocus
                            onClick={handleCancel}
                            style={{ color: "#E16565" }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleDelete} autoFocus>
                            <Link
                              to={`/dashboard/blogpost/delete`}
                              style={{
                                color: "#E16565",
                                textDecoration: "none",
                              }}
                            >
                              Yes,delete it!
                            </Link>
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          {/* table */}
          <Pagination
            totalItems={blogpost.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
