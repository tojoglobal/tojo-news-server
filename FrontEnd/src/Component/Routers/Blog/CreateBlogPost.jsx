import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateBlogPost = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [Author, setAuthor] = useState([]);
  const [NewsCategory, setNewsCategory] = useState([]);

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

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
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
      if (values.AuthorTwo) {
        formData.append("AuthorTwo", values.AuthorTwo);
      }
      formData.append("newsCategory", values.newsCategory);
      formData.append("file", values.file);
      formData.append("artical", values.artical);
      formData.append("home_highlight", values.home_highlight);

      try {
        const response = await axios.post(
          `${state.port}/api/admin/blogpost/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          toast.success(`Article created successfully`, {
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
          toast.error(response.data.Error || "Failed to create blog post");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.Error ||
            error?.message ||
            "Something went wrong",
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
      setFile(null);
    },
  });

  return (
    <div className="p-2 md:p-3">
      <div className="w-full bg-[#172133] rounded-xl shadow-lg p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl  font-bold mb-4">Create News</h1>
        <hr className="border-gray-700 mb-6" />
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-5 md:space-y-6"
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
          <div>
            <label className="block text-sm font-medium mb-2">
              Highlight on Home
            </label>
            <input
              type="checkbox"
              checked={
                formik.values.home_highlight === true ||
                formik.values.home_highlight === "1"
              }
              onChange={(e) =>
                formik.setFieldValue(
                  "home_highlight",
                  e.target.checked ? "1" : "0"
                )
              }
              className="mr-2"
            />
            <span className="text-xs text-gray-400">
              Only one blog can be highlighted at a time
            </span>
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
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Preview Thumbnail
              </label>
              <img
                src={
                  file
                    ? file
                    : `https://placehold.co/600x400?text=Preview+Thumbnail&font=montserrat`
                }
                alt="Tojo_global_Thumbnail_Image"
                className="h-44 w-full object-cover rounded-lg border border-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Write News Article
            </label>
            <Editor
              apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
              id="artical"
              textareaName="artical"
              initialValue=""
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              ADD BLOG POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
