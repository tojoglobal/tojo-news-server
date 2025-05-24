/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

// ✅ Helper function to convert UTC date to local yyyy-mm-dd
const formatDateToLocal = (utcDate) => {
  const date = new Date(utcDate);
  const offset = date.getTimezoneOffset(); // in minutes
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
};

const EditSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [SponsoredPost, setSponsoredPost] = useState({});
  const [file, setFile] = useState(null); // for preview of new image only

  // Fetch data from DB
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Sponsoredbyid/${id}`)
      .then((result) => {
        if (result.data.Status) {
          const post = result.data.Result[0];
          setSponsoredPost({
            ...post,
            start_date: post.start_date
              ? formatDateToLocal(post.start_date)
              : "",
            end_date: post.end_date ? formatDateToLocal(post.end_date) : "",
          });
          setFile(null); // no new file selected initially
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle image change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // preview new image
      formik.setFieldValue("file", selectedFile); // store file in formik
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: SponsoredPost.title || "",
      description: SponsoredPost.description || "",
      start_date: SponsoredPost.start_date || "",
      end_date: SponsoredPost.end_date || "",
      file: "",
      is_recent: SponsoredPost.is_recent ? true : false,
    },
    validate: (values) => {
      const errors = {};
      if (values.start_date < today) {
        errors.start_date = "Start date cannot be before today";
      }
      if (values.end_date <= values.start_date) {
        errors.end_date = "End date must be after start date";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("is_recent", values.is_recent ? "true" : "false");

      // Append file only if a new file is selected
      if (values.file instanceof File) {
        formData.append("file", values.file);
      }

      try {
        const response = await axios.put(
          `${state.port}/api/admin/Sponsored/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Sponsored Post updated successfully`, {
            position: "top-right",
            autoClose: 5000,
          });
          setTimeout(() => {
            navigate(`/dashboard/Sponsored`);
          }, 1500);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "Update failed"
        );
      }

      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h1 className="dashboard_name">Edit Sponsored Post</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="from_div">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="row">
            {/* Title */}
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
            </div>

            {/* Description */}
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
            </div>

            {/* Start Date */}
            <div className="col-md-6 inputfield">
              <label htmlFor="start_date">Start Date</label>
              <input
                id="start_date"
                className="text_input_field"
                type="date"
                name="start_date"
                onChange={formik.handleChange}
                value={formik.values.start_date}
                min={today}
                required
              />
              {formik.errors.start_date && (
                <div className="text-danger">{formik.errors.start_date}</div>
              )}
            </div>

            {/* End Date */}
            <div className="col-md-6 inputfield">
              <label htmlFor="end_date">End Date</label>
              <input
                id="end_date"
                className="text_input_field"
                type="date"
                name="end_date"
                onChange={formik.handleChange}
                value={formik.values.end_date}
                min={formik.values.start_date || today}
                required
              />
              {formik.errors.end_date && (
                <div className="text-danger">{formik.errors.end_date}</div>
              )}
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="is_recent">Mark as Recent Article</label>
              <select
                id="is_recent"
                className="text_input_field"
                name="is_recent"
                onChange={(e) => {
                  formik.setFieldValue("is_recent", e.target.value === "true");
                }}
                value={formik.values.is_recent ? "true" : "false"}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            {/* Image Upload */}
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

            {/* Preview Image */}
            <div className="col-md-6 inputfield">
              <h5>Preview Image</h5>
              <img
                src={
                  file
                    ? file
                    : SponsoredPost.image_url
                    ? `${state.port}/Images/${SponsoredPost.image_url}`
                    : ""
                }
                alt="Sponsored Post Preview"
                className="blog_Image"
                loading="lazy"
              />
            </div>

            {/* Submit Button */}
            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn"
                role="button"
              >
                UPDATE SPONSORED
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSponsoredPost;
