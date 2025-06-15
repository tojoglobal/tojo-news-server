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
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate(`/dashboard/events`);
          }, 1500);
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
    <div className="container dashboard_All">
      <h1 className="dashboard_name">Edit Event</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="from_div">
        <div className="btn-text-left mt-3">
          <h5>
            <Link to="/dashboard/events" className="route_link">
              Back
            </Link>
          </h5>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12 inputfield">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className="text_input_field"
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
              />
              {formik.errors.title && (
                <div className="text-danger">{formik.errors.title}</div>
              )}
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="text_input_field"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
                rows="4"
              />
              {formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                className="text_input_field"
                type="text"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                required
              />
              {formik.errors.location && (
                <div className="text-danger">{formik.errors.location}</div>
              )}
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                className="text_input_field"
                type="date"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                min={today}
                required
              />
              {formik.errors.date && (
                <div className="text-danger">{formik.errors.date}</div>
              )}
            </div>
            <div className="col-md-6 inputfield">
              <h5>Upload Image</h5>
              <div className="thumble_inputField_style">
                <label htmlFor="file">
                  Upload Image <FaCloudUploadAlt />
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".jpg, .png"
                />
              </div>
            </div>
            <div className="col-md-6 inputfield">
              <h5>Preview Image</h5>
              <img
                src={
                  file
                    ? file
                    : event.image_url
                    ? `${state.port}/Images/${event.image_url}`
                    : ""
                }
                alt="Event Preview"
                className="blog_Image"
                loading="lazy"
              />
            </div>
            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn"
                role="button"
              >
                UPDATE EVENT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventsPost;
