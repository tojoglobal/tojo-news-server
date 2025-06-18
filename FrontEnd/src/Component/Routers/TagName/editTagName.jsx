import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const EditTagName = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [tagValue, setTagValue] = useState("");

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/TagName/${id}`)
      .then((res) => {
        if (res.data.Status && res.data.Result && res.data.Result[0]) {
          setTagValue(res.data.Result[0].name);
        } else {
          setErrorMessage(res.data.Error || "Tag not found");
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, [id, state.port]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      TagName: tagValue || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `${state.port}/api/admin/TagName/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success("Tag updated successfully", {
            position: "top-right",
            duration: 3000,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/dashboard/TagName");
          }, 1500);
        } else {
          setErrorMessage(response.data.Error || "Failed to update Tag");
        }
      } catch (error) {
        setErrorMessage(error?.response?.data?.Error || error.message);
      }
      resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Edit Tag
        </span>
      </h2>
      <p className="text-gray-400 text-base mb-4">Update this tag name.</p>
      {errorMessage && (
        <div className="mb-3 text-red-500 bg-red-100 rounded px-3 py-2 text-sm">
          {errorMessage}
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="TagName"
            className="block text-gray-200 font-semibold mb-1"
          >
            Tag Name
          </label>
          <input
            id="TagName"
            className="w-full bg-[#23263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="TagName"
            onChange={formik.handleChange}
            placeholder="Update Tag Name"
            value={formik.values.TagName}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-200 text-base"
          >
            Update Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTagName;
