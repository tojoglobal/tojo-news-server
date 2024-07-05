import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
// data picker mui
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const EditAppointment = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactName, setContactName] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState({});

  // fetch data
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/appointment/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setAppointmentDetails({
            ...appointmentDetails,
            problemTitle: result.data.Result[0].problemTitle,
            contactName: result.data.Result[0].contactName,
            ApoDate: result.data.Result[0].ApoDate,
            ApoTime: result.data.Result[0].ApoTime,
            reason: result.data.Result[0].reason,
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
      ProblemTitle: appointmentDetails.problemTitle || "",
      ContactName: appointmentDetails.contactName || "",
      datePicker: dayjs(appointmentDetails.ApoDate) || "",
      timePicker: appointmentDetails.ApoTime || "",
      reason: appointmentDetails.reason || "",
      note: appointmentDetails.note || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/appointment/edit/${id}`,
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
            navigate("/dashboard/appointment");
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
        <Link to="/dashboard/appointment/" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit Appointment</h1>
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
              <label htmlFor="ProblemTitle">
                Problem Title <IoStarSharp className="reqired_symbole" />
              </label>

              <input
                className="text_input_field"
                type="text"
                name="ProblemTitle"
                onChange={formik.handleChange}
                placeholder="Problem Title"
                value={formik.values.ProblemTitle}
                required
              />
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="ContactName">
                Contact Name <IoStarSharp className="reqired_symbole" />
              </label>

              <select
                name="ContactName"
                id="ContactName"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.ContactName}
                onChange={(e) =>
                  formik.setFieldValue("ContactName", e.target.value)
                }
              >
                <option selected>Choose Contact</option>
                {contactName.length > 0 &&
                  contactName.map((CaNa) => (
                    <option value={CaNa.Name} key={CaNa.uuid} selected>
                      {CaNa.Name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="dateTime">Date & Time </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "TimePicker"]}>
                  <DatePicker
                    className="text_input_field"
                    label="APPOINTMENT DATE"
                    name="datePicker"
                    value={formik.values.datePicker}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "datePicker",
                        newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                      );
                    }}
                  />

                  <TimePicker
                    className="text_input_field"
                    label="APPOINTMENT TIME"
                    name="timePicker"
                    value={formik.values.timePicker}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "timePicker",
                        newValue ? newValue.format("hh:mm a") : ""
                      );
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="col-md-12 inputfield">
              <label htmlFor="reason">
                Reason <IoStarSharp className="reqired_symbole" />
              </label>
              <input
                className="text_input_field"
                type="text"
                name="reason"
                onChange={formik.handleChange}
                placeholder="Appointment Reason"
                value={formik.values.reason}
                required
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5>Note</h5>
              <Editor
                id="note"
                apiKey='heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb'
                textareaName="note"
                onEditorChange={(content) => {
                  formik.setFieldValue("note", content);
                }}
                value={formik.values.note}
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
                ADD APPOINTMENT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
