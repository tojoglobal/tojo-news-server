import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const EditTeamMember = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [teamMember, setTeamMember] = useState([]);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/teamMember/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setTeamMember({
            ...teamMember,
            name: result.data.Result[0].name,
            positionName: result.data.Result[0].position,
            check: result.data.Result[0].checkbox,
            BioData: result.data.Result[0].BioData,
            facebookName: result.data.Result[0].FBurl,
            youtubeName: result.data.Result[0].YTurl,
            linkedinName: result.data.Result[0].LIurl,
            twitterName: result.data.Result[0].TWurl,
            WhatsAppNumber: result.data.Result[0].WhatsApurl,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: teamMember.name || "",
      positionName: teamMember.positionName || "",
      check: teamMember.check || "",
      BioData: teamMember.BioData || "",
      facebookName: teamMember.facebookName || "",
      youtubeName: teamMember.youtubeName || "",
      linkedinName: teamMember.linkedinName || "",
      twitterName: teamMember.twitterName || "",
      WhatsAppNumber: teamMember.WhatsAppNumber || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `${state.port}/api/admin/teamMember/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Team member Edit successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const delay = 2000;
          const timer = setTimeout(() => {
            navigate(`/dashboard/teamMember`);
          }, delay);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }
      resetForm();
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h5 className="text-sm text-gray-400 mb-2">
        /dashboard/teamMember/edit/
      </h5>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Edit Team Member Data
      </h1>
      <hr className="mb-6" />
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-6">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Write Member name..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          {/* Position field */}
          <div>
            <label
              htmlFor="position"
              className="block text-gray-700 font-semibold mb-1"
            >
              Position
            </label>
            <input
              id="position"
              name="positionName"
              type="text"
              placeholder="Write Member Position..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              value={formik.values.positionName}
            />
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
              initialValue={formik.values.BioData}
              onEditorChange={(content) => {
                formik.setFieldValue("BioData", content);
              }}
              apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
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
          {/* Facebook URL */}
          <div>
            <label
              htmlFor="facebookName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Facebook URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://facebook.com/
              </span>
              <input
                id="facebookName"
                name="facebookName"
                type="text"
                placeholder="xyzName"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.facebookName}
              />
            </div>
          </div>
          {/* YouTube URL */}
          <div>
            <label
              htmlFor="youtubeName"
              className="block text-gray-700 font-semibold mb-1"
            >
              YouTube URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://www.youtube.com/
              </span>
              <input
                id="youtubeName"
                name="youtubeName"
                type="text"
                placeholder="@xyzName"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.youtubeName}
              />
            </div>
          </div>
          {/* Linkedin URL */}
          <div>
            <label
              htmlFor="linkedinName"
              className="block text-gray-700 font-semibold mb-1"
            >
              Linkedin URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://www.linkedin.com/in/
              </span>
              <input
                id="linkedinName"
                name="linkedinName"
                type="text"
                placeholder="xyzName"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.linkedinName}
              />
            </div>
          </div>
          {/* Twitter URL */}
          <div>
            <label
              htmlFor="twitterName"
              className="block text-gray-700 font-semibold mb-1"
            >
              xTwitter URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://twitter.com/
              </span>
              <input
                id="twitterName"
                name="twitterName"
                type="text"
                placeholder="xyzName"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.twitterName}
              />
            </div>
          </div>
          {/* WhatsApp URL */}
          <div>
            <label
              htmlFor="WhatsAppNumber"
              className="block text-gray-700 font-semibold mb-1"
            >
              WhatsApp URL
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 bg-gray-100 text-gray-600 text-sm">
                https://wa.me/
              </span>
              <input
                id="WhatsAppNumber"
                name="WhatsAppNumber"
                type="number"
                placeholder="8801602555023"
                className="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.WhatsAppNumber}
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition font-semibold shadow"
              role="button"
            >
              EDIT MEMBER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTeamMember;
