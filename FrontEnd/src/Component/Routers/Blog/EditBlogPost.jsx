import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
const EditBlogPost = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [practiseArea, setPractiseArea] = useState({});
  // const [file, setFile] = useState(null);

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/blogpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setPractiseArea({
            ...practiseArea,
            title: result.data.Result[0].blogtitle,
            file: result.data.Result[0].blogImg,
            artcl: result.data.Result[0].description,
            authorName: result.data.Result[0].authorName,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // image file handle
  // const handleChange = (e) => {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  //   formik.setFieldValue("file", e.target.files[0]);
  // };

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: practiseArea.title || "",
      file: practiseArea.file,
      artical: practiseArea.artcl || "",
      authorName: practiseArea.authorName || "",
    },
    onSubmit: async (values, { resetForm }) => {
      // const formData = new FormData();
      // formData.append("title", values.title);
      // formData.append("file", values.file);
      // if (values.file) {
      //       formData.append("file", values.file);
      //   }
      // formData.append("artical", values.artical);
      // formData.append("authorName", values.authorName);
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/blogpost/edit/${id}`,
          values
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
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

  console.log(practiseArea);

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
              <label htmlFor="title">Blog Title</label>
              <input
                id="title"
                className="text_input_field"
                type="text"
                name="title"
                onChange={formik.handleChange}
                placeholder="Write blog Title..."
                value={formik.values.title}
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="authorName">Author Name</label>
              <input
                id="authorName"
                className="text_input_field"
                type="text"
                name="authorName"
                onChange={formik.handleChange}
                placeholder="Write Author Name..."
                value={formik.values.authorName}
              />
            </div>
            {/* <div className="col-md-12 inputfield">
            <h5>Upload Blog image</h5>
              <div>              
            <label htmlFor="file">
              Upload image <FaCloudUploadAlt />
            </label>
            <input
              id="file"
              type="file"
              name="file"
              onChange={handleChange}
              accept=".jpg, .png"
              
            />
            <img src={file || `/Images/${practiseArea.file}`} alt="blog_Image" className="blog_Image"/>
              </div>
          </div>             */}

            <div className="col-md-12 inputfield">
              <h5>Write Artical</h5>
              <Editor
                id="artical"
                textareaName="artical"
                onEditorChange={(content) => {
                  formik.setFieldValue("artical", content);
                }}
                initialValue={formik.values.artical}
                apiKey='heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb'
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
