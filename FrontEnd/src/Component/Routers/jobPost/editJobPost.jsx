import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJobPost = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [job, setJob] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/jobpost/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setJob({
            ...job,
            jobTitle: result.data.Result[0].jobTitle,
            jobPosition: result.data.Result[0].jobPosition,
            jobTime: result.data.Result[0].jobTime,
            applyLink: result.data.Result[0].applyLink,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // console.log(faq);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      jobTitle: job.jobTitle || "",
      jobPosition: job.jobPosition || "",
      jobTime: job.jobTime || "",
      applyLink: job.applyLink || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/jobpost/edit/${id}`,
          values
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
            navigate("/dashboard/job");
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

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h5>/dashboard/job/edit/</h5>
      <h1 className="dashboard_name">Edit Job post </h1>
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
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                EDIT JOB
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPost;
