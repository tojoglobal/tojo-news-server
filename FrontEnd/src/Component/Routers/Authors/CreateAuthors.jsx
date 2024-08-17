import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const CreateContactCategory = () => {
  const { state } = useContext(AppContext);

  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);

  // use fromik method
  const formik = useFormik({
    initialValues: {
      authorName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${state.port}/api/admin/author/create`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Catagory Create successfully`, {
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
            navigate("/dashboard/author");
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
      <h1 className="dashboard_name">Create author Name</h1>
      <hr />
      {/* <p>{formattedValue}</p> */}
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
              <label htmlFor="categoryName">
                Category Name <IoStarSharp className="reqired_symbole" />
              </label>

              <input
                className="text_input_field"
                type="text"
                name="authorName"
                onChange={formik.handleChange}
                placeholder="Write Author Name"
                value={formik.values.authorName}
                required
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD author Name
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContactCategory;
