import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchTagName = async (port, id) => {
  const res = await axios.get(`${port}/api/admin/TagName/${id}`);
  if (!res.data.Status || !res.data.Result[0])
    throw new Error(res.data.Error || "Tag not found");
  return res.data.Result[0];
};

const updateTagName = async ({ port, id, values }) => {
  const res = await axios.put(`${port}/api/admin/TagName/edit/${id}`, values);
  if (!res.data.Status)
    throw new Error(res.data.Error || "Failed to update Tag");
  return res.data;
};

const EditTagName = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch single tag (for default value)
  const {
    data: tag,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["TagName", id],
    queryFn: () => fetchTagName(state.port, id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (values) => updateTagName({ port: state.port, id, values }),
    onSuccess: () => {
      toast.success("Tag updated successfully");
      queryClient.invalidateQueries(["TagNames"]);
      setTimeout(() => navigate("/dashboard/TagName"), 1000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.Error || err?.message || "Failed to update Tag"
      );
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      TagName: tag?.name || "",
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
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Edit Tag
        </span>
      </h2>
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
            placeholder="Edit Tag Name"
            value={formik.values.TagName}
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
            Update Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTagName;
