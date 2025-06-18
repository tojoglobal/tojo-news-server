import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const formatDateToLocal = (utcDate) => {
  const date = new Date(utcDate);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
};

const EditEventsPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [event, setEvent] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/events/${id}`)
      .then((result) => {
        if (result.data.Status) {
          const eventData = result.data.Result[0];
          setEvent({
            ...eventData,
            date: eventData.date ? formatDateToLocal(eventData.date) : "",
          });
          setFile(null);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, [id, state.port]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      formik.setFieldValue("file", selectedFile);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      date: event.date || "",
      file: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) errors.title = "Title is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.location) errors.location = "Location is required";
      if (!values.date) errors.date = "Date is required";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("date", values.date);
      if (values.file instanceof File) {
        formData.append("file", values.file);
      }
      try {
        const response = await axios.put(
          `${state.port}/api/admin/events/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Event updated successfully`, {
            position: "top-right",
            duration: 2000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => {
            navigate(`/dashboard/events`);
          }, 1200);
        } else {
          setErrorMessage(response.data.Error || "Failed to update event");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "An error occurred"
        );
      }
      resetForm();
    },
  });

  return (
    <div className="w-full min-h-screen px-2 md:px-8 py-8 bg-transparent text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Edit Event</h1>
      <hr className="border-[#222] opacity-20 mb-6" />
      {errorMessage && (
        <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
      )}
      <div className="mb-7">
        <Link to="/dashboard/events" className="no-underline">
          <button
            className="rounded-lg font-semibold text-base px-6 py-2 bg-[#22263a] text-white shadow-none mb-4 mr-2 transition hover:bg-blue-700"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full"
        encType="multipart/form-data"
        autoComplete="off"
      >
        <div className="flex flex-col lg:flex-row gap-7 w-full items-start">
          <div className="flex-1 min-w-[260px]">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="font-semibold text-gray-300 block mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
                className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              {formik.errors.title && (
                <div className="text-red-400 text-sm mt-1">
                  {formik.errors.title}
                </div>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="font-semibold text-gray-300 block mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
                rows="4"
                className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-y min-h-[90px]"
              />
              {formik.errors.description && (
                <div className="text-red-400 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1 mb-5">
                <label
                  htmlFor="location"
                  className="font-semibold text-gray-300 block mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  required
                  className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {formik.errors.location && (
                  <div className="text-red-400 text-sm mt-1">
                    {formik.errors.location}
                  </div>
                )}
              </div>
              <div className="flex-1 mb-5">
                <label
                  htmlFor="date"
                  className="font-semibold text-gray-300 block mb-1"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  min={today}
                  required
                  className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {formik.errors.date && (
                  <div className="text-red-400 text-sm mt-1">
                    {formik.errors.date}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[220px] max-w-[350px]">
            <div className="mb-5">
              <div className="font-semibold text-gray-400 mb-2">
                Upload Image
              </div>
              <label
                htmlFor="file"
                className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[#23263a] bg-[#22263a] text-gray-300 font-medium cursor-pointer hover:bg-blue-800 transition"
              >
                <FaCloudUploadAlt className="text-xl" />
                Upload Image
                <input
                  id="file"
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleChange}
                  accept=".jpg, .png"
                />
              </label>
            </div>
            <div>
              <div className="font-semibold text-gray-400 mb-2">
                Preview Image
              </div>
              <div className="flex items-center justify-center min-h-[120px] w-full border border-[#23263a] bg-[#181a23] rounded-lg p-2">
                {file ||
                (event.image_url &&
                  `${state.port}/Images/${event.image_url}`) ? (
                  <img
                    src={
                      file
                        ? file
                        : event.image_url
                        ? `${state.port}/Images/${event.image_url}`
                        : ""
                    }
                    alt="Event Preview"
                    className="w-full max-w-[200px] object-contain rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    No image selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg bg-[#22263a] text-white shadow-lg hover:bg-blue-700 transition"
          >
            UPDATE EVENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventsPost;
