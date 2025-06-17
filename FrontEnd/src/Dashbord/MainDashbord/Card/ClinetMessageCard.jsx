import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../../Component/Pagination/Pagination";
import { Link } from "react-router-dom";

const ClinetMessageCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/clientMessage")
      .then((result) => {
        if (result.data.Status) {
          setMessage(result.data.Result);
          setPaginatedData(result.data.Result.slice(0, itemsPerPage));
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(message.slice(startIndex, endIndex));
  }, [currentPage, message]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-xl bg-gradient-to-tr from-[#22263a] to-[#22283f] shadow-lg p-4 md:p-6 border border-[#2c324b]/60">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-blue-300">
          Client Mail from Tojoglobal
        </h5>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200">
          <thead>
            <tr className="bg-[#23263a]">
              <th className="py-2 px-3">NAME</th>
              <th className="py-2 px-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 &&
              paginatedData.map((ms, i) => (
                <tr key={i} className="hover:bg-[#26304d]/60 transition">
                  <td className="py-2 px-3">
                    <Link
                      to={`/dashboard/message/${ms.uuid}`}
                      className="text-blue-400 hover:text-blue-200 font-semibold"
                    >
                      {ms.Name}
                    </Link>
                  </td>
                  <td className="py-2 px-3">{ms.Email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={message.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ClinetMessageCard;
