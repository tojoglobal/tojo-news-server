import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../../../Component/Pagination/Pagination";
import { Link } from "react-router-dom";

const ClinetMessageCard = () => {
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 10;

  // client message
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
      .catch((err) => setErrorMessage(err.message)); // Set only the error message string
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(message.slice(startIndex, endIndex));
  }, [currentPage, message]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="col-sm-12 col-md-6">
        <div className="card card-chart">
          <div className="card-header">
            <h5 className="card-category">Client Message</h5>
          </div>
          <div className="card-body">
            {errorMessage && <p>{errorMessage}</p>} {/* Conditionally render errorMessage */}
            <table id="customers">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>SUBJECT</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 &&
                  paginatedData.map((ms, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          to={`/dashboard/message/${ms.uuid}`}
                          className="dashboard_text route_link"
                        >
                          {ms.Name}
                        </Link>
                      </td>
                      <td>{ms.Subject}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              totalItems={message.length}
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

export default ClinetMessageCard;
