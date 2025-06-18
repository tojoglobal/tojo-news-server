import { useContext, useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import Pagination from "../../Pagination/Pagination";

const fetchBlogPosts = async (port) => {
  const response = await axios.get(`${port}/api/admin/blogpost`);
  if (!response.data.Status)
    throw new Error(response.data.Error || "Failed to fetch blog posts");
  return response.data.Result;
};

const deleteBlogPost = async ({ port, uuid }) => {
  const response = await axios.delete(
    `${port}/api/admin/blogpost/delete/${uuid}`
  );
  if (!response.data.Status)
    throw new Error(response.data.Error || "Failed to delete blog post");
  return response.data;
};

const BlogPost = () => {
  const { state } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  // React Query: fetch blog posts
  const {
    data: blogpost = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogpost"],
    queryFn: () => fetchBlogPosts(state.port),
  });

  // Show toast for query error (once)
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch blog posts");
    }
  }, [error]);

  // Mutation: delete blog post by uuid
  const mutation = useMutation({
    mutationFn: (uuid) => deleteBlogPost({ port: state.port, uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogpost"]);
      toast.success("Blog post deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete blog post");
    },
  });

  // Pagination logic for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = blogpost.slice(startIndex, startIndex + itemsPerPage);

  // Delete confirmation with SweetAlert2
  const handleDelete = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#E16565",
      cancelButtonText: "Cancel",
      background: "#101829",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(uuid);
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#101829] flex flex-col px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          <Link to="/dashboard/blogpost/create">
            <button className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
              Create News Post <HiPlus className="text-lg" />
            </button>
          </Link>
        </div>
        <hr className="border-gray-700 mb-6" />
        <div className="overflow-x-auto rounded-xl bg-[#172133]">
          <table className="min-w-full text-sm text-left text-white">
            <thead>
              <tr className="bg-[#212b3a]">
                <th className="px-4 py-3 font-bold">SL</th>
                <th className="px-4 py-3 font-bold">TITLE</th>
                <th className="px-4 py-3 font-bold">BLOG THUMBLE</th>
                <th className="px-4 py-3 font-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((bgPost, index) => (
                  <tr
                    key={bgPost.uuid}
                    className="hover:bg-[#232e45] transition"
                  >
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="px-4 py-3">{bgPost.title}</td>
                    <td className="px-4 py-3">
                      <img
                        className="h-14 w-14 object-cover rounded-lg border border-gray-700"
                        src={`${state.port}/Images/${bgPost.thumble}`}
                        alt={bgPost.thumble}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-1 justify-center">
                        <Link
                          to={`/dashboard/blogpost/edit/${bgPost.uuid}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                          title="Edit"
                        >
                          <MdEdit className="text-lg" /> Edit
                        </Link>
                        <Link
                          to={`/dashboard/blogpost/${bgPost.uuid}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                          title="Show"
                        >
                          <MdRemoveRedEye className="text-lg" /> Show
                        </Link>
                        <button
                          onClick={() => handleDelete(bgPost.uuid)}
                          className="inline-flex cursor-pointer items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
                          title="Delete"
                        >
                          <MdDelete className="text-lg" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    No blog posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Pagination
            totalItems={blogpost.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
