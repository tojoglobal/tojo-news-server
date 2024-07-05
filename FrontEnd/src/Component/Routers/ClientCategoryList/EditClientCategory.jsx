import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const EditClientCategory = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [ClientCatagoryList, setClientCatagoryList] = useState([]);

  // fetch data
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/clientCatagoryList/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setClientCatagoryList({
            ...ClientCatagoryList,
            categoryName: result.data.Result[0].categoryName,
            categoryNote: result.data.Result[0].categoryNote,
            OnBehalf: result.data.Result[0].OnBehalf,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  console.log(ClientCatagoryList);
  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: ClientCatagoryList.categoryName || "",
      categoryNote: ClientCatagoryList.categoryNote || "",
      OnBehalf: ClientCatagoryList.OnBehalf || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/clientCatagoryList/edit/${id}`,
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
            navigate("/dashboard/client/category");
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
        <Link to="/dashboard/client/category" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit Category list</h1>
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
                placeholder="Cognomen Name"
                value={formik.values.categoryName}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
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
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="categoryNote">Note</label>
              <input
                className="text_input_field"
                type="text"
                name="categoryNote"
                onChange={formik.handleChange}
                placeholder="Cognomen Note"
                value={formik.values.categoryNote}
              />
            </div>

            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD CATEGORY
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientCategory;
