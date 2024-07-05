import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const EditContactList = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactName, setContactName] = useState([]);
  const [contactInfo, setContactInfo] = useState({});

  // fetch data
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/contactlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
            setContactInfo({
            ...contactInfo,
            contactName: result.data.Result[0].contactName,
            category: result.data.Result[0].category,
            mobileNo: result.data.Result[0].mobileNo,
            eamil: result.data.Result[0].eamil,
            note: result.data.Result[0].note,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);
  
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/contactName")
      .then((result) => {
        if (result.data.Status) {
          setContactName(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        contactName: contactInfo.contactName || "",
        category: contactInfo.category || "",
        mobileNo:contactInfo.mobileNo || "",
        email: contactInfo.eamil || "",
        note: contactInfo.note || ""
    },
    onSubmit: async (values, { resetForm }) => {
      
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/contactlist/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Appointment Edit successfully`, {
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
            navigate("/dashboard/contact");
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
        <Link to="/dashboard/contact" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit contact list</h1>
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
              <label htmlFor="contactName">
                Contact Name <IoStarSharp className="reqired_symbole" />
              </label>

              <input
                className="text_input_field"
                type="text"
                name="contactName"
                onChange={formik.handleChange}
                placeholder="Contact Name"
                value={formik.values.contactName}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="category">
              Category<IoStarSharp className="reqired_symbole" />
              </label>

              <select
                name="category"
                id="category"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.category}
                onChange={(e) =>
                  formik.setFieldValue("category", e.target.value)
                }
              >
                <option selected>Choose Category</option>
                {contactName.length > 0 &&
                  contactName.map((CaNa) => (
                    <option value={CaNa.Name} key={CaNa.uuid}>
                      {CaNa.Name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="mobileNo">Mobile No</label>
              <input
                className="text_input_field"
                type="number"
                name="mobileNo"
                onChange={formik.handleChange}
                placeholder="Mobile No"
                value={formik.values.mobileNo}                
              />             
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="email">Email</label>
              <input
                className="text_input_field"
                type="text"
                name="email"
                onChange={formik.handleChange}
                placeholder="Email"
                value={formik.values.email}                
              />             
            </div>           

            <div className="col-md-12 inputfield">
              <h5>Note</h5>
              <Editor
                id="note"
                apiKey='heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb'
                textareaName="note"
                initialValue="Get Start ..."
                onEditorChange={(content) => {
                  formik.setFieldValue("note", content);
                }}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |fullscreen blocks|" +
                    "bold italic forecolor fontsize |code link image preview| alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | table | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size: 1rem;  color: #3f3e3e; }",
                }}
              />
            </div>
            <div className="col-md-12 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                ADD CONTACT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactList;
