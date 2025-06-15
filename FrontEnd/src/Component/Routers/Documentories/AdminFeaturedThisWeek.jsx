import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
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

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["admin-featured-this-week"],
    queryFn: async () => {
      const res = await axios.get(API);
      return res.data;
    },
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.success("Deleted!");
    queryClient.invalidateQueries(["admin-featured-this-week"]);
  };

  return (
    <div className="container dashboard_All">
      <h2 className="dashboard_name">Featured This Week</h2>
      <form onSubmit={handleSubmit} className="p-4 row">
        <div className="col-md-12 inputfield">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="text_input_field"
            required
          />
        </div>
        <div className="col-md-12 inputfield">
          <label>YouTube URL</label>
          <input
            type="text"
            name="youtube_url"
            value={form.youtube_url}
            onChange={handleChange}
            className="text_input_field"
            required
          />
        </div>
        <div className="col-md-12 inputFiledMiddel">
          <button type="submit" className="button-62 cetificate_image_AddBtn">
            {mode === "add" ? "Add" : "Update"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => {
                setForm({ id: null, title: "", youtube_url: "" });
                setMode("add");
              }}
              className="button-62"
              style={{ background: "#e15555", marginLeft: 10 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="row" style={{ marginTop: 24 }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          news.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card" style={{ padding: 8, marginBottom: 16 }}>
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    item.youtube_url
                  )}/hqdefault.jpg`}
                  alt=""
                  style={{
                    width: 100,
                    height: "auto",
                    borderRadius: 6,
                    display: "block",
                    margin: "12px auto 0 auto",
                  }}
                />
                <div style={{ marginTop: 8, fontWeight: 600 }}>
                  {item.title}
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ marginTop: 12 }}
                >
                  <button
                    onClick={() => handleEdit(item)}
                    className="button-62"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="button-62"
                    style={{ background: "#e15555" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
