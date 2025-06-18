import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const EditAuthors = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({ authorName: "" });

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/author/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setAuthor({ authorName: result.data.Result[0]?.name || "" });
        } else {
          toast.error(result.data.Error || "Error fetching author", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.Error || err?.message || "Error fetching author",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  }, [id, state.port]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      authorName: author.authorName || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `${state.port}/api/admin/author/edit/${id}`,
          values
        );
        if (response.data.Status) {
          toast.success(`Category edited successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/dashboard/author");
          }, 1500);
        } else {
          toast.error(response.data.Error || "Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.Error ||
            error?.message ||
            "Something went wrong",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      resetForm();
    },
  });

  return (
    <div className="min-h-[80vh] bg-[#101829] flex flex-col items-center justify-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-lg bg-[#172133] rounded-xl shadow-lg p-8">
        <h5 className="text-sm text-gray-400 mb-2">
          <Link
            to="/dashboard/author"
            className="flex items-center gap-1 hover:underline"
          >
            <IoMdArrowRoundBack /> Back
          </Link>
        </h5>
        <h1 className="text-3xl font-bold mb-4">Edit Author Name</h1>
        <hr className="border-gray-700 mb-6" />
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium mb-2"
            >
              Author Name{" "}
              <IoStarSharp className="inline text-red-400 text-base" />
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="authorName"
              id="authorName"
              onChange={formik.handleChange}
              placeholder="Update Author Name"
              value={formik.values.authorName}
              required
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              Update Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuthors;
