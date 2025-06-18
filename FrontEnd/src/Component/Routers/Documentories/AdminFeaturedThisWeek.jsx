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
    if (!form.title) {
      setError("Title is required.");
      return;
    }
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
        toast.success("Video Added!");
      } else {
        await axios.put(`${API}/${form.id}`, payload);
        toast.success("Video Updated!");
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
    <section className="w-full p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
          <FaYoutube className="text-[#ff0000] text-3xl drop-shadow-lg" />
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
            Featured This Week
          </span>
        </h2>
        <span className="text-sm text-gray-400 italic mt-1 md:mt-0">
          Add or manage this week&apos;s top YouTube news!
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#181c2f] border border-[#283250]/40 rounded-2xl shadow-lg p-6 mb-12"
      >
        <div className="mb-5">
          <label className="block text-gray-200 font-semibold mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#1a1e2c] border border-[#283250]/50 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            placeholder="Video Title"
            autoComplete="off"
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
            } rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            required
            placeholder="https://www.youtube.com/watch?v=..."
            autoComplete="off"
          />
          {error && (
            <div className="text-red-400 mt-2 text-sm font-medium">{error}</div>
          )}
        </div>
        <div className="flex gap-4 mt-7">
          <button
            type="submit"
            className="flex-1 cursor-pointer bg-gradient-to-r from-blue-600 to-pink-400 hover:from-blue-700 hover:to-pink-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition-all duration-150 text-base tracking-wide"
          >
            {mode === "add" ? "Add Video" : "Update Video"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 rounded-xl shadow-lg transition"
              onClick={() => {
                setForm({ id: null, title: "", youtube_url: "" });
                setMode("add");
                setError("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
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
            <div
              key={item.id}
              className="rounded-2xl bg-gradient-to-br from-[#222643] via-[#191c33] to-[#23263a] border border-[#273050]/50 shadow-xl hover:shadow-2xl transition-all p-4 flex flex-col items-center group relative"
            >
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
                  className="rounded-lg mx-auto mb-3 w-full border border-[#283250]/40 shadow-lg group-hover:scale-105 transition-transform"
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </a>
              <h3 className="font-semibold text-lg text-white mb-2 text-center w-full truncate">
                {item.title}
              </h3>
              <div className="flex justify-center gap-2 mt-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white cursor-pointer px-4 py-1.5 rounded-lg font-semibold shadow transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white cursor-pointer px-4 py-1.5 rounded-lg font-semibold shadow transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
