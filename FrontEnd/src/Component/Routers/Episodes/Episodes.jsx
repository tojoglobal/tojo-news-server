import axios from "axios";
import { useEffect, useState, useContext } from "react";
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
import Pagination from "../../Pagination/Pagination";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const Episodes = () => {
  const { state } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [episodesToDelete, setEpisodesToDelete] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Episodes`)
      .then((result) => {
        if (result.data.Status) {
          setEpisodes(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
  }, [state.port]);

  const paginatedData = episodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      .delete(`${state.port}/api/admin/Episodes/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setEpisodes((list) =>
            list.filter((item) => item.uuid !== dataDeleteId)
          );
          setEpisodesToDelete(`Deleted successfully`);
          toast.success(`Deleted successfully`, {
            position: "top-right",
            duration: 3000,
            style: { background: "#23263a", color: "#fff" },
          });
        } else {
          setEpisodesToDelete(result.data.Error);
        }
      })
      .catch((err) => setEpisodesToDelete(String(err)));

    setOpen(false);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">All Episodes</h1>
        <Link to="/dashboard/Episodes/create">
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
            Create Episode
          </Button>
        </Link>
      </div>
      <hr className="border-gray-700 mb-6" />
      {errorMessage && (
        <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
      )}
      {episodesToDelete && (
        <p className="text-green-500 font-semibold mb-3">{episodesToDelete}</p>
      )}
      <div className="overflow-x-auto rounded-xl bg-[#181f33]">
        <table className="min-w-full text-sm text-left text-white">
          <thead>
            <tr className="bg-[#212b3a]">
              <th className="px-4 py-3 font-bold">SL</th>
              <th className="px-4 py-3 font-bold">TITLE</th>
              <th className="px-4 py-3 font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((bgPost, index) => (
                <tr key={bgPost.uuid} className="hover:bg-[#232e45] transition">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">{bgPost.title}</td>
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
                        onClick={() => handleClickOpen(bgPost.uuid)}
                      >
                        Actions
                      </Button>
                      <div className="mt-2 flex gap-2">
                        <Link
                          to={`/dashboard/Episodes/edit/${bgPost.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/dashboard/Episodes/${bgPost.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                        >
                          Show
                        </Link>
                      </div>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open && dataDeleteId === bgPost.uuid}
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
                            Are you sure you want to delete this episode?
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
                  No episodes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={episodes.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Episodes;
