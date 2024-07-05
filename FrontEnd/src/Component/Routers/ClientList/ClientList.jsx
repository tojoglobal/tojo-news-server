import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Country, State } from "country-state-city";

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

const ClientList = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // fetch data
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/clientlist")
      .then((result) => {
        if (result.data.Status) {
          setClientList(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, []);

  // matrial dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // dialog box open and close function
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
  };

  const handleDelete = () => {
    axios
      .delete(`https://api.tojoglobal.com/api/admin/clientlist/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/client");
          setFaqToDelete(`Deleted successfully`);
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
          setFaqToDelete(result.data.Error);
        }
      })
      .catch((err) => setFaqToDelete(err.message));

    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Client List</h1>
      <hr />
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div>
        <div>
          <Link to="/dashboard/client/create">
            <button className="button-62" role="button">
              New Client
              <span>
                {" "}
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{faqToDelete}</p>
        </div>
        {/* ++++++========part 3 =======++++++++ */}
        <div>
          <div>
            <table id="customers">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>CLIENT NAME</th>
                  <th>CONTACT</th>
                  <th>CATEGORY</th>
                  <th>ADDRESS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {clientList.length > 0 ? (
                  clientList.map((cl, index) => (
                    <tr key={cl.uuid}>
                      <td>{index + 1}</td>
                      <td>{cl.clientName}</td>
                      <td>
                        Mobile: {cl.clientmobile}
                        <br />
                        Email: {cl.clientemail}
                      </td>
                      <td>{cl.clientCategory}</td>
                      <td>
                        {cl.clientAddress} <br /> {cl.clientCity} ,{" "}
                        {State.getStateByCodeAndCountry(
                          cl.clientStateCode,
                          cl.clientCountryCode
                        )
                          ? State.getStateByCodeAndCountry(
                              cl.clientStateCode,
                              cl.clientCountryCode
                            ).name
                          : ""}
                        ,{" "}
                        {Country.getCountryByCode(cl.clientCountryCode)
                          ? Country.getCountryByCode(cl.clientCountryCode).name
                          : ""}{" "}
                      </td>
                      <td>
                        <div className="dropdown">
                          <button className="dropbtn">
                            Select <MdOutlineArrowDownward />
                          </button>
                          <div className="dropdown-content">
                            <Link
                              to={`/dashboard/client/edit/${cl.uuid}`}
                              className="routeLink"
                            >
                              <span className="actionBtn"> Edit</span>
                            </Link>

                            <Link
                              to={`/dashboard/client/${cl.uuid}`}
                              className="routeLink"
                            >
                              <span className="actionBtn"> SHOW</span>
                            </Link>

                            <span
                              onClick={() => handleClickOpen(cl.uuid)}
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
                              Are you sure delete this client Info
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
                                to={`/dashboard/client/delete`}
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
                  ))
                ) : (
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <td></td>
                    <td></td>
                    <td>
                      <p style={{ color: "#828BB2", textAlign: "end", paddingTop: "0.9rem" }}>
                        No data available in table
                      </p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* table */}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
