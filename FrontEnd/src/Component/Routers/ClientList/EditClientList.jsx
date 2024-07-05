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
import { Country, State, City } from "country-state-city";

const EditClinetList = () => {
  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientInfo, setClientInfo] = useState({});
  const [ClientCatagoryList, setClientCatagoryList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Event handle method
  const handleCountryChange = (countryCode) => {
    const countryStates = State.getStatesOfCountry(countryCode);
    setCountryCode(countryCode);
    setStates(countryStates);
  };

  const handleStateChange = (stateCode) => {
    const stateCities = City.getCitiesOfState(countryCode, stateCode);
    setCities(stateCities);
  };
  // fetch data
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/clientlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setClientInfo({
            ...clientInfo,
            clientName: result.data.Result[0].clientName,
            clientmobile: result.data.Result[0].clientmobile,
            clientemail: result.data.Result[0].clientemail,
            gender: result.data.Result[0].gender,
            clientCategory: result.data.Result[0].clientCategory,
            clientCity: result.data.Result[0].clientCity,
            clientCountryCode: result.data.Result[0].clientCountryCode,
            clientStateCode: result.data.Result[0].clientStateCode,
            clientAddress: result.data.Result[0].clientAddress,
            note: result.data.Result[0].note,
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientCatagoryListResponse = await axios.get(
          "https://api.tojoglobal.com/api/admin/clientCatagoryList"
        );
        setClientCatagoryList(
          clientCatagoryListResponse.data.Status
            ? clientCatagoryListResponse.data.Result
            : []
        );

        setCountries(Country.getAllCountries());
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(`${error}`);
      }
    };

    fetchData();
  }, []);

  // use fromik method
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientName: clientInfo.clientName || "",
      clientmobile: clientInfo.clientmobile || "",
      clientemail: clientInfo.clientemail || "",
      gender: clientInfo.gender || "",
      clientCategory: clientInfo.clientCategory || "",
      clientCountryCode: clientInfo.clientCountryCode || "",
      clientStateCode: clientInfo.clientCountryCode || "",
      clientCity: clientInfo.clientCity || "",
      clientAddress: clientInfo.clientAddress || "",
      note: clientInfo.note || "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/clientlist/edit/${id}`,
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
            navigate("/dashboard/client");
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
        <Link to="/dashboard/client" className="route_link">
          {" "}
          <IoMdArrowRoundBack /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Edit client list</h1>
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
            <div className="col-md-6 inputfield">
              <label htmlFor="clientName">
                Client Name <IoStarSharp className="reqired_symbole" />
              </label>
              <input
                className="text_input_field"
                type="text"
                name="clientName"
                onChange={formik.handleChange}
                placeholder="Client Name"
                value={formik.values.clientName}
                required
              />
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="clientmobile">Clinet Mobile</label>
              <input
                className="text_input_field"
                type="text"
                name="clientmobile"
                onChange={formik.handleChange}
                placeholder="Clinet Mobile"
                value={formik.values.clientmobile}
              />
            </div>

            <div className="col-md-6 inputfield">
              <label htmlFor="clientemail">Clinet Email</label>
              <input
                className="text_input_field"
                type="text"
                name="clientemail"
                onChange={formik.handleChange}
                placeholder="Client Email"
                value={formik.values.clientemail}
              />
            </div>
            <div className="col-md-6 inputfield">
              <label htmlFor="gender">Gender</label>

              <select
                name="gender"
                id="gender"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                required
              >
                <option value="male" selected>
                  Male
                </option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="clientCategory">
                Clinet Category
                <IoStarSharp className="reqired_symbole" />
              </label>

              <select
                name="clientCategory"
                id="clientCategory"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.clientCategory}
                onChange={(e) =>
                  formik.setFieldValue("clientCategory", e.target.value)
                }
              >
                <option value="">Choose Category</option>
                {ClientCatagoryList.length > 0 &&
                  ClientCatagoryList.map((CaNa) => (
                    <option value={CaNa.categoryName} key={CaNa.uuid}>
                      {CaNa.categoryName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-4 inputfield">
              <label htmlFor="clientCountry">Country</label>
              <select
                name="clientCountry"
                id="clientCountry"
                className="text_input_field"
                value={formik.values.clientCountryCode}
                onChange={(e) => {
                  formik.setFieldValue("clientCountryCode", e.target.value);
                  handleCountryChange(e.target.value);
                }}
              >
                <option value="">Choose Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 inputfield">
              <label htmlFor="clientState">State</label>
              <select
                name="clientState"
                id="clientState"
                className="text_input_field"
                value={formik.values.clientStateCode}
                onChange={(e) => {
                  formik.setFieldValue("clientStateCode", e.target.value);
                  handleStateChange(e.target.value);
                }}
              >
                <option value="">Choose State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 inputfield">
              <label htmlFor="clientCity">City</label>
              <select
                name="clientCity"
                id="clientCity"
                className="text_input_field"
                value={formik.values.clientCity}
                onChange={(e) =>
                  formik.setFieldValue("clientCity", e.target.value)
                }
              >
                <option value="">Choose City</option>
                {cities.map((city) => (
                  <option key={city.isoCode} value={city.isoCode}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-12 inputfield">
              <label htmlFor="clientAddress">Clinet Address</label>
              <input
                className="text_input_field"
                type="text"
                name="clientAddress"
                onChange={formik.handleChange}
                placeholder="Client Address"
                value={formik.values.clientAddress}
              />
            </div>

            <div className="col-md-12 inputfield">
              <h5>Description</h5>
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
                ADD Clent
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClinetList;
