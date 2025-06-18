import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const EditBlogPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [BlogPost, setBlogPost] = useState({});
  const [Author, setAuthor] = useState([]);
  const [NewsCategory, setNewsCategory] = useState([]);

  // Fetch blog post data by ID
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/blogpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setBlogPost(result.data.Result[0]);
          setFile(`${state.port}/Images/${result.data.Result[0].thumble}`);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => toast.error(err?.message || "Failed to fetch blog post"));
  }, [id, state.port]);

  // Fetch authors and news categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorResponse, newsCategoryResponse] = await Promise.all([
          axios.get(`${state.port}/api/admin/author`),
          axios.get(`${state.port}/api/admin/newsCategory`),
        ]);

        if (authorResponse.data.Status) {
          setAuthor(authorResponse.data.Result);
        } else {
          toast.error(authorResponse.data.Error || "Failed to fetch authors");
        }

        if (newsCategoryResponse.data.Status) {
          setNewsCategory(newsCategoryResponse.data.Result);
        } else {
          toast.error(
            newsCategoryResponse.data.Error || "Failed to fetch categories"
          );
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching data");
      }
    };

    fetchData();
  }, [state.port]);

  // Image file handle
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogPost.title || "",
      subTitle: BlogPost.subtitle || "",
      AuthorOne: BlogPost.author1_id || "",
      AuthorTwo: BlogPost.author2_id || "",
      newsCategory: BlogPost.category_id || "",
      file: BlogPost.thumble || "",
      artical: BlogPost.articalpost || "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
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
          `${state.port}/api/admin/blogpost/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          toast.success(`Blog post edited successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(-1);
        } else {
          toast.error(response.data.Error || "Internal Server Error");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.Error ||
            error?.message ||
            "Axios request failed",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }

      resetForm();
    },
  });

  return (
    <div className="bg-[#101829] flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-5xl bg-[#172133] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Edit Blog Post</h1>
        <hr className="border-gray-700 mb-6" />
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
              htmlFor="subTitle"
              className="block text-sm font-medium mb-2"
            >
              Sub Body
            </label>
            <input
              id="subTitle"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="subTitle"
              onChange={formik.handleChange}
              placeholder="Write Sub Title..."
              value={formik.values.subTitle}
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="AuthorOne"
                className="block text-sm font-medium mb-2"
              >
                Author 1
              </label>
              <select
                name="AuthorOne"
                id="AuthorOne"
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
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
            <div className="flex-1">
              <label
                htmlFor="AuthorTwo"
                className="block text-sm font-medium mb-2"
              >
                Author 2 (optional)
              </label>
              <select
                name="AuthorTwo"
                id="AuthorTwo"
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
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
          </div>
          <div>
            <label
              htmlFor="newsCategory"
              className="block text-sm font-medium mb-2"
            >
              News Category
            </label>
            <select
              name="newsCategory"
              id="newsCategory"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Upload News Thumbnail
              </label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="file"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer text-white font-semibold transition"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  <span>Upload Thumbnail</span>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChange}
                    accept=".jpg, .png"
                  />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Preview Thumbnail
              </label>
              <img
                src={file ? file : `${state.port}/Images/${BlogPost.thumble}`}
                alt="Tojo_global_Thumbnail_Image"
                className="h-44 w-full object-cover rounded-lg border border-gray-700"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Write Article
            </label>
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              Edit BLOG POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPost;
