import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";

import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const EditTagName = () => {
  const { state } = useContext(AppContext);
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [TagName, setTagName] = useState({});

  //Data Fetching
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/TagName/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setTagName({
            ...TagName,
            Name: result.data.Result[0].name,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // console.log(TagName);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      TagName: TagName.Name || "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.put(
          `${state.port}/api/admin/TagName/edit/${id}`,
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
            navigate("/dashboard/TagName");
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
      <h5>/dashboard/TagName/edit/</h5>
      <h1 className="dashboard_name">Edit TagName </h1>
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
              <label htmlFor="question">Tag Name</label>
              <input
                className="text_input_field"
                type="text"
                name="TagName"
                onChange={formik.handleChange}
                placeholder="update TagName"
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
                update TagName
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTagName;
