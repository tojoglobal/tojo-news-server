import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const EditEpisodes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [Episodes, setEpisodes] = useState({});
  const [file, setFile] = useState(null);
  const [PodcastsAuthor, setPodcastsAuthor] = useState([]);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Episodes/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEpisodes(result.data.Result[0]);
          if (result.data.Result[0].audioFile) {
            setFile(`${state.port}/Audio/${result.data.Result[0].audioFile}`);
          }
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
  }, [id, state.port]);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Podcasts`)
      .then((result) => {
        if (result.data.Status) {
          setPodcastsAuthor(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((error) => setErrorMessage(String(error)));
  }, [state.port]);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: Episodes.title || "",
      PodcastPovider: Episodes.podcastID || "",
      file: Episodes.audioFile || "",
      episodesInfo: Episodes.episodesInfo || "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("PodcastPovider", values.PodcastPovider);
      formData.append("episodesInfo", values.episodesInfo);
      formData.append("file", values.file);

      try {
        const response = await axios.put(
          `${state.port}/api/admin/Episodes/edit/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success("Episode updated successfully", {
            position: "top-right",
            duration: 3000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => navigate(`/dashboard/Episodes`), 1300);
        } else {
          setErrorMessage("Internal Server Error");
        }
      } catch (error) {
        setErrorMessage("Axios request failed");
      }

      resetForm();
    },
  });

  return (
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[#172133] rounded-xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Edit Episode</h1>
        <hr className="border-gray-700 mb-6" />
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="title"
              onChange={formik.handleChange}
              placeholder="Write Title..."
              value={formik.values.title}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="PodcastPovider"
              className="block text-sm font-medium mb-2"
            >
              Podcast Provider
            </label>
            <select
              name="PodcastPovider"
              id="PodcastPovider"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
              value={formik.values.PodcastPovider}
              onChange={(e) =>
                formik.setFieldValue("PodcastPovider", e.target.value)
              }
              required
            >
              <option value="">Choose Provider Name</option>
              {PodcastsAuthor.map((auth) => (
                <option value={auth.ID} key={auth.uuid}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Upload Audio
              </label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer text-white font-semibold transition"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  <span>Upload Audio</span>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChange}
                    accept=".mp3, .wav, .ogg"
                  />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Listen Episode
              </label>
              {file ? (
                <audio controls className="w-full mt-1">
                  <source src={file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <img
                  src="https://i.postimg.cc/1R73y3NC/Designer.jpg"
                  alt="Tojo News audio listing Image"
                  className="h-40 w-full object-cover rounded-lg border border-gray-700"
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Write Episode Info
            </label>
            <Editor
              apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
              id="episodesInfo"
              textareaName="episodesInfo"
              initialValue={formik.values.episodesInfo}
              value={formik.values.episodesInfo}
              onEditorChange={(content) => {
                formik.setFieldValue("episodesInfo", content);
              }}
              init={{
                height: 350,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo |fullscreen blocks|" +
                  "bold italic forecolor fontsize |code link image preview| alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | table | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size: 1rem;  color: #3f3e3e; }",
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              UPDATE EPISODE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEpisodes;
