import axios from "axios";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { Editor } from "@tinymce/tinymce-react";

const CreateSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      file: "",
      is_recent: false,
    },
    onSubmit: async (values, { resetForm }) => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      const startDate = new Date(values.start_date);
      const endDate = new Date(values.end_date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (startDate < todayDate) {
        setErrorMessage("Start date cannot be in the past");
        return;
      }

      const minEndDate = new Date(startDate);
      minEndDate.setDate(minEndDate.getDate() + 1);

      if (endDate < minEndDate) {
        setErrorMessage("End date must be at least one day after start date");
        return;
      }

      const isRecent = values.is_recent === "true";
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("is_recent", isRecent.toString());
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
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Sponsored Post created successfully`, {
            position: "top-right",
            duration: 4000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => {
            navigate(`/dashboard/Sponsored`);
          }, 1200);
        } else {
          setErrorMessage(
            response.data.Error || "Failed to create sponsored post"
          );
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
    <div className="bg-[#101829] flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300 min-h-screen">
      <div className="w-full max-w-4xl bg-[#172133] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Create Sponsored Post
        </h1>
        <hr className="border-gray-700 mb-6" />
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
          autoComplete="off"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="title"
              onChange={formik.handleChange}
              placeholder="Write Title..."
              value={formik.values.title}
              required
              autoComplete="off"
            />
          </div>
          <div>
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                onChange={formik.handleChange}
                value={formik.values.start_date}
                min={today}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                onChange={formik.handleChange}
                value={formik.values.end_date}
                min={formik.values.start_date || today}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mark as Recent Article
            </label>
            <select
              name="is_recent"
              id="is_recent"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
              value={formik.values.is_recent ? "true" : "false"}
              onChange={formik.handleChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Upload Sponsored Image
              </label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1976d2] hover:bg-[#1766b6] rounded-lg cursor-pointer text-white font-semibold transition"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  <span>Upload Image</span>
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
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Preview Image
              </label>
              {file ? (
                <img
                  src={file}
                  alt="Sponsored Preview"
                  className="h-44 w-full object-cover rounded-lg border border-gray-700"
                  loading="lazy"
                />
              ) : (
                <div className="h-44 w-full flex items-center justify-center bg-[#222e3e] text-gray-500 rounded-lg border border-gray-700">
                  No image selected
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-[#1976d2] cursor-pointer hover:bg-[#1766b6] text-white font-bold py-2.5 px-8 rounded-lg shadow transition-all duration-200 text-base"
              role="button"
            >
              Create SPONSORED POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSponsoredPost;
