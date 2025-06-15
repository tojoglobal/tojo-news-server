import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreatePodcasts = () => {
  const { state } = useContext(AppContext);
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
      HostedName: "",
      HostedInfo: "",
      file: "",
      SpotifyUrl: "",
      AppleUrl: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      formData.append("HostedName", values.HostedName);
      formData.append("HostedInfo", values.HostedInfo);
      formData.append("file", values.file);
      formData.append("SpotifyUrl", values.SpotifyUrl);
      formData.append("AppleUrl", values.AppleUrl);
      try {
        const response = await axios.post(
          `${state.port}/api/admin/Podcasts/create`,
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

          navigate(`/dashboard/Podcasts`);
        }
      } catch (error) {
        setErrorMessage(`${error}`);
      }

      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Create Podcast</h1>
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
              <Form.Label htmlFor="HostedName" className="label">
                Hosted Name
              </Form.Label>
              <Form.Control
                placeholder="Write Hosted name..."
                id="HostedName"
                aria-describedby="HostedName"
                className="link_input_field"
                type="text"
                name="HostedName"
                onChange={formik.handleChange}
                value={formik.values.HostedName}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
              <Form.Label htmlFor="HostedInfo" className="label">
                Hosted Info
              </Form.Label>
              <Form.Control
                placeholder="Write Hosted Info..."
                id="HostedInfo"
                aria-describedby="HostedInfo"
                className="link_input_field"
                type="text"
                name="HostedInfo"
                onChange={formik.handleChange}
                value={formik.values.HostedInfo}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5 className="mb-4">Upload Hosted Image</h5>
              <div className="row">
                <div className="col-md-4">
                  <Form.Label htmlFor="file" className="label">
                    <span className="pe-3">Upload</span> <FaCloudUploadAlt />
                  </Form.Label>
                  <Form.Control
                    aria-describedby="file"
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
                    src={
                      file ? file : "https://i.postimg.cc/KzNdw0LX/Group.png"
                    }
                    alt="blog_Image"
                    className="blog_Image"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="SpotifyUrl" className="label">
                Spotify url
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Spotify Url"
                  id="SpotifyUrl"
                  name="SpotifyUrl"
                  aria-describedby="SpotifyUrl"
                  className="link_input_field"
                  onChange={formik.handleChange}
                  value={formik.values.SpotifyUrl}
                />
              </InputGroup>
            </div>

            <div className="col-md-12 inputfield ">
              <Form.Label htmlFor="AppleUrl" className="label">
                Apple url
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  name="AppleUrl"
                  onChange={formik.handleChange}
                  value={formik.values.AppleUrl}
                  placeholder="Apple Url"
                  id="AppleUrl"
                  aria-describedby="AppleUrl"
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
                ADD NEW podcasts
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePodcasts;
