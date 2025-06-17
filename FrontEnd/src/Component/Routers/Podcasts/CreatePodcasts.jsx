import axios from "axios";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
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

  // use formik method
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
      <div className="from_div">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12 inputfield">
              <label htmlFor="HostedName" className="label block mb-1">
                Hosted Name
              </label>
              <input
                placeholder="Write Hosted name..."
                id="HostedName"
                aria-describedby="HostedName"
                className="link_input_field w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="HostedName"
                onChange={formik.handleChange}
                value={formik.values.HostedName}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="HostedInfo" className="label block mb-1">
                Hosted Info
              </label>
              <input
                placeholder="Write Hosted Info..."
                id="HostedInfo"
                aria-describedby="HostedInfo"
                className="link_input_field w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label
                    htmlFor="file"
                    className="label flex items-center gap-2 cursor-pointer"
                  >
                    <span className="pe-3">Upload</span> <FaCloudUploadAlt />
                  </label>
                  <input
                    aria-describedby="file"
                    className="link_input_field w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="col-md-12 inputfield">
              <label htmlFor="SpotifyUrl" className="label block mb-1">
                Spotify url
              </label>
              <input
                placeholder="Spotify Url"
                id="SpotifyUrl"
                name="SpotifyUrl"
                aria-describedby="SpotifyUrl"
                className="link_input_field w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.SpotifyUrl}
              />
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="AppleUrl" className="label block mb-1">
                Apple url
              </label>
              <input
                name="AppleUrl"
                onChange={formik.handleChange}
                value={formik.values.AppleUrl}
                placeholder="Apple Url"
                id="AppleUrl"
                aria-describedby="AppleUrl"
                className="link_input_field w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn"
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
