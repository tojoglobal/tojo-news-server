import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateMemberFirm = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  // state
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // image file handle
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  // formik setup
  const formik = useFormik({
    initialValues: {
      ImageTitle: "",
      file: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("ImageTitle", values.ImageTitle);
      formData.append("file", values.file);
      try {
        const response = await axios.post(
          `${state.port}/api/admin/member/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setSuccessMessage("File uploaded successfully!");
          setErrorMessage(null);
          setTimeout(() => navigate("/dashboard/member"), 1200);
        }
      } catch (error) {
        setErrorMessage("Error uploading file. Please try again.");
        setSuccessMessage(null);
      }
      resetForm();
    },
  });

  return (
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-xl bg-[#172133] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Create Member Image
        </h1>
        <hr className="border-gray-700 mb-6" />
        {successMessage && (
          <div className="text-green-500 font-semibold mb-3">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-3">{errorMessage}</div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="ImageTitle"
              className="block text-sm font-medium mb-2"
            >
              Firm Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="ImageTitle"
              id="ImageTitle"
              onChange={formik.handleChange}
              placeholder="Firm Name"
              value={formik.values.ImageTitle}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="file">
              Upload Image <FaCloudUploadAlt className="inline ml-2" />
            </label>
            <input
              id="file"
              type="file"
              name="file"
              className="block w-full text-sm text-white bg-[#212b3a] border border-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              accept=".jpg, .png"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              Add
            </button>
          </div>
        </form>
        <hr className="border-gray-700 my-6" />
        <h5 className="mb-3 font-semibold">Firm Member Image Preview</h5>
        <div className="flex justify-center">
          {file ? (
            <img
              src={file}
              alt="Preview"
              className="rounded-lg border border-gray-700 object-cover h-40 w-40"
            />
          ) : (
            <span className="text-gray-400">No image selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMemberFirm;
