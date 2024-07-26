import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { Form, InputGroup } from "react-bootstrap";
// import { FaCloudUploadAlt } from "react-icons/fa";

const EditPodcasts = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [Podcasts, setPodcasts] = useState([]);

  //Data Fetching
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/Podcasts/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setPodcasts({
            ...Podcasts,
            HostedName: result.data.Result[0].name,
            HostedInfo: result.data.Result[0].hostedInfo,
            SpotifyUrl: result.data.Result[0].spotify,
            AppleUrl: result.data.Result[0].apple,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id, Podcasts]);

  console.log(Podcasts);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      HostedName: Podcasts.HostedName || "",
      HostedInfo: Podcasts.HostedInfo || "",
      SpotifyUrl: Podcasts.SpotifyUrl || "",
      AppleUrl: Podcasts.AppleUrl || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.put(
          `http://localhost:8080/api/admin/Podcasts/edit/${id}`,
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
            navigate(`/dashboard/Podcasts`);
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

  // console.log(Podcasts.check);

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h5>/dashboard/Podcasts/edit/</h5>
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

            {/* <div className="col-md-12 inputfield">
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
            </div> */}

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
                edit podcasts
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPodcasts;
