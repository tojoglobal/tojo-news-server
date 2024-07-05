import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(values)
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://api.tojoglobal.com/api/admin/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate('/dashboard')
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (

   <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="w-25 loginForm">        
        <h2 className="text-center">Login Admin</h2><br/>
        <div className="text-warning">{error && error}</div><br/>
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
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
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
