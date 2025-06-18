import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreateAuthor = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      fetch(`${state.port}/api/admin/author/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(async (res) => {
        const data = await res.json();
        if (!data.Status)
          throw new Error(data.Error || "Failed to create Author");
        return data;
      }),
    onSuccess: () => {
      toast.success("Author created successfully");
      queryClient.invalidateQueries(["authors"]);
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create Author");
    },
  });

  const formik = useFormik({
    initialValues: { authorName: "" },
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Add New Author
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
            Author Name
          </label>
          <input
            id="authorName"
            className="w-full bg-[#23263a] border border-[#283250]/60 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            name="authorName"
            onChange={formik.handleChange}
            placeholder="Write Author Name"
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
            Add Author
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuthor;
