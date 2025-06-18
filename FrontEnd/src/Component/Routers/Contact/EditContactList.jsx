import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { IoStarSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const EditContactList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [ContactCatagoryList, setContactCatagoryList] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    contactName: "",
    category: "",
    mobileNo: "",
    email: "",
    note: "",
  });

  // fetch contact info by id
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/contactlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setContactInfo({
            contactName: result.data.Result[0].contactName || "",
            category: result.data.Result[0].category || "",
            mobileNo: result.data.Result[0].mobileNo || "",
            email: result.data.Result[0].eamil || "",
            note: result.data.Result[0].note || "",
          });
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
  }, [id]);

  // fetch category list
  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/contactCatagoryList")
      .then((result) => {
        if (result.data.Status) {
          setContactCatagoryList(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
  }, []);

  // formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contactName: contactInfo.contactName,
      category: contactInfo.category,
      mobileNo: contactInfo.mobileNo,
      email: contactInfo.email,
      note: contactInfo.note,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `https://api.tojoglobal.com/api/admin/contactlist/edit/${id}`,
          values
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Contact updated successfully`, {
            position: "top-right",
            duration: 3000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => {
            navigate("/dashboard/contact");
          }, 1300);
        }
      } catch (error) {
        setErrorMessage(String(error));
      }
      resetForm();
    },
  });

  return (
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="mb-4">
          <Link
            to="/dashboard/contact"
            className="inline-flex items-center gap-2 text-royal-indigo hover:underline font-semibold mb-2"
          >
            <IoMdArrowRoundBack className="text-lg" /> Back
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Edit Contact</h1>
        <hr className="border-gray-700 mb-6" />
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-medium mb-2"
            >
              Contact Name <IoStarSharp className="inline text-red-400" />
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              name="contactName"
              onChange={formik.handleChange}
              placeholder="Contact Name"
              value={formik.values.contactName}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category <IoStarSharp className="inline text-red-400" />
            </label>
            <select
              name="category"
              id="category"
              className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none transition"
              aria-label="Default select example"
              value={formik.values.category}
              onChange={(e) => formik.setFieldValue("category", e.target.value)}
              required
            >
              <option value="">Choose Category</option>
              {ContactCatagoryList.length > 0 &&
                ContactCatagoryList.map((CaNa) => (
                  <option value={CaNa.categoryName} key={CaNa.uuid}>
                    {CaNa.categoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium mb-2"
              >
                Mobile No
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="number"
                name="mobileNo"
                onChange={formik.handleChange}
                placeholder="Mobile No"
                value={formik.values.mobileNo}
                autoComplete="off"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#212b3a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                name="email"
                onChange={formik.handleChange}
                placeholder="Email"
                value={formik.values.email}
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Note</label>
            <Editor
              id="note"
              apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
              textareaName="note"
              initialValue={formik.values.note}
              value={formik.values.note}
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
              role="button"
            >
              UPDATE CONTACT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactList;
