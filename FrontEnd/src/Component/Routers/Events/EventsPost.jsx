/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const EventsPost = () => {
  const { state } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/events`)
      .then((result) => {
        if (result.data.Status) {
          setEvents(result.data.Result);
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
    setPaginatedData(events.slice(startIndex, endIndex));
  }, [currentPage, events]);

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
    toast.error(`Cancel`, { position: "top-right", autoClose: 5000 });
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${state.port}/api/admin/events/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setEvents(events.filter((post) => post.uuid !== dataDeleteId));
          setDeleteMessage(`Deleted successfully`);
          toast.success(`Deleted successfully`, {
            position: "top-right",
            autoClose: 5000,
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
      <ToastContainer />
      <h1 className="dashboard_name">All Events</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <Link to="/dashboard/events/create">
            <button className="button-62" role="button">
              Create Event{" "}
              <span>
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{deleteMessage}</p>
        </div>
        <div>
          <table id="customers" className="">
            <thead>
              <tr>
                <th>SL</th>
                <th>TITLE</th>
                <th>LOCATION</th>
                <th>DATE</th>
                <th>IMAGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 &&
                paginatedData.map((post, index) => (
                  <tr key={post.uuid}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.location}</td>
                    <td>{formatDate(post.date)}</td>
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
                            to={`/dashboard/events/edit/${post.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
                          </Link>
                          <Link
                            to={`/dashboard/events/${post.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> SHOW</span>
                          </Link>
                          <span
                            onClick={() => handleClickOpen(post.uuid)}
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
                            Are you sure you want to delete this event?
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
          <Pagination
            totalItems={events.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsPost;
