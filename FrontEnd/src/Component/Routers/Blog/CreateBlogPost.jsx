import axios from "axios";
import { useState} from 'react';
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateBlogPost = () => {
  // path
  const isHomePageRoute = location.pathname;
 const navigate = useNavigate();
  // state
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      file: "",
      artical: "",
      authorName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("file", values.file); 
      formData.append("artical", values.artical);
      formData.append("authorName", values.authorName);
      try {
        const response = await axios.post(
          "https://api.tojoglobal.com/api/admin/blogpost/create",
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
      <h1 className="dashboard_name">Create Blog Post</h1>
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
              <label htmlFor="title">Blog Title</label>
              <input
                id="title"
                className="text_input_field"
                type="text"
                name="title"
                onChange={formik.handleChange}
                placeholder="Write blog Title..."
                value={formik.values.title}
                required
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
                required
              />
            </div>
            <div className="col-md-12 inputfield">
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
              required
            />
            <img src={file} alt="blog_Image" className="blog_Image"/>
              </div>
          </div>            

            <div className="col-md-12 inputfield">            
            <h5 >
             Write Artical 
              </h5>
              <Editor
             apiKey='heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb'
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
