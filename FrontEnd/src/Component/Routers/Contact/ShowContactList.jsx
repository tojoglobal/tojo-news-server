import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";

const ShowContactList = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/contactlist/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setContactInfo({
            contactName: result.data.Result[0].contactName,
            category: result.data.Result[0].category,
            mobileNo: result.data.Result[0].mobileNo,
            email: result.data.Result[0].eamil,
            note: result.data.Result[0].note,
          });
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
  }, [id]);

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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Contact Details</h1>
          <Link to={`/dashboard/contact/edit/${id}`}>
            <button
              className="inline-flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
              type="button"
            >
              Edit
            </button>
          </Link>
        </div>
        <hr className="border-gray-700 mb-6" />
        {errorMessage && (
          <div className="text-red-400 font-semibold mb-4">{errorMessage}</div>
        )}
        <div className="rounded-lg bg-[#181f33] p-6">
          <table className="min-w-full text-sm text-left text-white">
            <tbody>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Contact Name
                </td>
                <td className="py-2">{contactInfo.contactName}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Mobile No
                </td>
                <td className="py-2">{contactInfo.mobileNo}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">Email</td>
                <td className="py-2">{contactInfo.email}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Category
                </td>
                <td className="py-2">{contactInfo.category}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300 align-top">
                  Note
                </td>
                <td className="py-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(contactInfo.note || ""),
                    }}
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowContactList;
