import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";
import { FaYoutube, FaEdit, FaTrash } from "react-icons/fa";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

// Helper to validate YouTube URL
function isValidYouTubeUrl(url) {
  if (!url) return false;
  // Accepts: https://youtu.be/xxx, https://www.youtube.com/watch?v=xxx, https://youtube.com/shorts/xxx etc.
  return (
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url) &&
    !!extractYouTubeId(url)
  );
}

export default function AdminFeaturedThisWeek() {
  const { state } = useContext(AppContext);
  const API = `${state.port}/api/featured-this-week`;
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    id: null,
    title: "",
    youtube_url: "",
  });
  const [mode, setMode] = useState("add");
  const [error, setError] = useState("");

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["admin-featured-this-week"],
    queryFn: async () => {
      const res = await axios.get(API);
      return res.data;
    },
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "youtube_url") setError(""); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidYouTubeUrl(form.youtube_url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    const payload = {
      title: form.title,
      youtube_url: form.youtube_url,
    };

    try {
      if (mode === "add") {
        await axios.post(API, payload);
        toast.success("Added!");
      } else {
        await axios.put(`${API}/${form.id}`, payload);
        toast.success("Updated!");
      }
      setForm({
        id: null,
        title: "",
        youtube_url: "",
      });
      setMode("add");
      setError("");
      queryClient.invalidateQueries(["admin-featured-this-week"]);
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title,
      youtube_url: item.youtube_url,
    });
    setMode("edit");
    setError("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.success("Deleted!");
    queryClient.invalidateQueries(["admin-featured-this-week"]);
  };

  return (
    <div className="w-full px-2 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
        <FaYoutube className="inline mr-2 text-[#ff0000]" /> Featured This Week
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-200 font-semibold mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#1a1e2c] border border-[#283250]/50 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            placeholder="Video Title"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-200 font-semibold mb-2">
            YouTube URL <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="youtube_url"
            value={form.youtube_url}
            onChange={handleChange}
            className={`w-full bg-[#1a1e2c] border ${
              error ? "border-red-500" : "border-[#283250]/50"
            } rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            required
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {error && <div className="text-red-400 mt-2 text-sm">{error}</div>}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer mb-3 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            {mode === "add" ? "Add" : "Update"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => {
                setForm({ id: null, title: "", youtube_url: "" });
                setMode("add");
                setError("");
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-300">
            Loading...
          </div>
        ) : news.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
            No featured videos yet.
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id}>
              <a
                href={item.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    item.youtube_url
                  )}/hqdefault.jpg`}
                  alt={item.title}
                  className="rounded-lg mx-auto mb-3 w-full border border-[#283250]/40 shadow"
                />
              </a>
              <h3 className="font-semibold text-lg text-white mb-2">
                {item.title}
              </h3>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
