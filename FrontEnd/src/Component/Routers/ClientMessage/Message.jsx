import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
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
import Pagination from "../../Pagination/Pagination";

const Message = () => {
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [setFaqToDelete] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/clientMessage")
      .then((result) => {
        if (result.data.Status) {
          setMessage(result.data.Result);
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
    setPaginatedData(message.slice(startIndex, endIndex));
  }, [currentPage, message]);

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
    console.log(dataDeleteId);
    axios
      .delete(`https://api.tojoglobal.com/api/admin/clientMessage/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/message");
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
          setMessage(message.filter(ms => ms.uuid !== dataDeleteId));
        } else {
          setFaqToDelete(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">All Client Message</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <table id="customers">
            <tr>
              <th>SL</th>
              <th>NAME</th>
              <th>SUBJECT</th>
              <th>EMAIL</th>
              <th>NUMBER</th>
              <th>MESSAGE</th>
              <th>ACTIONS</th>
            </tr>

            {paginatedData.length > 0 && 
              paginatedData.map((ms, index) => (
                <tr key={ms.uuid}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{ms.Name}</td>
                  <td>{ms.Subject}</td>
                  <td>{ms.Email}</td>
                  <td>{ms.phoneNumber}</td>
                  <td>{ms.message && ms.message.slice(0, 90) + `...`}</td>
                  <td>
                    <div className="dropdown">
                      <button className="dropbtn">
                        Select <MdOutlineArrowDownward />
                      </button>
                      <div className="dropdown-content">
                        <Link
                          to={`/dashboard/message/${ms.uuid}`}
                          className="routeLink"
                        >
                          <span className="actionBtn"> SHOW</span>
                        </Link>
                        <span
                          onClick={() => handleClickOpen(ms.uuid)}
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
                          Are you sure delete this Messages
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
                            Yes, delete it!
                          </Link>
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <Pagination
          totalItems={message.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Message;
