import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const ShowFaq = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [faq , setFaq] = useState({}) 

 //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/faq/${id}`)
      .then((result) => {
        if (result.data.Status) {
            setFaq({
            ...faq,
            question: result.data.Result[0].question,
            answer: result.data.Result[0].answer,
          });
        } else {
          alert(result.data.Error);
          setErrorMessage(result.data.Error)
        }
      })
      .catch((err) => console.log(err));
  }, [id]);



  console.log(faq);
  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/faq" className="route_link">
          {" "}
          <IoMdArrowRoundBack className="back_icon" /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">FAQ </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/faq/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={faq.uuid} className="grid_container_div">
          <table className="table">
            <tbody>              
              <tr>
                <td>
                  <span>FAQ </span>
                </td>
                <td> {faq.question}</td>
              </tr>
              <tr>
                <td>
                  <span>FAQ Answer </span>
                </td>
                <td>{faq.answer}</td>
              </tr>                          

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowFaq;
