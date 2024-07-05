import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJobPostRouter = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);

  // use fromik method
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobPosition: "",
      jobTime: "",
      applyLink: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://api.tojoglobal.com/api/admin/jobpost/create",
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Job Offer Create successfully`, {
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
            navigate("/dashboard/job");
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
      <h1 className="dashboard_name">Create New Job offer</h1>
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
              <label htmlFor="question">Job Title</label>
              <input
                className="text_input_field"
                type="text"
                name="jobTitle"
                onChange={formik.handleChange}
                placeholder="Job Title"
                value={formik.values.jobTitle}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="question">Job Position</label>
              <input
                className="text_input_field"
                type="text"
                name="jobPosition"
                onChange={formik.handleChange}
                placeholder="Job Position"
                value={formik.values.jobPosition}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="jobTime">Job Time</label>

              <select
                name="jobTime"
                id="jobTime"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.jobTime}
                onChange={(e) =>
                  formik.setFieldValue("jobTime", e.target.value)
                }
              >
                <option value="">Choose Category</option>
                <option value="Remote" key="Remotejob">
                  Remote
                </option>
                <option value="Full Time" key="FullTimejob">
                  Full Time
                </option>
                <option value="On-site" key="On-site">
                  On-site
                </option>
              </select>
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="question">applyLink</label>
              <input
                className="text_input_field"
                type="text"
                name="applyLink"
                onChange={formik.handleChange}
                placeholder="Job Apply Link"
                value={formik.values.applyLink}
                required
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn"
                role="button"
              >
                Add New Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPostRouter;
