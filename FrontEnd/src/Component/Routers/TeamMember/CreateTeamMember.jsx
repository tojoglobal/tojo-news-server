import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

const CreateTeamMember = () => {
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
    enableReinitialize: true,
    initialValues: {
      name: "",
      positionName: "",
      file: "",
      check: false,
      BioData: "",
      facebookName: "",
      youtubeName: "",
      linkedinName: "",
      twitterName: "",
      WhatsAppNumber: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("positionName", values.positionName);
      formData.append("file", values.file);
      formData.append("check", values.check);
      formData.append("BioData", values.BioData);
      formData.append("facebookName", values.facebookName);
      formData.append("youtubeName", values.youtubeName);
      formData.append("linkedinName", values.linkedinName);
      formData.append("twitterName", values.twitterName);
      formData.append("WhatsAppNumber", values.WhatsAppNumber);
      try {
        const response = await axios.post(
          "https://api.tojoglobal.com/api/admin/teamMember/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Team member Create successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate(`/dashboard/teamMember`);
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
      <h1 className="dashboard_name">Create Team Member</h1>
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
              <Form.Label htmlFor="name" className="label">
                Name
              </Form.Label>
              <Form.Control
                placeholder="Write Member name..."
                id="name"
                aria-describedby="basic-addon1"
                className="link_input_field"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <Form.Label htmlFor="position" className="label">
                Position
              </Form.Label>
              <Form.Control
                placeholder="Write Member Position..."
                id="position"
                aria-describedby="basic-addon2"
                className="link_input_field"
                type="text"
                name="positionName"
                onChange={formik.handleChange}
                value={formik.values.positionName}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <h5>Upload Member image</h5>
              <div className="row">
                <div className="col-md-4">
                  <Form.Label htmlFor="file" className="label">
                    Upload image <FaCloudUploadAlt />
                  </Form.Label>
                  <Form.Control
                    placeholder="Write Member Position..."
                    aria-describedby="basic-addon3"
                    className="link_input_field"
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleChange}
                    accept=".jpg, .png"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <img
                    src={file ? file : "https://rb.gy/u0q1so"}
                    alt="blog_Image"
                    className="blog_Image"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 inputfield">
              <h5>Member Bio</h5>
              <Editor
                id="BioData"
                textareaName="BioData"
                initialValue="Get Start ..."
                onEditorChange={(content) => {
                  formik.setFieldValue("BioData", content);
                }}
                init={{
                  height: 250,
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
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="Facebook-url" className="label">
                Facebook UserName
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon4" className="link_input_field">
                  https://facebook.com/
                </InputGroup.Text>
                <Form.Control
                  placeholder="xyzName"
                  id="basic-addon4"
                  name="facebookName"
                  aria-describedby="basic-addon4"
                  className="link_input_field"
                  onChange={formik.handleChange}
                  value={formik.values.facebookName}
                />
              </InputGroup>
              {formik.values.facebookName && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={`https://facebook.com/${formik.values.facebookName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://facebook.com/{formik.values.facebookName}
                    </a>
                  </small>
                </>
              )}
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon5" className="label">
                YouTube UserName
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon5" className="link_input_field">
                  https://www.youtube.com/
                </InputGroup.Text>
                <Form.Control
                  name="youtubeName"
                  onChange={formik.handleChange}
                  value={formik.values.youtubeName}
                  placeholder="@xyzName"
                  id="basic-addon5"
                  aria-describedby="basic-addon5"
                  className="link_input_field"
                />
              </InputGroup>
              {formik.values.youtubeName && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={`https://www.youtube.com/${formik.values.youtubeName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.youtube.com/{formik.values.youtubeName}
                    </a>
                  </small>
                </>
              )}
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon6" className="label">
                Linkedin UserName
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon6" className="link_input_field">
                  https://www.linkedin.com/in/
                </InputGroup.Text>
                <Form.Control
                  name="linkedinName"
                  onChange={formik.handleChange}
                  value={formik.values.linkedinName}
                  placeholder="xyzName"
                  id="basic-addon6"
                  aria-describedby="basic-addon6"
                  className="link_input_field"
                />
              </InputGroup>
              {formik.values.linkedinName && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={`https://www.linkedin.com/in/${formik.values.linkedinName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://www.linkedin.com/in/{formik.values.linkedinName}
                    </a>
                  </small>
                </>
              )}
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon7" className="label">
                xTwitter UserName
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon7" className="link_input_field">
                  https://twitter.com/
                </InputGroup.Text>
                <Form.Control
                  name="twitterName"
                  onChange={formik.handleChange}
                  value={formik.values.twitterName}
                  placeholder="xyzName"
                  id="basic-url"
                  aria-describedby="basic-addon7"
                  className="link_input_field"
                />
              </InputGroup>
              {formik.values.twitterName && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={`https://twitter.com/${formik.values.twitterName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://twitter.com/{formik.values.twitterName}
                    </a>
                  </small>
                </>
              )}
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon8" className="label">
                WhatsApp Number
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3" className="link_input_field">
                  https://wa.me/
                </InputGroup.Text>
                <Form.Control
                  name="WhatsAppNumber"
                  onChange={formik.handleChange}
                  value={formik.values.WhatsAppNumber}
                  placeholder="8801602555023"
                  id="basic-addon9"
                  type="number"
                  aria-describedby="basic-addon9"
                  className="link_input_field"
                />
              </InputGroup>
              {formik.values.WhatsAppNumber && (
                <>
                  <small>example </small>
                  <small>
                    <a
                      href={`https://wa.me/${formik.values.WhatsAppNumber}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://wa.me/{formik.values.WhatsAppNumber}
                    </a>
                  </small>
                </>
              )}
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD NEW MEMBER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamMember;
