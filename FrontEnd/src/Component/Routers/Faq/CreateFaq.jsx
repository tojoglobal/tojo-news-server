import axios from "axios";
import {useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateFaqRouter = () => {
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null); 
  
  // use fromik method
  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://api.tojoglobal.com/api/admin/faq/create",
          values
        );        
        if (response.data.Status) {              
          setErrorMessage(null);
         toast.success(`FAQ Create successfully`, {
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
            navigate("/dashboard/faq");
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
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Question & Answer</h1>
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
              <label htmlFor="question">Question</label>
              <input
                className="text_input_field"
                type="text"
                name="question"
                onChange={formik.handleChange}
                placeholder="Clinet Question ?"
                value={formik.values.question}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="answer">AnsWer</label>
              <textarea
                id="answer"
                onChange={formik.handleChange}
                value={formik.values.answer}
                className="text_input_field"
                name="answer"
                rows="2"
                cols="50"
                placeholder="Write Your Answer..."
                required
              >
                {" "}
              </textarea>
            </div>
            <div className="col-md-12 inputFiledMiddel"> 
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD FAQ
              </button>
            </div>
          </div>
        </form>
      </div>      
    </div>
  );
};

export default CreateFaqRouter;
