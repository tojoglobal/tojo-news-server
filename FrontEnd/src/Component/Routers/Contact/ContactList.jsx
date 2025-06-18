import axios from "axios";
import { useEffect, useState } from "react";
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

const ContactList = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState();

  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/contactlist")
      .then((result) => {
        if (result.data.Status) {
          setContactList(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
      .delete(
        `https://api.tojoglobal.com/api/admin/contactlist/delete/` +
          dataDeleteId
      )
      .then((result) => {
        if (result.data.Status) {
          setContactList((list) =>
            list.filter((item) => item.uuid !== dataDeleteId)
          );
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

  const borderBottom = "1.5px solid #4b5563";

  return (
    <div className="p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Contact List
        </h1>
        <Link to="/dashboard/contact/create">
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
            New Contact
          </Button>
        </Link>
      </div>
      <hr className="border-gray-700 mb-6" />
      {errorMessage && (
        <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
      )}
      {faqToDelete && (
        <p className="text-green-500 font-semibold mb-3">{faqToDelete}</p>
      )}

      <div className="overflow-x-auto rounded-xl bg-[#181f33]">
        <table className="min-w-full text-sm text-left text-white">
          <thead>
            <tr className="bg-[#212b3a]">
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                SL
              </th>
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                CONTACT NAME
              </th>
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                CATEGORY
              </th>
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                MOBILE
              </th>
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                EMAIL
              </th>
              <th className="px-4 py-3 font-bold" style={{ borderBottom }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {contactList.length > 0 ? (
              contactList.map((cl, index) => (
                <tr
                  key={cl.uuid}
                  className="hover:bg-[#232e45] transition"
                  style={{ borderBottom }}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{cl.contactName}</td>
                  <td className="px-4 py-3">{cl.category}</td>
                  <td className="px-4 py-3">{cl.mobileNo}</td>
                  <td className="px-4 py-3">{cl.eamil}</td>
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
                        onClick={() => handleClickOpen(cl.uuid)}
                      >
                        Actions
                      </Button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open && dataDeleteId === cl.uuid}
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
                            Are you sure you want to delete this contact info?
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
                      <div className="mt-2 flex gap-2">
                        <Link
                          to={`/dashboard/contact/edit/${cl.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/dashboard/contact/${cl.uuid}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                        >
                          Show
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-400"
                  style={{ borderBottom }}
                >
                  No contact info found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
