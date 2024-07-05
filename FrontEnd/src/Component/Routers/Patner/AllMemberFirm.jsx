import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
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
// import { useTheme } from "@mui/material/styles";
import { BsExclamationCircle } from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllMemberFirm = () => {
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  // all state
  const [open, setOpen] = useState(false);
  const [firmMemberToDelete, setFirmMemberToDelete] = useState();
  const [member, setMember] = useState([]);
  const [dataDeleteId, setDataDeleteId] = useState(null);

  // matrial dialog box
  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  // memember data get method
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/member")
      .then((result) => {
        if (result.data.Status) {
          setMember(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
  };

  const handleDelete = () => {
    if (dataDeleteId) {
      axios
        .delete(`https://api.tojoglobal.com/api/admin/member/delete/${dataDeleteId}`)
        .then((result) => {
          if (result.data.Status) {
            toast.success(`${dataDeleteId} deleted successfully`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setFirmMemberToDelete("deleted successfully");
            navigate("/dashboard/member");
          } else {
            setFirmMemberToDelete(result.data.Error);
          }
        })
        .catch((err) => console.error(err));
    }
    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">All Member</h1>
      <hr />
      <div className="dashboard_certificate_list">
        <div>
          <Link to="/dashboard/member/create">
            <button className="button-62" role="button">
              Create Member{" "}
              <span>
                <HiPlus />
              </span>
            </button>
          </Link>
          <p className="success-message">{firmMemberToDelete}</p>
        </div>
        {/* ++++++========part 2 =======++++++++ */}
        <div className="certificate_list">
          <ol>
            {member.map((im) => (
              <li key={im.uuid}>
                <img
                  className="cetificate_image"
                  src={`https://api.tojoglobal.com/Images/${im.img}`}
                  alt={im.imageTitle}
                />
                <span style={{ marginLeft: "30px", color: "#01b5e8" }}>
                  {im.imageTitle}
                </span>
                <button
                  className="button-62 cetificate_image_deleteBtn"
                  role="button"
                  onClick={() => handleClickOpen(im.uuid)}
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
                        to="/dashboard/member/delete"
                        style={{ color: "#E16565", textDecoration: "none" }}
                      >
                        Yes,delete it!
                      </Link>
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AllMemberFirm;
