/* eslint-disable no-useless-escape */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";
import { FaYoutube, FaEdit, FaTrash } from "react-icons/fa";

// Helper to extract YouTube video ID
function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
  );
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

export default function FeaturedList() {
  const { state } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    id: null,
    youtube_url: "",
    show_in: ["featured"], // default
  });
  const [mode, setMode] = useState("add");
  const [error, setError] = useState("");

  // Fetch cards
  useEffect(() => {
    axios
      .get(`${state.port}/api/documentaries-featured`)
      .then((res) => setCards(res.data));
  }, [state.port]);

  // Handlers
  const handleCheckbox = (e) => {
    const value = e.target.value;
    setForm((f) => {
      let updated = [...f.show_in];
      if (e.target.checked) {
        if (!updated.includes(value)) updated.push(value);
      } else {
        updated = updated.filter((v) => v !== value);
      }
      return { ...f, show_in: updated };
    });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "youtube_url") setError(""); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.youtube_url) {
      setError("YouTube URL is required");
      toast.error("YouTube URL is required");
      return;
    }
    if (!isValidYouTubeUrl(form.youtube_url)) {
      setError("Please enter a valid YouTube URL.");
      toast.error("Please enter a valid YouTube URL.");
      return;
    }
    const payload = {
      youtube_url: form.youtube_url,
      show_in: form.show_in.join(","),
    };
    try {
      if (mode === "add") {
        await axios.post(`${state.port}/api/documentaries-featured`, payload);
        toast.success("Card Added!");
      } else {
        await axios.put(
          `${state.port}/api/documentaries-featured/${form.id}`,
          payload
        );
        toast.success("Card Updated!");
      }
      setForm({
        id: null,
        youtube_url: "",
        show_in: ["featured"],
      });
      setMode("add");
      setError("");
      const res = await axios.get(`${state.port}/api/documentaries-featured`);
      setCards(res.data);
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleEdit = (card) => {
    setForm({
      id: card.id,
      youtube_url: card.youtube_url,
      show_in: card.show_in ? card.show_in.split(",") : [],
    });
    setMode("edit");
    setError("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${state.port}/api/documentaries-featured/${id}`);
    setCards(cards.filter((c) => c.id !== id));
    toast.success("Deleted!");
  };

  return (
    <section className="mt-12 mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <FaYoutube className="text-[#ff3c3c] text-3xl drop-shadow-lg" />
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-pink-500 bg-clip-text text-transparent">
            Featured News & Continue Watching
          </span>
        </h2>
      </div>
      <p className="text-sm text-gray-400 italic mt-1 mb-6">
        Showcase featured & continue watching videos with style!
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#181c2f] border border-[#283250]/40 rounded-2xl shadow-lg p-6 mb-12"
      >
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
            placeholder="https://www.youtube.com/watch?v=..."
            required
            autoComplete="off"
          />
          {error && (
            <div className="text-red-400 mt-2 text-sm font-medium">{error}</div>
          )}
        </div>
        <div className="mb-5">
          <label className="block text-gray-200 font-semibold mb-2">
            Show In:
          </label>
          <div className="flex gap-8 mt-2">
            <label className="flex cursor-pointer items-center gap-2 text-gray-100 font-medium">
              <input
                type="checkbox"
                value="featured"
                checked={form.show_in.includes("featured")}
                onChange={handleCheckbox}
                className="accent-blue-500 scale-110"
              />
              Featured News
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-gray-100 font-medium">
              <input
                type="checkbox"
                value="continue"
                checked={form.show_in.includes("continue")}
                onChange={handleCheckbox}
                className="accent-blue-500 scale-110"
              />
              Continue Watching
            </label>
          </div>
        </div>
        <div className="flex gap-4 mt-7">
          <button
            type="submit"
            className="flex-1 cursor-pointer bg-gradient-to-r from-blue-600 to-pink-400 hover:from-blue-700 hover:to-pink-500 text-white font-bold py-2.5 rounded-lg shadow-lg transition-all duration-150 text-base tracking-wide"
          >
            {mode === "add" ? "Add Card" : "Update Card"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 rounded-xl shadow-lg transition"
              onClick={() => {
                setForm({ id: null, youtube_url: "", show_in: ["featured"] });
                setMode("add");
                setError("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards?.map((card) => (
          <div
            key={card.id}
            className="rounded-md bg-gradient-to-br from-[#222643] via-[#191c33] to-[#23263a] border border-[#273050]/50 shadow-xl hover:shadow-2xl transition-all p-4 flex flex-col items-center group relative"
          >
            {card.youtube_url && (
              <a
                href={card.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    card.youtube_url
                  )}/hqdefault.jpg`}
                  alt="YouTube thumbnail"
                  className="rounded-lg mx-auto mb-4 w-full border border-[#283250]/40 shadow-lg group-hover:scale-105 transition-transform"
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </a>
            )}
            <div className="flex justify-center gap-2 mt-1">
              <button
                onClick={() => handleEdit(card)}
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white cursor-pointer px-4 py-1.5 rounded-lg font-semibold shadow transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white cursor-pointer px-4 py-1.5 rounded-lg font-semibold shadow transition"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex gap-1 absolute top-1 right-1">
              {card.show_in?.includes("featured") && (
                <span className="bg-blue-600/80 text-xs text-white rounded px-2 py-0.5 shadow font-semibold">
                  F
                </span>
              )}
              {card.show_in?.includes("continue") && (
                <span className="bg-pink-500/80 text-xs text-white rounded px-2 py-0.5 shadow font-semibold">
                  C
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
