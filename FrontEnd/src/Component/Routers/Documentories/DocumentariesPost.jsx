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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="text-white text-lg font-semibold tracking-wide">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
          Edit Documentaries Hero
        </h2>
        <p className="text-gray-400 text-base md:text-lg font-medium mb-1">
          Update the main banner section of Documentaries.
        </p>
        <div className="h-[3px] w-16 bg-blue-600 rounded-full mb-4" />
      </div>
      {/* Modern card style form */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto bg-white/5 border border-gray-700 rounded-2xl shadow-md px-6 py-8 space-y-8"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Upload Image Field */}
          <div className="flex-1 flex flex-col">
            <label
              htmlFor="logo"
              className="text-gray-200 font-semibold mb-2 flex items-center gap-1"
            >
              <FaCloudUploadAlt className="text-xl text-blue-400" />
              Banner Logo
            </label>
            <div className="relative">
              <label
                htmlFor="logo"
                className="flex items-center justify-center border border-gray-600 rounded-xl bg-[#151a27] h-32 cursor-pointer hover:border-blue-500 transition overflow-hidden"
                style={{ minHeight: 110 }}
              >
                {form.logoPreview ? (
                  <img
                    src={form.logoPreview}
                    alt="Logo Preview"
                    className="h-full w-auto object-contain bg-white/10"
                  />
                ) : (
                  <span className="text-gray-500 text-sm flex flex-col items-center">
                    <FaCloudUploadAlt className="text-3xl mb-1" />
                    Click to upload (JPG, PNG, JPEG)
                  </span>
                )}
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
            <span className="text-xs text-gray-400 mt-2">
              {form.logoPreview ? "Change Image" : "No image selected"}
            </span>
          </div>
          {/* Text form fields */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <label
                htmlFor="heading"
                className="block text-gray-200 font-semibold mb-2"
              >
                Heading
              </label>
              <input
                id="heading"
                className="w-full bg-[#1b2233] border border-gray-600 rounded-lg px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                name="heading"
                onChange={handleChange}
                value={form.heading}
                required
                placeholder="Enter hero heading"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-200 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full bg-[#1b2233] border border-gray-600 rounded-lg px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                name="description"
                onChange={handleChange}
                value={form.description}
                required
                rows="4"
                placeholder="Short banner description"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl shadow transition-all duration-200 text-base"
          >
            Save
          </button>
        </div>
      </form>
      <div className="mt-12">
        <FeaturedList />
      </div>
      <div className="flex justify-center mt-10">
        <Link
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all duration-200 text-base"
          to="/dashboard/documentaries/featured"
        >
          Update Featured This Week
        </Link>
      </div>
    </div>
  );
}
