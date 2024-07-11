import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { IoStarSharp } from "react-icons/io5";

const CreateBlogPost = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();
  // state
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [Author, setAuthor] = useState([]);
  const [NewsCategory, setNewsCategory] = useState([]);

  // fetch Data

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const AuthorResponse = await axios.get(
  //         "http://localhost:8080/api/admin/author"
  //       );
  //       setAuthor(AuthorResponse.data.Status ? AuthorResponse.data.Result : []);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setErrorMessage(`${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/admin/newsCategory")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         setNewsCategory(result.data.Result);
  //       } else {
  //         setErrorMessage(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
    //enableReinitialize: true,
    initialValues: {
      title: "",
      subTitle: "",
      AuthorOne: "",
      AuthorTwo: "",
      newsCategory: "",
      file: "",
      artical: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
      formData.append("AuthorOne", values.AuthorOne);
      formData.append("AuthorTwo", values.AuthorTwo);
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
          const delay = 1500; // 1.5 seconds delay
          const timer = setTimeout(() => {
            navigate(`/dashboard/blogpost`);
          }, delay);
          return () => clearTimeout(timer);
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
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Create News</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* form start */}
      {/* ++++++========part 1 =======++++++++ */}
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
                aria-label="Default select example"
                value={formik.values.AuthorOne}
                onChange={(e) =>
                  formik.setFieldValue("AuthorOne", e.target.value)
                }
              >
                <option value="">Choose Author 1</option>
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
                <option value="">Choose News Category</option>
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
              <h5>Write News Artical</h5>
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
