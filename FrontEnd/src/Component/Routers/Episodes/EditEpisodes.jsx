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
  const [Author, setAuthor] = useState([]);
  const [PodcastsAuthor, setPodcastsAuthor] = useState([]);

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/Episodes/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEpisodes(result.data.Result[0]);
          setFile(`${state.port}/Audio/${result.data.Result[0].audioFile}`);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, PodcastsAuthorResponse] = await Promise.all([
          axios.get(`${state.port}/api/admin/author`),
          axios.get(`${state.port}/api/admin/Podcasts`),
        ]);

        if (authorResponse.data.Status) {
          setAuthor(authorResponse.data.Result);
        } else {
          setErrorMessage(authorResponse.data.Error);
        }

        if (PodcastsAuthorResponse.data.Status) {
          setPodcastsAuthor(PodcastsAuthorResponse.data.Result);
        } else {
          setErrorMessage(PodcastsAuthorResponse.data.Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(`${error}`);
      }
    };

    fetchData();
  }, []);

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
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.Status) {
          setErrorMessage(null);
          toast.success("Edit successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const delay = 2000;
          const timer = setTimeout(() => {
            navigate(`/dashboard/Episodes`);
          }, delay);

          return () => clearTimeout(timer);
        } else {
          console.error("Server returned an error:", response.data.Error);
          setErrorMessage("Internal Server Error");
        }
      } catch (error) {
        console.error("Axios request failed:", error);
        setErrorMessage("Axios request failed");
      }

      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <h5>/dashboard/Episodes/edit/</h5>
      <h1 className="dashboard_name">Edit Episodes</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="from_div">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12 inputfield">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className="text_input_field"
                type="text"
                name="title"
                onChange={formik.handleChange}
                placeholder="Write Title..."
                value={formik.values.title}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="PodcastPovider">Podcast Provider</label>
              <select
                name="PodcastPovider"
                id="PodcastPovider"
                className="text_input_field"
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

            <div className="col-md-6 inputfield">
              <h5>Upload Audio</h5>
              <div className="thumble_inputField_style">
                <label htmlFor="file">
                  Upload Audio <FaCloudUploadAlt />
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".mp3, .wav, .ogg"
                />
              </div>
            </div>

            <div className="col-md-6 inputfield">
              <h5>Listen Episodes</h5>
              {file ? (
                <audio controls>
                  <source src={file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <img
                  src="https://i.postimg.cc/1R73y3NC/Designer.jpg"
                  alt="Tojo News audio listing Image"
                  className="blog_Image"
                  loading="lazy"
                />
              )}
            </div>

            <div className="col-md-12 inputfield">
              <h5>Write Episodes Info</h5>
              <Editor
                apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
                id="episodesInfo"
                textareaName="episodesInfo"
                initialValue="Get Start ..."
                onEditorChange={(content) => {
                  formik.setFieldValue("episodesInfo", content);
                }}
                init={{
                  height: 450,
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

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                Update Episodes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEpisodes;
