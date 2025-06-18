import axios from "axios";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { Editor } from "@tinymce/tinymce-react"; // Import Editor

const CreateEventsPost = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const today = new Date().toISOString().split("T")[0];

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
            duration: 2000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => {
            navigate(`/dashboard/events`);
          }, 1200);
        } else {
          setErrorMessage(response.data.Error || "Failed to create event");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "An error occurred"
        );
      }
      resetForm();
      setFile(null);
    },
  });

  return (
    <div className="w-full min-h-screen px-2 md:px-8 py-8 bg-transparent text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Event</h1>
      <hr className="border-[#222] opacity-20 mb-6" />
      {errorMessage && (
        <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full"
        encType="multipart/form-data"
        autoComplete="off"
      >
        <div className="flex flex-col lg:flex-row gap-7 w-full">
          {/* Left Side Inputs */}
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
                placeholder="Event Title..."
                value={formik.values.title}
                required
                className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            {/* Description with TinyMCE */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Editor
                apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
                id="description"
                textareaName="description"
                initialValue=""
                value={formik.values.description}
                onEditorChange={(content) => {
                  formik.setFieldValue("description", content);
                }}
                init={{
                  height: 250,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |fullscreen blocks|" +
                    "bold italic forecolor fontsize |code link image preview| alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | table | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size: 1rem;  color: #3f3e3e; }",
                }}
              />
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
                  placeholder="Event Location..."
                  value={formik.values.location}
                  required
                  className="w-full p-3 rounded-lg bg-[#181c2f] border border-[#23263a] text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
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
              </div>
            </div>
          </div>
          {/* Right Side Upload/Preview */}
          <div className="flex-1 min-w-[220px] max-w-[350px]">
            <div className="mb-5">
              <div className="font-semibold text-gray-400 mb-2">
                Upload Image
              </div>
              <label
                htmlFor="file"
                className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[#23263a] bg-[#22263a] text-gray-300 font-medium cursor-pointer hover:bg-[#1976d2] transition"
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
                  required
                />
              </label>
            </div>
            <div>
              <div className="font-semibold text-gray-400 mb-2">
                Preview Image
              </div>
              <div className="flex items-center justify-center min-h-[120px] w-full border border-[#23263a] bg-[#181a23] rounded-lg p-2">
                {file ? (
                  <img
                    src={file}
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
            className="w-full bg-[#1976d2] cursor-pointer hover:bg-[#1766b6] text-white font-bold py-2.5 px-8 rounded-lg shadow transition-all duration-200 text-base"
          >
            CREATE EVENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventsPost;
