import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const EditNewsCategory = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/newsCategory/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setCategoryName(result.data.Result[0].name);
        }
      })
      .catch((err) => toast.error(err.message));
  }, [id, state.port]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: categoryName || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `${state.port}/api/admin/newsCategory/edit/${id}`,
          values
        );
        if (response.data.Status) {
          toast.success(`Category updated successfully`);
          navigate(-1);
        }
      } catch (error) {
        console.log(error.message);
      }
      resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h5 className="text-sm text-gray-400 mb-2">
        <Link
          to="/dashboard/newscategory"
          className="flex items-center gap-1 hover:underline"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Edit News Category
        </span>
      </h2>
      <hr className="border-gray-700 mb-6" />
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
            placeholder="Edit News Category"
            value={formik.values.categoryName}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-200 text-base"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNewsCategory;
