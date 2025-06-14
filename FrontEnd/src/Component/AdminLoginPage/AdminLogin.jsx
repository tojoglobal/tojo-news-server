import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./../../Dashbord/SmallComponent/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  axios.defaults.withCredentials = true;
  //state
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${state.port}/api/adminlogin`, values)
      .then((result) => {
        console.log(result.data);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          setError(result.data.Error);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: result.data.Error || "Invalid credentials",
          });
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="loginForm">
        <h2 className="text-center">Login Admin</h2>
        <br />
        <div className="text-warning">{error && error}</div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Admin Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3 passwordFiled">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
            <div
              className="passwordToggleEye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="custombtn">Log in</button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
