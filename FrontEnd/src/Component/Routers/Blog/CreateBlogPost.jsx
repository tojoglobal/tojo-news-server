import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [Author, setAuthor] = useState([]);
  const [NewsCategory, setNewsCategory] = useState([]);

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

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  // parmalik validation
  const validate = (values) => {
    const errors = {};
    if (values.permalink && /[_,-]/.test(values.permalink)) {
      errors.permalink =
        "Your permalink is not valid. Please remove underscore, hyphen, and comma.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      permalink: "",
      subTitle: "",
      AuthorOne: "",
      AuthorTwo: "",
      newsCategory: "",
      file: "",
      artical: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
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
        const response = await axios.post(
          "http://localhost:8080/api/admin/blogpost/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Artical Create successfully`, {
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
            navigate(`/dashboard/blogpost`);
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
      <ToastContainer />
      <h1 className="dashboard_name">Create News</h1>
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
              <label htmlFor="permalink">Permalink</label>
              <input
                id="permalink"
                className="text_input_field"
                type="text"
                name="permalink"
                onChange={formik.handleChange}
                placeholder="Write permalink..."
                value={formik.values.permalink}
                required
              />
              {formik.errors.permalink && (
                <div className="error text-danger">
                  {formik.errors.permalink}
                </div>
              )}
              {formik.values.permalink && !formik.errors.permalink && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={
                        formik.values.permalink
                          ? `http://localhost:5173/news/${formik.values.permalink
                              .replaceAll(/ /g, "-")
                              .toLowerCase()}`
                          : "/fallback-url"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-success"
                    >
                      http://localhost:5173/news/
                      {formik.values.permalink
                        .replaceAll(/ /g, "-")
                        .toLowerCase()}
                    </a>
                  </small>
                </>
              )}
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
                required
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="AuthorOne">Author 1</label>
              <select
                name="AuthorOne"
                id="AuthorOne"
                className="text_input_field"
                value={formik.values.AuthorOne}
                onChange={(e) =>
                  formik.setFieldValue("AuthorOne", e.target.value)
                }
                required
              >
                <option value="">Choose Author 1</option>
                {Author.map((author) => (
                  <option value={author.ID} key={author.uuid}>
                    {author.name}
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
                value={formik.values.AuthorTwo}
                onChange={(e) =>
                  formik.setFieldValue("AuthorTwo", e.target.value)
                }
              >
                <option value="">Choose Author 2</option>
                {Author.map((author) => (
                  <option value={author.ID} key={author.uuid}>
                    {author.name}
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
                value={formik.values.newsCategory}
                onChange={(e) =>
                  formik.setFieldValue("newsCategory", e.target.value)
                }
                required
              >
                <option value="">Choose News Category</option>
                {NewsCategory.map((category) => (
                  <option value={category.ID} key={category.uuid}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 inputfield">
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
                  required
                />
              </div>
            </div>
            <div className="col-md-6 inputfield">
              <h5>Preview Thumbnail</h5>
              <img
                src={file ? file : "https://i.postimg.cc/KzNdw0LX/Group.png"}
                alt="Tojo_global_Thumbnail_Image"
                className="blog_Image"
                loading="lazy"
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5>Write News Article</h5>
              <Editor
                apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
                id="artical"
                textareaName="artical"
                initialValue="Get Start ..."
                onEditorChange={(content) => {
                  formik.setFieldValue("artical", content);
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
                ADD BLOG POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
