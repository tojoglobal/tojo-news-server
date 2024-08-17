import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { useContext } from "react";

const EditAuthors = () => {
  const { state } = useContext(AppContext);

  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [author, setAuthor] = useState([]);

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/author/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setAuthor((prevAuthor) => ({
            ...prevAuthor,
            authorName: result.data.Result[0].name,
          }));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  console.log(author);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      authorName: author.authorName || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.put(
          `${state.port}/api/admin/author/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Category Edit successfully`, {
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
        <Link to="/dashboard/author" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit author Name</h1>
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
              <label htmlFor="categoryName">
                Category Name <IoStarSharp className="reqired_symbole" />
              </label>

              <input
                className="text_input_field"
                type="text"
                name="authorName"
                onChange={formik.handleChange}
                placeholder="Update Author Name"
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
                Update Author
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuthors;
