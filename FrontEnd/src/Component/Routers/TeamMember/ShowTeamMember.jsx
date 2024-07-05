import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ShowTeamMember = () => {
  // Router
  const { id } = useParams();
  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [teamMember, setTeamMember] = useState([]);

  //Data Fetching
  useEffect(() => {
    axios
      .get(`https://api.tojoglobal.com/api/admin/teamMember/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setTeamMember({
            ...teamMember,
            name: result.data.Result[0].name,
            positionName: result.data.Result[0].position,
            check: result.data.Result[0].checkbox,
            img: result.data.Result[0].img,
            BioData: result.data.Result[0].BioData,
            facebookName: result.data.Result[0].FBurl,
            youtubeName: result.data.Result[0].YTurl,
            linkedinName: result.data.Result[0].LIurl,
            twitterName: result.data.Result[0].TWurl,
            WhatsAppNumber: result.data.Result[0].WhatsApurl,
          });
        } else {
          alert(result.data.Error);
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // id toggle
  const [activeId, setActiveId] = useState(null);
  const togglePopup = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  console.log(teamMember);
  return (
    <div className="container dashboard_All">
      <h5>
        <Link to="/dashboard/teamMember" className="route_link">
          {" "}
          <IoMdArrowRoundBack className="back_icon" /> Back
        </Link>
      </h5>
      <h1 className="dashboard_name">Team Member Info </h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="from_div">
        <div className="btn-text-right">
          <Link to={`/dashboard/teamMember/edit/${id}`}>
            <button className="button-62" type="button">
              Edit
            </button>
          </Link>
        </div>
        <br />
        {/* ++++++========part 3 =======++++++++ */}
        <div key={teamMember.uuid} className="grid_container_div">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span>Profile Image</span>
                </td>
                <td>
                  {" "}
                  <img
                    className="img-fluid"
                    src={`https://api.tojoglobal.com/Images/${teamMember.img}`}
                    alt={teamMember.img}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Name </span>
                </td>
                <td> {teamMember.name}</td>
              </tr>
              <tr>
                <td>
                  <span>Job Position </span>
                </td>
                <td>{teamMember.positionName}</td>
              </tr>
              <tr>
                <td>
                  <span> Number </span>
                </td>
                <td>{teamMember.WhatsAppNumber}</td>
              </tr>
              <tr>
                <td>
                  <span>Socail Media </span>
                </td>
                <td>
                  <ul className="member_social_links">
                    <li>
                      <a
                        href={`https://www.facebook.com/${teamMember.facebookName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebookSquare />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.linkedin.com/in/${teamMember.linkedinName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.twitter.com/${teamMember.twitterName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaXTwitter />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://wa.me/${teamMember.WhatsAppNumber}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaWhatsapp />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.youtube.com/${teamMember.youtubeName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Note</span>
                </td>
                <td>
                  <div>
                    <span>
                      <button
                        className="txt_btn_style"
                        onClick={() => togglePopup(teamMember.uuid)}
                      >
                        {activeId === teamMember.uuid
                          ? "Hide note"
                          : "Show note"}
                      </button>
                    </span>
                    {activeId === teamMember.uuid && (
                      <div className="popup">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(teamMember.BioData),
                          }}
                        ></div>
                        <button
                          className="txt_btn_style"
                          onClick={() => togglePopup(teamMember.uuid)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowTeamMember;
