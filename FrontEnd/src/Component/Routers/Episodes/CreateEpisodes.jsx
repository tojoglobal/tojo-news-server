import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateEpisodes = () => {
  // state
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [Author, setAuthor] = useState([]);
  const [PodcastsAuthor, setPodcastsAuthor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, PodcastsResponse] = await Promise.all([
          axios.get(`${state.port}/api/admin/author`),
          axios.get(`${state.port}/api/admin/Podcasts`),
        ]);

        if (authorResponse.data.Status) {
          setAuthor(authorResponse.data.Result);
        } else {
          setErrorMessage(authorResponse.data.Error);
        }

        if (PodcastsResponse.data.Status) {
          setPodcastsAuthor(PodcastsResponse.data.Result);
        } else {
          setErrorMessage(PodcastsResponse.data.Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(`${error}`);
      }
    };

    fetchData();
  }, []);

  // Audio file handle
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      PodcastPovider: "",
      file: "",
      episodesInfo: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("PodcastPovider", values.PodcastPovider);
      formData.append("file", values.file);
      formData.append("episodesInfo", values.episodesInfo);

      try {
        const response = await axios.post(
          `${state.port}/api/admin/Episodes/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Create successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate(`/dashboard/Episodes`);
          }, 1500);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }

      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <h1 className="dashboard_name">Create Episodes</h1>
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
              <label htmlFor="PodcastPovider">Podcast Povider</label>
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
                <option value="">Choose Povider Name</option>
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
                  required
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
                ADD Episodes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEpisodes;
