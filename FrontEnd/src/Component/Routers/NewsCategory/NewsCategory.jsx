import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
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

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [NewsCategory, setNewsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState();
  const [openDropdownId, setOpenDropdownId] = useState(null); // <--- NEW

  // For closing dropdown on outside click
  const dropdownRefs = useRef({});

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
  }, [state.port]);

  // material dialog box
  const themes = useTheme();
  const fullScreen = useMediaQuery(themes.breakpoints.down("md"));

  // Dialog box open and close
  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    toast.error(`Cancel`);
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${state.port}/api/admin/newsCategory/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          setFaqToDelete(`deleted successfully`);
          toast.success(`deleted successfully`);
          setNewsCategory((prev) =>
            prev.filter((c) => c.uuid !== dataDeleteId)
          );
        } else {
          setFaqToDelete(result.data.Error);
        }
      })
      .catch((err) => console.error(err));

    setOpen(false);
  };

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openDropdownId !== null &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId].contains(event.target)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">News Category</h1>
      <hr className="mb-6 border-gray-700" />
      {errorMessage && (
        <div className="my-4 text-red-400 bg-red-900/30 px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <Link to="/dashboard/newscategory/create">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow transition">
            <span>New Category</span>
            <HiPlus className="text-lg" />
          </button>
        </Link>
        <p className="text-green-400 text-sm">{faqToDelete}</p>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-[#23263a] to-[#22283f] border border-[#2c324b]/60">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead>
            <tr className="bg-[#23263a]">
              <th className="py-3 px-4">SL</th>
              <th className="py-3 px-4">NEWS CATEGORY</th>
              <th className="py-3 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {NewsCategory.length > 0 ? (
              NewsCategory.map((cl, index) => (
                <tr key={cl.uuid} className="hover:bg-[#293455]/40 transition">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{cl.name}</td>
                  <td className="py-2 px-4">
                    <div
                      className="relative inline-block"
                      ref={(el) => (dropdownRefs.current[cl.uuid] = el)}
                    >
                      <button
                        className="flex items-center gap-1 bg-gray-700 hover:bg-blue-600 px-3 py-1.5 rounded-md font-semibold shadow transition text-white"
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === cl.uuid ? null : cl.uuid
                          )
                        }
                        type="button"
                      >
                        Select <MdOutlineArrowDownward className="text-base" />
                      </button>
                      {openDropdownId === cl.uuid && (
                        <div className="absolute left-0 top-full mt-2 z-10 min-w-[120px] bg-[#212639] border border-[#2c324b]/60 rounded-md shadow-lg animate-fadeIn">
                          <Link
                            to={`/dashboard/newscategory/edit/${cl.uuid}`}
                            className="block px-4 py-2 hover:bg-blue-700 hover:text-white transition text-sm cursor-pointer"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleClickOpen(cl.uuid)}
                            className="w-full text-left px-4 py-2 hover:bg-red-700 hover:text-white transition text-sm cursor-pointer"
                          >
                            DELETE
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Delete confirmation dialog */}
                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle
                        id="responsive-dialog-title"
                        className="flex flex-col items-center gap-2"
                      >
                        <BsExclamationCircle className="text-4xl text-yellow-400 mb-2" />
                        <span className="text-lg font-bold">Are you sure?</span>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText className="text-gray-700">
                          Are you sure you want to delete this news category?
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-5 px-4 text-center text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsCategory;
