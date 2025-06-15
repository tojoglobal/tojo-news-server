import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

export default function AdminFeaturedThisWeek() {
  const { state } = useContext(AppContext);
  const API = `${state.port}/api/featured-this-week`;
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    link: "",
    image: null,
    preview: "",
    imageFilename: "",
  });
  const [mode, setMode] = useState("add");

  useEffect(() => {
    axios.get(API).then((res) => setNews(res.data));
  }, [API]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({
      ...f,
      image: file,
      preview: file ? URL.createObjectURL(file) : f.preview,
    }));
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("link", form.link);
    if (form.image) formData.append("image", form.image);
    if (mode === "edit" && form.imageFilename && !form.image)
      formData.append("imageFilename", form.imageFilename);

    try {
      if (mode === "add") {
        await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Added!");
      } else {
        await axios.put(`${API}/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Updated!");
      }
      setForm({
        id: null,
        title: "",
        link: "",
        image: null,
        preview: "",
        imageFilename: "",
      });
      setMode("add");
      const res = await axios.get(API);
      setNews(res.data);
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title,
      link: item.link,
      image: null,
      preview: `${state.port}/Images/${item.image}`,
      imageFilename: item.image,
    });
    setMode("edit");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    setNews(news.filter((n) => n.id !== id));
    toast.success("Deleted!");
  };

  return (
    <div className="container dashboard_All">
      <h2 className="dashboard_name">Featured This Week</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-4 row"
      >
        <div className="col-md-6 inputfield">
          <h5>Upload Image</h5>
          <div className="thumble_inputField_style">
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              Upload Image <FaCloudUploadAlt />
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleFile}
              accept=".jpg,.png,.jpeg"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="col-md-6 inputfield">
          <h5>Preview Image</h5>
          {form.preview && (
            <img
              src={form.preview}
              alt="Preview"
              className="blog_Image"
              loading="lazy"
              style={{ maxHeight: 120, borderRadius: 8, marginTop: 8 }}
            />
          )}
        </div>
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
          <label>Link</label>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
            className="text_input_field"
            required
          />
        </div>
        <div className="col-md-12 inputFiledMiddel">
          <button type="submit" className="button-62 cetificate_image_AddBtn">
            {mode === "add" ? "Add Card" : "Update Card"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  id: null,
                  title: "",
                  link: "",
                  image: null,
                  preview: "",
                  imageFilename: "",
                });
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
        {news.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card" style={{ padding: 8, marginBottom: 16 }}>
              <img
                src={`${state.port}/Images/${item.image}`}
                alt=""
                style={{
                  width: 100,
                  height: "auto",
                  borderRadius: 6,
                  display: "block",
                  margin: "12px auto 0 auto",
                }}
              />
              <div style={{ marginTop: 8, fontWeight: 600 }}>{item.title}</div>
              <div style={{ margin: "6px 0" }}>{item.link}</div>
              <div
                className="flex items-center gap-2"
                style={{ marginTop: 12 }}
              >
                <button onClick={() => handleEdit(item)} className="button-62">
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
        ))}
      </div>
    </div>
  );
}
