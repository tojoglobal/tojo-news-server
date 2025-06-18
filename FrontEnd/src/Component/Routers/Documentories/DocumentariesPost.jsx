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

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Edit Documentaries Hero Section
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Image Field */}
          <div>
            <h5 className="font-semibold text-gray-300 mb-2">Upload Logo</h5>
            <label
              htmlFor="logo"
              className="cursor-pointer inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 bg-[#22283f] hover:bg-[#1b1f2e] rounded-md px-4 py-2 transition"
            >
              <FaCloudUploadAlt className="text-xl" />
              <span>Upload Image</span>
              <input
                id="logo"
                type="file"
                name="logo"
                onChange={handleChange}
                accept=".jpg, .png, .jpeg"
                className="hidden"
              />
            </label>
          </div>
          {/* Preview */}
          <div>
            <h5 className="font-semibold text-gray-300 mb-2">Preview Logo</h5>
            {form.logoPreview ? (
              <img
                src={form.logoPreview}
                alt="Logo Preview"
                className="rounded-lg shadow-md max-h-32 mt-2 mx-auto"
                loading="lazy"
              />
            ) : (
              <div className="text-gray-500 italic mt-3">No image selected</div>
            )}
          </div>
        </div>
        <div className="mt-7">
          <label
            htmlFor="heading"
            className="block text-gray-200 font-semibold mb-2"
          >
            Heading
          </label>
          <input
            id="heading"
            className="w-full bg-[#1a1e2c] border border-[#283250]/50 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="heading"
            onChange={handleChange}
            value={form.heading}
            required
          />
        </div>
        <div className="mt-7">
          <label
            htmlFor="description"
            className="block text-gray-200 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full bg-[#1a1e2c] border border-[#283250]/50 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            name="description"
            onChange={handleChange}
            value={form.description}
            required
            rows="4"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            Save
          </button>
        </div>
      </form>
      <FeaturedList />
      <div className="flex justify-center mt-8">
        <Link
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          to="/dashboard/documentaries/featured"
        >
          Update Featured This Week
        </Link>
      </div>
    </div>
  );
}
