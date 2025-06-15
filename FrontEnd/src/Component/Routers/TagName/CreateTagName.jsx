import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const CreateTagNameRouter = () => {
  const { state } = useContext(AppContext);
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);

  // use fromik method
  const formik = useFormik({
    initialValues: {
      TagName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${state.port}/api/admin/TagName/create`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Tag Create successfully`, {
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
            navigate("/dashboard/TagName");
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
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Tag</h1>
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
              <label htmlFor="question">Tag Name</label>
              <input
                className="text_input_field"
                type="text"
                name="TagName"
                onChange={formik.handleChange}
                placeholder="Write Tag Name"
                value={formik.values.TagName}
                required
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD Tag
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTagNameRouter;
