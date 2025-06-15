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

const TagNameServerRouter = () => {
  const { state } = useContext(AppContext);
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [TagName, setTagName] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [TagNameToDelete, setTagNameToDelete] = useState();

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/TagName`)
      .then((result) => {
        if (result.data.Status) {
          setTagName(result.data.Result);
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
    // console.log(id);
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
    console.log(dataDeleteId);
    axios
      .delete(`${state.port}/api/admin/TagName/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/TagName");
          setTagNameToDelete(`deleted successfully`);
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
          setTagNameToDelete(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">All TagName</h1>
      <hr />
      <div className="">
        <div>
          <Link to="/dashboard/TagName/create">
            <button className="button-62" role="button">
              Create TagName
              <span>
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{TagNameToDelete}</p>
          <p>{errorMessage}</p>
        </div>
        {/* ++++++========part 2 =======++++++++ */}
        {/* table start */}
        <div>
          <div>
            <table id="customers" className="">
              <tr>
                <th>SL</th>
                <th>TagName</th>
                <th>ACTIONS</th>
              </tr>

              {TagName.length > 0 &&
                TagName.map((fq, index) => (
                  <tr key={fq.uuid}>
                    <td>{index + 1}</td>
                    <td>{fq.name}</td>
                    <td>
                      <div className="dropdown">
                        <button className="dropbtn">
                          Select <MdOutlineArrowDownward />
                        </button>
                        <div className="dropdown-content">
                          <Link
                            to={`/dashboard/TagName/edit/${fq.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
                          </Link>
                          <span
                            onClick={() => handleClickOpen(fq.uuid)}
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
                              to={`/dashboard/TagName/delete`}
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
        {/* <div>
          <div className="grid_container">
            {TagName &&
              TagName.map((fq) => (
                <div key={fq.uuid} className="grid_container_div">
                  <p>
                    <span style={{ color: "#E16565" }}>Title: </span>{" "}
                    {fq.question}
                  </p>
                  <p>
                    <span style={{ color: "#E16565" }}> Description: </span>{" "}
                    {fq.answer}
                  </p>
                  <br />
                  <Link to={`/dashboard/TagName/edit/${fq.uuid}`}>
                    <button
                      className="button-62 cetificate_image_deleteBtn"
                      role="button"
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="button-62 cetificate_image_deleteBtn"
                    role="button"
                    onClick={() => handleClickOpen(fq.uuid)}
                  >
                    Delete
                  </button>
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
                        <h3 style={{ paddingTop: "20px" }}>Are You sure? </h3>
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure delete the &quot;Certificate&quot; Image
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
                          to="/dashboard/TagName/delete"
                          style={{ color: "#E16565", textDecoration: "none" }}
                        >
                          Yes,delete it!
                        </Link>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TagNameServerRouter;
