import axios from "axios";
import { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchAuthor = async (port, id) => {
  const res = await axios.get(`${port}/api/admin/author/${id}`);
  if (!res.data.Status || !res.data.Result[0])
    throw new Error(res.data.Error || "Author not found");
  return res.data.Result[0];
};

const updateAuthor = async ({ port, id, values }) => {
  const res = await axios.put(`${port}/api/admin/author/edit/${id}`, values);
  if (!res.data.Status)
    throw new Error(res.data.Error || "Failed to update Author");
  return res.data;
};

const EditAuthor = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch single author (for default value)
  const {
    data: author,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthor(state.port, id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (values) => updateAuthor({ port: state.port, id, values }),
    onSuccess: () => {
      toast.success("Author updated successfully");
      queryClient.invalidateQueries(["authors"]);
      setTimeout(() => navigate("/dashboard/author"), 1000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.Error || err?.message || "Failed to update Author"
      );
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      authorName: author?.name || "",
    },
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-white text-lg font-semibold tracking-wide">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-rose-300 text-lg font-semibold tracking-wide">
        {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h5 className="text-sm text-gray-400 mb-2">
        <Link
          to="/dashboard/author"
          className="flex items-center gap-1 hover:underline"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Edit Author
        </span>
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="authorName"
            className="block text-gray-200 font-semibold mb-1"
          >
            Author Name{" "}
            <IoStarSharp className="inline text-red-400 text-base" />
          </label>
          <input
            id="authorName"
            className="w-full bg-[#23263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="authorName"
            onChange={formik.handleChange}
            placeholder="Update Author Name"
            value={formik.values.authorName}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-200 text-base"
            disabled={mutation.isLoading}
          >
            Update Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAuthor;
