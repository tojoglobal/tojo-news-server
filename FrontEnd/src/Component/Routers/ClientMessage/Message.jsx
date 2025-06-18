import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
import toast from "react-hot-toast";
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
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const Message = () => {
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // For pagination
  const paginatedData = message.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/newsletteremail`)
      .then((result) => {
        if (result.data.Status) {
          setMessage(result.data.Result);
        } else {
          toast.error(result.data.Error);
        }
      })
      // .catch((err) => toast.error(String(err)));
  }, [state.port]);

  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => setOpen(false);

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
      .delete(`${state.port}/api/admin/newsletteremail/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setMessage((prev) => prev.filter((ms) => ms.uuid !== dataDeleteId));
          toast.success(`Deleted successfully`, {
            position: "top-right",
            duration: 3000,
            style: { background: "#23263a", color: "#fff" },
          });
        } else {
          toast.error(result.data.Error || "Delete failed");
        }
        setOpen(false);
      })
      .catch((err) => {
        toast.error(String(err));
        setOpen(false);
      });
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">All Client Email</h1>
      <hr className="border-gray-700 mb-6" />
      <div className="overflow-x-auto rounded-xl bg-[#181f33]">
        <table className="min-w-full text-sm text-left text-white">
          <thead>
            <tr className="bg-[#212b3a]">
              <th className="px-4 py-3 font-bold">SL</th>
              <th className="px-4 py-3 font-bold">EMAIL</th>
              <th className="px-4 py-3 font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((ms, index) => (
                <tr key={ms.uuid} className="hover:bg-[#232e45] transition">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">{ms.email}</td>
                  <td className="px-4 py-3">
                    <div className="relative inline-block text-left">
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<MdOutlineArrowDownward />}
                        sx={{
                          color: "#b2c8f9",
                          borderColor: "#324266",
                          fontWeight: 600,
                          fontSize: 13,
                          px: 1.5,
                          py: 0.5,
                          minWidth: 0,
                        }}
                        onClick={() => handleClickOpen(ms.uuid)}
                      >
                        Actions
                      </Button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open && dataDeleteId === ms.uuid}
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
                              Are You sure?
                            </h3>
                          </div>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this email?
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
                <td colSpan={3} className="text-center py-8 text-gray-400">
                  No email found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={message.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Message;
