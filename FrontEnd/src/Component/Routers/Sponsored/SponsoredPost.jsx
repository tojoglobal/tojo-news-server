/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";
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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const SponsoredPost = () => {
  const { state } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [sponsoredPosts, setSponsoredPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Sponsored`)
      .then((result) => {
        if (result.data.Status) {
          setSponsoredPosts(result.data.Result);
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
    setPaginatedData(sponsoredPosts.slice(startIndex, endIndex));
  }, [currentPage, sponsoredPosts]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  };

  const handleDelete = () => {
    axios
      .delete(`${state.port}/api/admin/Sponsored/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setSponsoredPosts(
            sponsoredPosts.filter((post) => post.id !== dataDeleteId)
          );
          setDeleteMessage(`Deleted successfully`);
          toast.success(`Deleted successfully`, {
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
          setDeleteMessage(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
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
    <div className="conatiner dashboard_All">
      <h1 className="dashboard_name">All Sponsored Posts</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <Link to="/dashboard/Sponsored/create">
            <button className="button-62" role="button">
              Create Sponsored Post{" "}
              <span>
                {" "}
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{deleteMessage}</p>
        </div>
        <div>
          <div>
            <table id="customers" className="">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>TITLE</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>IMAGE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 &&
                  paginatedData.map((post, index) => (
                    <tr key={post.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{post.title}</td>
                      <td>{formatDate(post.start_date)}</td>
                      <td>{formatDate(post.end_date)}</td>
                      <td>
                        <img
                          className="Team_member_Image"
                          src={
                            post.image_url
                              ? `${state.port}/Images/${post.image_url}`
                              : "https://i.postimg.cc/KzNdw0LX/Group.png"
                          }
                          alt={post.title}
                        />
                      </td>
                      <td>
                        <div className="dropdown">
                          <button className="dropbtn">
                            Select <MdOutlineArrowDownward />
                          </button>
                          <div className="dropdown-content">
                            <Link
                              to={`/dashboard/Sponsored/edit/${post.id}`}
                              className="routeLink"
                            >
                              <span className="actionBtn"> Edit</span>
                            </Link>

                            <Link
                              to={`/dashboard/Sponsored/${post.id}`}
                              className="routeLink"
                            >
                              <span className="actionBtn"> SHOW</span>
                            </Link>

                            <span
                              onClick={() => handleClickOpen(post.id)}
                              className="actionBtn"
                            >
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
                              Are you sure you want to delete this sponsored
                              post?
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
                              <span
                                style={{
                                  color: "#E16565",
                                  textDecoration: "none",
                                }}
                              >
                                Yes, delete it!
                              </span>
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalItems={sponsoredPosts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SponsoredPost;
