import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeaturedList() {
  const { state } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    id: null,
    image: null,
    link: "",
    preview: "",
    imageFilename: "",
    show_in: ["featured"], // default
  });
  const [mode, setMode] = useState("add");

  useEffect(() => {
    axios
      .get(`${state.port}/api/documentaries-featured`)
      .then((res) => setCards(res.data));
  }, [state.port]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({
      ...f,
      image: file,
      preview: file ? URL.createObjectURL(file) : f.preview,
    }));
  };

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
    const formData = new FormData();
    formData.append("link", form.link);
    if (form.image) formData.append("image", form.image);
    if (mode === "edit" && form.imageFilename && !form.image)
      formData.append("imageFilename", form.imageFilename);
    formData.append("show_in", form.show_in.join(","));
    try {
      if (mode === "add") {
        await axios.post(`${state.port}/api/documentaries-featured`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Card Added!");
      } else {
        await axios.put(
          `${state.port}/api/documentaries-featured/${form.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Card Updated!");
      }
      setForm({
        id: null,
        image: null,
        link: "",
        preview: "",
        imageFilename: "",
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
      image: null,
      link: card.link,
      preview: `${state.port}/Images/${card.image}`,
      imageFilename: card.image,
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
      <ToastContainer />
      <h2 className="dashboard_name">Featured News & Continue Watching</h2>
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
              <img
                src={`${state.port}/Images/${card.image}`}
                alt=""
                style={{
                  width: 100,
                  height: "auto",
                  borderRadius: 6,
                  display: "block",
                  margin: "12px auto 0 auto",
                }}
              />
              <div style={{ marginTop: 8 }}>{card.link}</div>
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
