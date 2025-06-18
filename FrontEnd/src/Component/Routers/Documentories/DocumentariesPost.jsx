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
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
            Edit Documentaries Hero
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg font-medium mb-1">
          Update the main banner section of Documentaries.
        </p>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full mb-2" />
      </div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-[#181c2f] rounded-2xl shadow-2xl p-5 md:p-10 border border-[#292f45] transition"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Image Field */}
          <div>
            <h5 className="font-semibold text-gray-300 mb-2 tracking-wide">
              Upload Logo
            </h5>
            <label
              htmlFor="logo"
              className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-500/40 bg-[#21263a] hover:bg-[#23263a] rounded-lg min-h-[110px] px-4 py-4 transition group"
            >
              <FaCloudUploadAlt className="text-3xl text-blue-400 group-hover:text-blue-500 transition" />
              <span className="text-blue-400 group-hover:text-blue-500 font-semibold text-sm">
                {form.logoPreview ? "Change Image" : "Upload Image"}
              </span>
              <input
                id="logo"
                type="file"
                name="logo"
                onChange={handleChange}
                accept=".jpg, .png, .jpeg"
                className="hidden"
              />
            </label>
            <span className="block text-xs text-gray-400 mt-2 ml-1">
              (Accepted: .jpg, .png, .jpeg)
            </span>
          </div>
          {/* Preview */}
          <div className="flex flex-col items-center">
            <h5 className="font-semibold text-gray-300 mb-2 tracking-wide">
              Preview Logo
            </h5>
            {form.logoPreview ? (
              <img
                src={form.logoPreview}
                alt="Logo Preview"
                className="rounded-xl shadow-lg border-2 border-[#20284e] max-h-32 mt-2 object-contain bg-white/10"
                loading="lazy"
              />
            ) : (
              <div className="text-gray-500 italic mt-3 text-center border border-dashed border-gray-600 rounded-lg p-4 w-full min-h-[80px] flex items-center justify-center">
                No image selected
              </div>
            )}
          </div>
        </div>
        <div className="mt-7">
          <label
            htmlFor="heading"
            className="block text-gray-200 font-bold mb-2 tracking-wide"
          >
            Heading
          </label>
          <input
            id="heading"
            className="w-full bg-[#20263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="heading"
            onChange={handleChange}
            value={form.heading}
            required
            placeholder="Enter hero heading"
            autoComplete="off"
          />
        </div>
        <div className="mt-7">
          <label
            htmlFor="description"
            className="block text-gray-200 font-bold mb-2 tracking-wide"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full bg-[#20263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            name="description"
            onChange={handleChange}
            value={form.description}
            required
            rows="4"
            placeholder="Short banner description"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white cursor-pointer font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all duration-200 text-base"
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
          className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all duration-200 text-base"
          to="/dashboard/documentaries/featured"
        >
          Update Featured This Week
        </Link>
      </div>
    </div>
  );
}
