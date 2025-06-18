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

  useEffect(() => {
    axios
      .get(`${state.port}/api/documentaries-featured`)
      .then((res) => setCards(res.data));
  }, [state.port]);

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
    <div className="mt-12 mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FaYoutube className="text-[#ff0000]" /> Featured News & Continue
        Watching
      </h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          {error && <div className="text-red-400 mt-2 text-sm">{error}</div>}
        </div>
        <div className="mb-5">
          <label className="block text-gray-200 font-semibold mb-2">
            Show In:
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 text-gray-100">
              <input
                type="checkbox"
                value="featured"
                checked={form.show_in.includes("featured")}
                onChange={handleCheckbox}
                className="accent-blue-500"
              />
              Featured News
            </label>
            <label className="flex items-center gap-2 text-gray-100">
              <input
                type="checkbox"
                value="continue"
                checked={form.show_in.includes("continue")}
                onChange={handleCheckbox}
                className="accent-blue-500"
              />
              Continue Watching
            </label>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer mb-3 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            {mode === "add" ? "Add Card" : "Update Card"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow transition"
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
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {cards.map((card) => (
          <div key={card.id}>
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
                  className="rounded-lg mx-auto mb-3 w-full border border-[#283250]/40 shadow"
                />
              </a>
            )}
            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={() => handleEdit(card)}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
