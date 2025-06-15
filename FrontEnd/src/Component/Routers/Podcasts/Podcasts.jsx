import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router";
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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const Podcasts = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [Podcasts, setPodcasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [BlogPostToDelete, setBlogPostToDelete] = useState();

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Podcasts`)
      .then((result) => {
        if (result.data.Status) {
          setPodcasts(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
      .delete(`${state.port}/api/admin/Podcasts/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/Podcasts");
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
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">All Podcast </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <Link to="/dashboard/Podcasts/create">
            <button className="button-62" role="button">
              New Podcast{" "}
              <span>
                {" "}
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{BlogPostToDelete}</p>
        </div>
        {/* ++++++========part 3 =======++++++++ */}
        <div>
          <div>
            <table id="customers">
              <tr>
                <th>SL</th>
                <th>Hosted NAME</th>
                <th>Hosted INFO</th>
                <th>IMG</th>
                <th>ACTIONS</th>
              </tr>

              {Podcasts.length > 0 &&
                Podcasts.map((tm, index) => (
                  <tr key={tm.uuid}>
                    <td>{index + 1}</td>
                    <td>{tm.name}</td>
                    <td>{tm.hostedInfo}</td>
                    <td>
                      <img
                        className="Team_member_Image"
                        src={`${state.port}/Images/${tm.image}`}
                        alt={tm.image}
                      />
                    </td>
                    <td>
                      <div className="dropdown">
                        <button className="dropbtn">
                          Select <MdOutlineArrowDownward />
                        </button>
                        <div className="dropdown-content">
                          <Link
                            to={`/dashboard/Podcasts/edit/${tm.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
                          </Link>
                          {/* </span> */}

                          <Link
                            to={`/dashboard/Podcasts/${tm.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> SHOW</span>
                          </Link>

                          <span
                            onClick={() => handleClickOpen(tm.uuid)}
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
                              to={`/dashboard/Podcasts/delete`}
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
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
