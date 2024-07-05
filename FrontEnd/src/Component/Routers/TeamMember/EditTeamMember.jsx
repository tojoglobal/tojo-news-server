import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, InputGroup } from "react-bootstrap";
// import { FaCloudUploadAlt } from "react-icons/fa";

const EditTeamMember = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [teamMember, setTeamMember] = useState([]);

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/teamMember/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setTeamMember({
            ...teamMember,
            name: result.data.Result[0].name,
            positionName: result.data.Result[0].position,
            check: result.data.Result[0].checkbox,
            BioData: result.data.Result[0].BioData,
            facebookName: result.data.Result[0].FBurl,
            youtubeName: result.data.Result[0].YTurl,
            linkedinName: result.data.Result[0].LIurl,
            twitterName: result.data.Result[0].TWurl,
            WhatsAppNumber: result.data.Result[0].WhatsApurl,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: teamMember.name || "",
      positionName: teamMember.positionName || "",
      check: teamMember.check || "",
      BioData: teamMember.BioData || "",
      facebookName: teamMember.facebookName || "",
      youtubeName: teamMember.youtubeName || "",
      linkedinName: teamMember.linkedinName || "",
      twitterName: teamMember.twitterName || "",
      WhatsAppNumber: teamMember.WhatsAppNumber || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/teamMember/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Team member Edit successfully`, {
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
            navigate(`/dashboard/teamMember`);
          }, delay);
          // Clear the timer if the component unmounts before the delay is complete
          return () => clearTimeout(timer);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }

      resetForm();
    },
  });

  // console.log(teamMember.check);

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h5>/dashboard/teamMember/edit/</h5>
      <h1 className="dashboard_name">Edit Team Member Data </h1>
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
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5>Member Bio</h5>
              <Editor
                id="BioData"
                textareaName="BioData"
                initialValue={formik.values.BioData}
                onEditorChange={(content) => {
                  formik.setFieldValue("BioData", content);
                }}
                apiKey='heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb'
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
                Facebook URL
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
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon5" className="label">
                YouTube URL
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
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon6" className="label">
                Linkedin URL
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
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon7" className="label">
                xTwitter URL
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
            </div>
            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="basic-addon8" className="label">
                WhatsApp URL
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
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                EDIT MEMBER
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamMember;
