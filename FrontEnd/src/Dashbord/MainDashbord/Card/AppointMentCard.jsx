import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Pagination from "../../../Component/Pagination/Pagination";
import { Link } from "react-router-dom";

const AppointMentCard = () => {
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [appointment, setAppointment] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  // fetch data
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
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(appointment.slice(startIndex, endIndex));
  }, [currentPage, appointment]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="col-sm-12 col-md-6">
        <div className="card card-chart">
          <div className="card-header">
            <h5 className="card-category">Appointment</h5>
          </div>
          <div className="card-body">
            <p>{errorMessage}</p>
            <table id="customers">
              <tr>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Contact Name</th>
              </tr>
              {paginatedData.length > 0 &&
                paginatedData.map((ms) => (
                  <tr key={ms.uuid}>
                    <td>{ms.problemTitle}</td>
                    <td>
                      {ms.ApoDate
                        ? dayjs(ms.ApoDate).format(`DD MMM , YYYY`)
                        : ""}{" "}
                      <br /> {ms.ApoTime}
                    </td>

                    <td>
                      <Link
                        to={`/dashboard/appointment/${ms.uuid}`}
                        className="dashbord_text"
                      >
                        {ms.contactName}
                      </Link>
                    </td>
                  </tr>
                ))}
            </table>
            <Pagination
              totalItems={appointment.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointMentCard;
