/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const EditSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [SponsoredPost, setSponsoredPost] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Sponsored/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setSponsoredPost(result.data.Result[0]);
          setFile(
            result.data.Result[0].image_url
              ? `${state.port}/Images/${result.data.Result[0].image_url}`
              : null
          );
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: SponsoredPost.title || "",
      description: SponsoredPost.description || "",
      sponsor_id: SponsoredPost.sponsor_id || "",
      start_date: SponsoredPost.start_date || "",
      end_date: SponsoredPost.end_date || "",
      file: SponsoredPost.image_url || "",
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
        }
      } catch (error) {
        setErrorMessage(`${error}`);
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
                />
              </div>
            </div>

            <div className="col-md-6 inputfield">
              <h5>Preview Image</h5>
              <img
                src={
                  file
                    ? file
                    : SponsoredPost.image_url
                    ? `${state.port}/Images/${SponsoredPost.image_url}`
                    : "https://i.postimg.cc/KzNdw0LX/Group.png"
                }
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
                UPDATE SPONSORED POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSponsoredPost;
