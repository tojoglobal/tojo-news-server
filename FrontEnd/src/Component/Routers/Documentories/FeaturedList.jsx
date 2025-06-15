/* eslint-disable no-useless-escape */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

// Helper to extract YouTube video ID
function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
  );
  return match ? match[1] : "";
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

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.youtube_url) {
      toast.error("YouTube URL is required");
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
  };

  const handleDelete = async (id) => {
    await axios.delete(`${state.port}/api/documentaries-featured/${id}`);
    setCards(cards.filter((c) => c.id !== id));
    toast.success("Deleted!");
  };

  return (
    <div className="container dashboard_All">
      <h2 className="dashboard_name">Featured News & Continue Watching</h2>
      <form onSubmit={handleSubmit} className="p-4 row">
        <div className="col-md-12 inputfield">
          <label>YouTube URL</label>
          <input
            type="text"
            name="youtube_url"
            value={form.youtube_url}
            onChange={handleChange}
            className="text_input_field"
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>
        <div className="col-md-12 inputfield">
          <label>Show In:</label> <br />
          <div
            className="flex items-center gap-3"
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="featured"
                checked={form.show_in.includes("featured")}
                onChange={handleCheckbox}
              />
              Featured News
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="continue"
                checked={form.show_in.includes("continue")}
                onChange={handleCheckbox}
              />
              Continue Watching
            </label>
          </div>
        </div>
        <div className="col-md-12 inputFiledMiddel">
          <button type="submit" className="button-62 cetificate_image_AddBtn">
            {mode === "add" ? "Add Card" : "Update Card"}
          </button>
        </div>
      </form>
      <div className="row" style={{ marginTop: 24 }}>
        {cards.map((card) => (
          <div className="col-md-4" key={card.id}>
            <div className="card" style={{ padding: 8, marginBottom: 16 }}>
              {card.youtube_url && (
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    card.youtube_url
                  )}/hqdefault.jpg`}
                  alt="YouTube thumbnail"
                  style={{
                    width: 100,
                    height: "auto",
                    borderRadius: 6,
                    display: "block",
                    margin: "12px auto 0 auto",
                  }}
                />
              )}
              <div
                className="flex items-center gap-2"
                style={{ marginTop: 12 }}
              >
                <button onClick={() => handleEdit(card)} className="button-62">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="button-62"
                  style={{ background: "#e15555" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
