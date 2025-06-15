import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const NewsCategory = () => {
  const { state } = useContext(AppContext);
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [NewsCategory, setNewsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState();

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/newsCategory`)
      .then((result) => {
        if (result.data.Status) {
          setNewsCategory(result.data.Result);
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
    axios
      .delete(`${state.port}/api/admin/newsCategory/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/newscategory");
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
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">News Category </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>
        <div>
          <Link to="/dashboard/newscategory/create">
            <button className="button-62" role="button">
              New Category
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
            <table id="customers" className="">
              <tr>
                <th>SL</th>
                <th>NEWS CATEGORY</th>
                {/* <th>ON BEHALF</th> */}
                <th>ACTIONS</th>
              </tr>

              {NewsCategory.length > 0 &&
                NewsCategory.map((cl, index) => (
                  <tr key={cl.uuid}>
                    <td>{index + 1}</td>
                    <td>{cl.name}</td>

                    {/* <td>
                      {cl.OnBehalf === "Complainant" ? (
                        <span className="complainant">{cl.OnBehalf}</span>
                      ) : (
                        <span className="defendant">{cl.OnBehalf}</span>
                      )}
                    </td> */}
                    <td>
                      <div className="dropdown">
                        <button className="dropbtn">
                          Select <MdOutlineArrowDownward />
                        </button>
                        <div className="dropdown-content">
                          <Link
                            to={`/dashboard/newscategory/edit/${cl.uuid}`}
                            className="routeLink"
                          >
                            <span className="actionBtn"> Edit</span>
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
                              to={`/dashboard/newscategory/delete`}
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

export default NewsCategory;
