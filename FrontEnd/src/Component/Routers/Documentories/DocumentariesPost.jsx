import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import FeaturedList from "./FeaturedList";

export default function DocumentariesPost() {
  const { state } = useContext(AppContext);
  const [form, setForm] = useState({
    heading: "",
    description: "",
    logo: null,
    logoPreview: "",
    logoFilename: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${state.port}/api/documentaries-hero`)
      .then((res) => {
        if (res.data) {
          setForm((f) => ({
            ...f,
            heading: res.data.heading || "",
            description: res.data.description || "",
            logo: null,
            logoPreview: res.data.logo
              ? `${state.port}/Images/${res.data.logo}`
              : "",
            logoFilename: res.data.logo || "",
          }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [state.port]);

  const handleChange = (e) => {
    if (e.target.name === "logo" || e.target.name === "file") {
      const file = e.target.files[0];
      setForm((f) => ({
        ...f,
        logo: file,
        logoPreview: file ? URL.createObjectURL(file) : f.logoPreview,
      }));
    } else {
      setForm((f) => ({
        ...f,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("description", form.description);
    if (form.logo) {
      formData.append("logo", form.logo);
    } else if (form.logoFilename) {
      formData.append("logoFilename", form.logoFilename);
    }
    try {
      await axios.put(`${state.port}/api/documentaries-hero`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Saved!", { autoClose: 1500 });
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container dashboard_All">
      <h2 className="dashboard_name">Edit Documentaries Hero Section</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-4"
      >
        <div className="row">
          {/* Upload Image Field */}
          <div className="col-md-6 inputfield">
            <h5>Upload Logo</h5>
            <div className="thumble_inputField_style">
              <label htmlFor="logo" style={{ cursor: "pointer" }}>
                Upload Image <FaCloudUploadAlt />
              </label>
              <input
                id="logo"
                type="file"
                name="logo"
                onChange={handleChange}
                accept=".jpg, .png, .jpeg"
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* Preview */}
          <div className="col-md-6 inputfield">
            <h5>Preview Logo</h5>
            {form.logoPreview && (
              <img
                src={form.logoPreview}
                alt="Logo Preview"
                className="blog_Image"
                loading="lazy"
                style={{ maxHeight: 120, borderRadius: 8, marginTop: 8 }}
              />
            )}
          </div>
          {/* Heading */}
          <div className="col-md-12 inputfield">
            <label htmlFor="heading">Heading</label>
            <input
              id="heading"
              className="text_input_field"
              type="text"
              name="heading"
              onChange={handleChange}
              value={form.heading}
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
              onChange={handleChange}
              value={form.description}
              required
              rows="4"
            />
          </div>
          <div className="col-md-12 inputFiledMiddel">
            <button type="submit" className="button-62 cetificate_image_AddBtn">
              Save
            </button>
          </div>
        </div>
      </form>
      <FeaturedList />
      <Link
        className="featured-link-btn"
        to="/dashboard/documentaries/featured"
      >
        Update Featured This Week
      </Link>
    </div>
  );
}
