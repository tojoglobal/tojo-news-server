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

const FaqServerRouter = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [faq, setFaq] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState();

  // fetch data
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/faq")
      .then((result) => {
        if (result.data.Status) {
          setFaq(result.data.Result);
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
      .delete(`https://api.tojoglobal.com/api/admin/faq/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/faq");
          setFaqToDelete(`deleted successfully`);
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
          setFaqToDelete(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>      
      <h1 className="dashboard_name">All FAQ</h1>
      <hr />
      <div className="">
        <div>
          <Link to="/dashboard/faq/create">
            <button className="button-62" role="button">
              Create FAQ
              <span>
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{faqToDelete}</p>
          <p>{errorMessage}</p>
        </div>
        {/* ++++++========part 2 =======++++++++ */}
        {/* table start */}
        <div>
          <div>
            <table id="customers" className="">
              <tr>
                <th>SL</th>
                <th>FAQ</th>
                <th>FAQ ANSWER</th>
                <th>ACTIONS</th>
              </tr>

              {faq.length > 0 &&
                faq.map((fq, index) => (
                  <tr key={fq.uuid}>
                    <td>{index + 1}</td>
                    <td>{fq.question}</td>                   
                    <td>{fq.answer}</td>                   
                    <td>
                      <div className="dropdown">
                        <button className="dropbtn">
                          Select <MdOutlineArrowDownward />
                        </button>
                        <div className="dropdown-content">
                          <Link
                            to={`/dashboard/faq/edit/${fq.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
                          </Link>
                          {/* </span> */}

                          <Link
                            to={`/dashboard/faq/${fq.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> SHOW</span>
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
                              to={`/dashboard/faq/delete`}
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
            {faq &&
              faq.map((fq) => (
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
                  <Link to={`/dashboard/faq/edit/${fq.uuid}`}>
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
                          to="/dashboard/faq/delete"
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

export default FaqServerRouter;
