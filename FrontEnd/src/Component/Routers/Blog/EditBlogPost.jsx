import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
const EditBlogPost = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [BlogPost, setBlogPost] = useState({});
  const [file, setFile] = useState(null);
  const [Author, setAuthor] = useState([]);
  const [NewsCategory, setNewsCategory] = useState([]);

  //Data Fetching

  // Fetch blog post data by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/blogpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setBlogPost(result.data.Result[0]);
          setFile(
            `http://localhost:8080/Images/${result.data.Result[0].thumble}`
          );
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, newsCategoryResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/admin/author"),
          axios.get("http://localhost:8080/api/admin/newsCategory"),
        ]);

        if (authorResponse.data.Status) {
          setAuthor(authorResponse.data.Result);
        } else {
          setErrorMessage(authorResponse.data.Error);
        }

        if (newsCategoryResponse.data.Status) {
          setNewsCategory(newsCategoryResponse.data.Result);
        } else {
          setErrorMessage(newsCategoryResponse.data.Error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(`${error}`);
      }
    };

    fetchData();
  }, []);

  // image file handle
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogPost.title || "",
      permalink: BlogPost.permalink || "",
      subTitle: BlogPost.subtitle || "",
      AuthorOne: BlogPost.author1_id || "",
      AuthorTwo: BlogPost.author2_id || "",
      newsCategory: BlogPost.category_id || "",
      file: BlogPost.thumble || "",
      artical: BlogPost.articalpost || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("permalink", values.permalink);
      formData.append("subTitle", values.subTitle);
      formData.append("AuthorOne", values.AuthorOne);
      if (values.AuthorTwo) {
        formData.append("AuthorTwo", values.AuthorTwo);
      }
      formData.append("newsCategory", values.newsCategory);
      formData.append("file", values.file);
      formData.append("artical", values.artical);
      try {
        const response = await axios.put(
          `http://localhost:8080/api/admin/blogpost/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Edit successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const delay = 2000; // 2 seconds delay
          const timer = setTimeout(() => {
            navigate(`/dashboard/blogpost`);
          }, delay);
          // Clear the timer if the component unmounts before the delay is complete
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
      <ToastContainer />
      <h5>/dashboard/blogpost/edit/</h5>
      <h1 className="dashboard_name">Edit blogpost </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* form start */}
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
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="permalink">Permalink</label>
              <input
                id="permalink"
                className="text_input_field"
                type="text"
                name="permalink"
                onChange={formik.handleChange}
                placeholder="Write permalink..."
                value={formik.values.permalink}
              />
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="subTitle">Sub Title</label>
              <input
                id="subTitle"
                className="text_input_field"
                type="text"
                name="subTitle"
                onChange={formik.handleChange}
                placeholder="Write Sub Title..."
                value={formik.values.subTitle}
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="AuthorOne">Author 1</label>

              <select
                name="AuthorOne"
                id="AuthorOne"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.AuthorOne}
                onChange={(e) =>
                  formik.setFieldValue("AuthorOne", e.target.value)
                }
              >
                {Author.length > 0 &&
                  Author.map((CaNa) => (
                    <option value={CaNa.ID} key={CaNa.uuid}>
                      {CaNa.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="AuthorTwo">Author 2 (optional)</label>

              <select
                name="AuthorTwo"
                id="AuthorTwo"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.AuthorTwo}
                onChange={(e) =>
                  formik.setFieldValue("AuthorTwo", e.target.value)
                }
              >
                <option value="">Choose Author 2</option>
                {Author.length > 0 &&
                  Author.map((CaNa) => (
                    <option value={CaNa.ID} key={CaNa.uuid}>
                      {CaNa.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="newsCategory">News Category</label>

              <select
                name="newsCategory"
                id="newsCategory"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.newsCategory}
                onChange={(e) =>
                  formik.setFieldValue("newsCategory", e.target.value)
                }
              >
                {NewsCategory.length > 0 &&
                  NewsCategory.map((CaNa) => (
                    <option value={CaNa.ID} key={CaNa.uuid}>
                      {CaNa.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6 inputfield ">
              <h5>Upload News Thumbnail</h5>
              <div className="thumble_inputField_style">
                <label htmlFor="file">
                  Upload Thumbnail <FaCloudUploadAlt />
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".jpg, .png"
                />
              </div>
            </div>
            <div className="col-md-6 inputfield">
              <h5>Preview Thumbnail</h5>

              <img
                src={
                  file
                    ? file
                    : `http://localhost:8080/Images/${BlogPost.thumble}`
                }
                alt="Tojo_global_Thumbnail_Image"
                className="blog_Image"
                loading="lazy"
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5>Write Artical</h5>
              <Editor
                id="artical"
                textareaName="artical"
                onEditorChange={(content) => {
                  formik.setFieldValue("artical", content);
                }}
                initialValue={formik.values.artical}
                apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
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
                ADD BLOG POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPost;
