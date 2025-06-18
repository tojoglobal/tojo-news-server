import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { IoStarSharp } from "react-icons/io5";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateNewsCategory = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${state.port}/api/admin/newsCategory/create`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Category created successfully`);
          setTimeout(() => navigate("/dashboard/newscategory"), 1200);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }
      resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Add News Category
        </span>
      </h2>
      <hr className="border-gray-700 mb-6" />
      {errorMessage && (
        <div className="text-red-400 bg-red-900/30 px-4 py-2 rounded mb-5">
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
            htmlFor="categoryName"
            className="block text-gray-200 font-semibold mb-2"
          >
            Category Name{" "}
            <IoStarSharp className="inline text-red-400 text-base" />
          </label>
          <input
            id="categoryName"
            className="w-full bg-[#23263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="categoryName"
            onChange={formik.handleChange}
            placeholder="Write News Category"
            value={formik.values.categoryName}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-200 text-base"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewsCategory;
