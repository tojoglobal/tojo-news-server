import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const CreateSponsoredPost = () => {
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
      sponsor_id: "",
      start_date: "",
      end_date: "",
      file: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("sponsor_id", values.sponsor_id);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("file", values.file);

      try {
        const response = await axios.post(
          `${state.port}/api/admin/Sponsored/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response); // Debug log
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Sponsored Post created successfully`, {
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
            navigate(`/dashboard/Sponsored`);
          }, 1500);
        } else {
          // Handle case where backend returns Status: false
          setErrorMessage(
            response.data.Error || "Failed to create sponsored post"
          );
        }
      } catch (error) {
        console.error("API Error:", error.response || error); // Detailed error logging
        setErrorMessage(
          error.response?.data?.Error ||
            error.message ||
            "An error occurred while creating the sponsored post"
        );
      }

      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h1 className="dashboard_name">Create Sponsored Post</h1>
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
                placeholder="Write Title..."
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
                placeholder="Write Description..."
                value={formik.values.description}
                required
                rows="4"
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="sponsor_id">Sponsor ID (optional)</label>
              <input
                id="sponsor_id"
                className="text_input_field"
                type="text"
                name="sponsor_id"
                onChange={formik.handleChange}
                placeholder="Sponsor ID..."
                value={formik.values.sponsor_id}
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="start_date">Start Date</label>
              <input
                id="start_date"
                className="text_input_field"
                type="date"
                name="start_date"
                onChange={formik.handleChange}
                value={formik.values.start_date}
                required
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="end_date">End Date</label>
              <input
                id="end_date"
                className="text_input_field"
                type="date"
                name="end_date"
                onChange={formik.handleChange}
                value={formik.values.end_date}
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
              <img
                src={file ? file : "https://i.postimg.cc/KzNdw0LX/Group.png"}
                alt="Sponsored Post Preview"
                className="blog_Image"
                loading="lazy"
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                CREATE SPONSORED POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSponsoredPost;
