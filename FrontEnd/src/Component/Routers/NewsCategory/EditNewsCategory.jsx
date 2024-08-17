import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

const EditNewsCategory = () => {
  const { state } = useContext(AppContext);
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [NewsCategory, setNewsCategory] = useState([]);

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/newsCategory/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setNewsCategory({
            ...NewsCategory,
            categoryName: result.data.Result[0].name,
            // OnBehalf: result.data.Result[0].OnBehalf,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  console.log(NewsCategory);
  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: NewsCategory.categoryName || "",
      // OnBehalf: NewsCategory.OnBehalf || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `${state.port}/api/admin/NewsCategory/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Catagory Edit successfully`, {
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
            navigate("/dashboard/newscategory");
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
      <h5>
        <Link to="/dashboard/newscategory" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit Category </h1>
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
                name="categoryName"
                onChange={formik.handleChange}
                placeholder="Edit News Category"
                value={formik.values.categoryName}
                required
              />
            </div>

            {/* <div className="col-md-12 inputfield">
              <label htmlFor="OnBehalf">
                On behalf <IoStarSharp className="reqired_symbole" />
              </label>

              <select
                name="OnBehalf"
                id="OnBehalf"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.OnBehalf}
                onChange={(e) =>
                  formik.setFieldValue("OnBehalf", e.target.value)
                }
                required
              >
                <option value="Complainant">Complainant</option>
                <option value="Defendant">Defendant</option>
              </select>
            </div> */}

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                update CATEGORY
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewsCategory;
