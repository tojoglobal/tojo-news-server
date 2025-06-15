import axios from "axios";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateEventsPost = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      file: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (
        !values.title ||
        !values.description ||
        !values.location ||
        !values.date ||
        !values.file
      ) {
        setErrorMessage("All fields are required");
        return;
      }
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("date", values.date);
      formData.append("file", values.file);

      try {
        const response = await axios.post(
          `${state.port}/api/admin/events/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Event created successfully`, {
            position: "top-right",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate(`/dashboard/events`);
          }, 1500);
        } else {
          setErrorMessage(response.data.Error || "Failed to create event");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "An error occurred"
        );
      }
      resetForm();
    },
  });

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container dashboard_All">
      <h1 className="dashboard_name">Create Event</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="from_div">
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
                placeholder="Event Title..."
                value={formik.values.title}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="text_input_field"
                name="description"
                onChange={formik.handleChange}
                placeholder="Event Description..."
                value={formik.values.description}
                required
                rows="4"
              />
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                className="text_input_field"
                type="text"
                name="location"
                onChange={formik.handleChange}
                placeholder="Event Location..."
                value={formik.values.location}
                required
              />
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
                  required
                />
              </div>
            </div>
            <div className="col-md-6 inputfield">
              <h5>Preview Image</h5>
              {file && (
                <img
                  src={file}
                  alt="Event Preview"
                  className="blog_Image"
                  loading="lazy"
                />
              )}
            </div>
            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                CREATE EVENT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventsPost;
