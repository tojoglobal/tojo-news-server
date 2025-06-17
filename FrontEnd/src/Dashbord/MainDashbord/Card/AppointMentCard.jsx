import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Pagination from "../../../Component/Pagination/Pagination";
import { Link } from "react-router-dom";

const AppointMentCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [appointment, setAppointment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://api.tojoglobal.com/api/admin/appointment")
      .then((result) => {
        if (result.data.Status) {
          setAppointment(result.data.Result);
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
    setPaginatedData(appointment.slice(startIndex, endIndex));
  }, [currentPage, appointment]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-xl bg-gradient-to-tr from-[#22263a] to-[#22283f] shadow-lg p-4 md:p-6 border border-[#2c324b]/60">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-blue-300">
          LATEST NEWS from Tojoglobal
        </h5>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200">
          <thead>
            <tr className="bg-[#23263a]">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 &&
              paginatedData.map((ms) => (
                <tr key={ms.uuid} className="hover:bg-[#26304d]/60 transition">
                  <td className="py-2 px-3">
                    <Link
                      to={`/dashboard/appointment/${ms.uuid}`}
                      className="text-blue-400 hover:text-blue-200 font-semibold"
                    >
                      {ms.problemTitle}
                    </Link>
                  </td>
                  <td className="py-2 px-3">
                    {ms.ApoDate
                      ? dayjs(ms.ApoDate).format(`DD MMM , YYYY`)
                      : ""}{" "}
                    <br /> {ms.ApoTime}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={appointment.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AppointMentCard;
