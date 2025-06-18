import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateTagName = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      axios
        .post(`${state.port}/api/admin/TagName/create`, values)
        .then((res) => res.data),
    onSuccess: (res) => {
      if (res.Status) {
        toast.success("Tag created successfully");
        queryClient.invalidateQueries(["TagNames"]);
        setTimeout(() => navigate("/dashboard/TagName"), 1000);
      } else {
        toast.error(res.Error || "Failed to create Tag");
      }
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.Error || err?.message || "Failed to create Tag"
      );
    },
  });

  const formik = useFormik({
    initialValues: { TagName: "" },
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-[#181c2f] rounded-2xl p-8 shadow-2xl border border-[#23263a] mt-10">
      <h2 className="text-3xl font-bold text-white mb-2">
        <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          Add New Tag
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
            placeholder="Write Tag Name"
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
            Add Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTagName;
