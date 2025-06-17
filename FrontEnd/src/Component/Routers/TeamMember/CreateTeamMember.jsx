import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateTeamMember = () => {
  const { state } = useContext(AppContext);
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      positionName: "",
      file: "",
      check: false,
      BioData: "",
      facebookName: "",
      youtubeName: "",
      linkedinName: "",
      twitterName: "",
      WhatsAppNumber: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("positionName", values.positionName);
      formData.append("file", values.file);
      formData.append("check", values.check);
      formData.append("BioData", values.BioData);
      formData.append("facebookName", values.facebookName);
      formData.append("youtubeName", values.youtubeName);
      formData.append("linkedinName", values.linkedinName);
      formData.append("twitterName", values.twitterName);
      formData.append("WhatsAppNumber", values.WhatsAppNumber);
      try {
        const response = await axios.post(
          `${state.port}/api/admin/teamMember/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Team member Create successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate(`/dashboard/teamMember`);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }

      resetForm();
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg">
      <h5 className="text-sm text-gray-400 mb-2">{isHomePageRoute}</h5>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Create Team Member
      </h1>
      <hr className="mb-6" />
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name
            </label>
            <input
              placeholder="Write Member name..."
              id="name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />
          </div>
          {/* Position */}
          <div>
            <label
              htmlFor="position"
              className="block text-gray-700 font-semibold mb-1"
            >
              Position
            </label>
            <input
              placeholder="Write Member Position..."
              id="position"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="positionName"
              onChange={formik.handleChange}
              value={formik.values.positionName}
              required
            />
          </div>
          {/* Image Upload */}
          <div>
            <h5 className="font-semibold text-gray-700 mb-1">
              Upload Member image
            </h5>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div>
                <label
                  htmlFor="file"
                  className="block text-gray-700 font-semibold mb-1 flex items-center gap-2 cursor-pointer"
                >
                  Upload image <FaCloudUploadAlt />
                </label>
                <input
                  aria-describedby="basic-addon3"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".jpg, .png"
                  required
                />
              </div>
              <div>
                <img
                  src={file ? file : "https://i.postimg.cc/KzNdw0LX/Group.png"}
                  alt="blog_Image"
                  className="w-24 h-24 object-cover rounded shadow"
                />
              </div>
            </div>
          </div>
          {/* Bio Editor */}
          <div>
            <label
              htmlFor="BioData"
              className="block text-gray-700 font-semibold mb-1"
            >
              Member Bio
            </label>
            <Editor
              id="BioData"
              textareaName="BioData"
              initialValue="Get Start ..."
              onEditorChange={(content) => {
                formik.setFieldValue("BioData", content);
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
          {/* Facebook */}
          <div>
            <label
              htmlFor="facebookName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Facebook UserName
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://facebook.com/
              </span>
              <input
                placeholder="xyzName"
                id="facebookName"
                name="facebookName"
                aria-describedby="basic-addon4"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.facebookName}
              />
            </div>
            {formik.values.facebookName && (
              <div className="mt-1 text-xs text-gray-500">
                <small>example </small>
                <a
                  href={`https://facebook.com/${formik.values.facebookName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  https://facebook.com/{formik.values.facebookName}
                </a>
              </div>
            )}
          </div>
          {/* Youtube */}
          <div>
            <label
              htmlFor="youtubeName"
              className="block text-gray-700 font-semibold mb-1"
            >
              YouTube UserName
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://www.youtube.com/
              </span>
              <input
                name="youtubeName"
                onChange={formik.handleChange}
                value={formik.values.youtubeName}
                placeholder="@xyzName"
                id="youtubeName"
                aria-describedby="basic-addon5"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formik.values.youtubeName && (
              <div className="mt-1 text-xs text-gray-500">
                <small>example </small>
                <a
                  href={`https://www.youtube.com/${formik.values.youtubeName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  https://www.youtube.com/{formik.values.youtubeName}
                </a>
              </div>
            )}
          </div>
          {/* Linkedin */}
          <div>
            <label
              htmlFor="linkedinName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Linkedin UserName
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://www.linkedin.com/in/
              </span>
              <input
                name="linkedinName"
                onChange={formik.handleChange}
                value={formik.values.linkedinName}
                placeholder="xyzName"
                id="linkedinName"
                aria-describedby="basic-addon6"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formik.values.linkedinName && (
              <div className="mt-1 text-xs text-gray-500">
                <small>example </small>
                <a
                  href={`https://www.linkedin.com/in/${formik.values.linkedinName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  https://www.linkedin.com/in/{formik.values.linkedinName}
                </a>
              </div>
            )}
          </div>
          {/* Twitter */}
          <div>
            <label
              htmlFor="twitterName"
              className="block text-gray-700 font-semibold mb-1"
            >
              xTwitter UserName
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://twitter.com/
              </span>
              <input
                name="twitterName"
                onChange={formik.handleChange}
                value={formik.values.twitterName}
                placeholder="xyzName"
                id="twitterName"
                aria-describedby="basic-addon7"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formik.values.twitterName && (
              <div className="mt-1 text-xs text-gray-500">
                <small>example </small>
                <a
                  href={`https://twitter.com/${formik.values.twitterName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  https://twitter.com/{formik.values.twitterName}
                </a>
              </div>
            )}
          </div>
          {/* WhatsApp */}
          <div>
            <label
              htmlFor="WhatsAppNumber"
              className="block text-gray-700 font-semibold mb-1"
            >
              WhatsApp Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://wa.me/
              </span>
              <input
                name="WhatsAppNumber"
                onChange={formik.handleChange}
                value={formik.values.WhatsAppNumber}
                placeholder="8801602555023"
                id="WhatsAppNumber"
                type="number"
                aria-describedby="basic-addon9"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formik.values.WhatsAppNumber && (
              <div className="mt-1 text-xs text-gray-500">
                <small>example </small>
                <a
                  href={`https://wa.me/${formik.values.WhatsAppNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  https://wa.me/{formik.values.WhatsAppNumber}
                </a>
              </div>
            )}
          </div>
          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition font-semibold shadow"
              role="button"
            >
              ADD NEW MEMBER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamMember;
