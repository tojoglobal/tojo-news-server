import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { BsExclamationCircle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const AllMemberFirm = () => {
  const { state } = useContext(AppContext);
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
      .get(`${state.port}/api/admin/member`)
      .then((result) => {
        if (result.data.Status) {
          setMember(result.data.Result);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(String(err)));
  }, [state.port]);

  // diolog box open and cloge function
  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => setOpen(false);

  // data delete and cancel function
  const handleCancel = () => {
    toast.error(`Cancel`, {
      position: "top-right",
      duration: 3000,
      style: { background: "#23263a", color: "#fff" },
    });
    setOpen(false);
  };

  const handleDelete = () => {
    if (dataDeleteId) {
      axios
        .delete(`${state.port}/api/admin/member/delete/${dataDeleteId}`)
        .then((result) => {
          if (result.data.Status) {
            toast.success(`Deleted successfully`, {
              position: "top-right",
              duration: 3000,
              style: { background: "#23263a", color: "#fff" },
            });
            setFirmMemberToDelete("Deleted successfully");
            setMember((prev) => prev.filter((m) => m.uuid !== dataDeleteId));
          } else {
            setFirmMemberToDelete(result.data.Error);
            console.log(result.data.Error);
          }
        })
        .catch((err) => console.log(String(err)));
    }
    setOpen(false);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">All Members</h1>
        <Link to="/dashboard/member/create">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HiPlus />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
              px: 2,
              py: 0.8,
              boxShadow: 1,
              minWidth: 0,
            }}
          >
            Create Member
          </Button>
        </Link>
      </div>
      <hr className="border-gray-700 mb-6" />
      <p className="text-green-500 font-semibold mb-3">{firmMemberToDelete}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {member.length > 0 ? (
          member.map((im) => (
            <div
              key={im.uuid}
              className="flex flex-col items-center bg-[#181f33] rounded-xl p-5 shadow-md relative"
            >
              <img
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-400"
                src={`${state.port}/Images/${im.img}`}
                alt={im.imageTitle}
              />
              <span className="mt-4 mb-2 font-semibold text-lg text-[#01b5e8]">
                {im.imageTitle}
              </span>
              <button
                className="inline-flex cursor-pointer items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition mt-2"
                onClick={() => handleClickOpen(im.uuid)}
              >
                Delete
              </button>
              <Dialog
                fullScreen={fullScreen}
                open={open && dataDeleteId === im.uuid}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title" className="icon_div">
                  <div style={{ textAlign: "center" }}>
                    <BsExclamationCircle className="icon" />
                    <h3 style={{ paddingTop: "20px" }}>Are you sure?</h3>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this member?
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
                  <Button
                    onClick={handleDelete}
                    autoFocus
                    style={{ color: "#E16565" }}
                  >
                    Yes, delete it!
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 col-span-full py-16">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMemberFirm;
