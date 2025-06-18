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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const Podcasts = () => {
  const { state } = useContext(AppContext);
  const [podcasts, setPodcasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Podcasts`)
      .then((result) => {
        if (result.data.Status) {
          setPodcasts(result.data.Result);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(String(err)));
  }, [state.port]);

  // matrial dialog box
  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  // dialog open/close
  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    toast.error(`Cancel`, {
      position: "top-right",
      duration: 3000,
      style: { background: "#23263a", color: "#fff" },
    });
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${state.port}/api/admin/Podcasts/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setPodcasts((prev) =>
            prev.filter((pod) => pod.uuid !== dataDeleteId)
          );
          setDeleteMessage(`Deleted successfully`);
          toast.success(`Deleted successfully`, {
            position: "top-right",
            duration: 3000,
            style: { background: "#23263a", color: "#fff" },
          });
        } else {
          setDeleteMessage(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(String(err)));

    setOpen(false);
  };

  return (
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-4xl bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">All Podcasts</h1>
          <Link to="/dashboard/Podcasts/create">
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
              New Podcast
            </Button>
          </Link>
        </div>
        <hr className="border-gray-700 mb-6" />
        {deleteMessage && (
          <div className="text-green-500 font-semibold mb-4">
            {deleteMessage}
          </div>
        )}
        <div className="overflow-x-auto rounded-xl bg-[#181f33]">
          <table className="min-w-full text-sm text-left text-white">
            <thead>
              <tr className="bg-[#212b3a]">
                <th className="px-4 py-3 font-bold">SL</th>
                <th className="px-4 py-3 font-bold">Hosted NAME</th>
                <th className="px-4 py-3 font-bold">Hosted INFO</th>
                <th className="px-4 py-3 font-bold">IMG</th>
                <th className="px-4 py-3 font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.length > 0 ? (
                podcasts.map((tm, index) => (
                  <tr key={tm.uuid} className="hover:bg-[#232e45] transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{tm.name}</td>
                    <td className="px-4 py-3">{tm.hostedInfo}</td>
                    <td className="px-4 py-3">
                      <img
                        className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                        src={`${state.port}/Images/${tm.image}`}
                        alt={tm.image}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/Podcasts/edit/${tm.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/dashboard/Podcasts/${tm.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                        >
                          Show
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            fontWeight: 600,
                            fontSize: 13,
                            minWidth: 0,
                            borderColor: "#E16565",
                            color: "#E16565",
                          }}
                          onClick={() => handleClickOpen(tm.uuid)}
                          endIcon={<MdOutlineArrowDownward />}
                        >
                          Delete
                        </Button>
                        <Dialog
                          fullScreen={fullScreen}
                          open={open && dataDeleteId === tm.uuid}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle
                            id="responsive-dialog-title"
                            className="icon_div"
                          >
                            <div style={{ textAlign: "center" }}>
                              <BsExclamationCircle className="icon" />
                              <h3 style={{ paddingTop: "20px" }}>
                                Are you sure?
                              </h3>
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Are you sure you want to delete this podcast?
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No podcasts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
