import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";

const ShowMessage = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientMessage, setClientMessage] = useState({});

  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/clientMessage/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setClientMessage({
            Name: result.data.Result[0].Name,
            Email: result.data.Result[0].Email,
            phoneNumber: result.data.Result[0].phoneNumber,
            Subject: result.data.Result[0].Subject,
            message: result.data.Result[0].message,
          });
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(String(err)));
    // eslint-disable-next-line
  }, [id, state.port]);

  return (
    <div className="bg-[#101829] min-h-screen flex flex-col items-center px-2 md:px-0 py-6 text-white transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[#172133] rounded-xl shadow-lg p-8">
        <div className="mb-4">
          <Link
            to="/dashboard/message/"
            className="inline-flex items-center gap-2 text-royal-indigo hover:underline font-semibold mb-2"
          >
            <IoMdArrowRoundBack className="text-lg" /> Back
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Client Details</h1>
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
                <td className="py-2">{clientMessage.Name}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Contact Email
                </td>
                <td className="py-2">{clientMessage.Email}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Contact Number
                </td>
                <td className="py-2">
                  {clientMessage.phoneNumber
                    ? `+${clientMessage.phoneNumber}`
                    : ""}
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300">
                  Subject
                </td>
                <td className="py-2">{clientMessage.Subject}</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 font-semibold text-gray-300 align-top">
                  Message
                </td>
                <td className="py-2">{clientMessage.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowMessage;
