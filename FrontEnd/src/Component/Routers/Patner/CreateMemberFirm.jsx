import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateMemberFirm = () => {
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate()

  //  state
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // image file handle
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };
  //  use formike method
  const formik = useFormik({
    initialValues: {
      ImageTitle: "",
      file: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("ImageTitle", values.ImageTitle);
      formData.append("file", values.file);
      try {
        const response = await axios.post(
            'https://api.tojoglobal.com/api/admin/member/create',
            formData,
            {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
        )
        // console.log(response.data.Status);
        if(response.data.Status) {            
        setSuccessMessage("File uploaded successfully!");
        setErrorMessage(null);
        navigate('/dashboard/member')
        } 
      } catch (error) {
        setErrorMessage("Error uploading file. Please try again.");
        setSuccessMessage(null);
      }
      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Create member Image </h1>
      <hr />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* form start */}
      <div className="">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-3 inputFiledMiddel">
              <input
                className="text_input_field"
                type="text"
                name="ImageTitle"
                onChange={formik.handleChange}
                placeholder="Firm Name "
                value={formik.values.ImageTitle}
                required
              />
            </div>
            <div className="col-md-3 inputFiledMiddel">
              <label htmlFor="file">
                Upload image <FaCloudUploadAlt />
              </label>
              <input
                id="file"
                type="file"
                name="file"
                onChange={handleChange}
                accept=".jpg , .png"
                required
              />
            </div>
            <div className="col-md-3 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn "
                role="button"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <hr />
        <h5>Firm Member Image Preview</h5>
        <img src={file} alt="Preview" className="image_preview" />
      </div>
    </div>
  );
};

export default CreateMemberFirm;
