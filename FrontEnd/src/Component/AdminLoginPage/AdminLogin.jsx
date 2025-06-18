import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./../../Dashbord/SmallComponent/AppContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      agree: false,
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    setError(null);
    axios
      .post(`${state.port}/api/adminlogin`, values)
      .then((result) => {
        setLoading(false);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          toast.success("Login Successful!");
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
          toast.error(
            result.data.Error || "Login Failed. Invalid credentials."
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0647] to-[#4427ad] relative overflow-hidden">
      {/* Optional SVG lines background */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.12"
          d="M0 300 Q720 100 1440 300"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          opacity="0.08"
          d="M0 500 Q720 700 1440 500"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          opacity="0.08"
          d="M0 800 Q720 900 1440 800"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
      <div className="relative z-10 w-full max-w-sm bg-[#18116a]/[.97] rounded-2xl border border-[#9996dc] shadow-2xl p-5 flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-8 font-sans tracking-wide">
          Login Admin
        </h2>
        {error && (
          <div className="text-red-400 text-sm text-center mb-2">{error}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-3 py-2 rounded-md bg-[#f6f8ff] text-black text-base border-none outline-none font-medium ${
                errors.email ? "ring-2 ring-red-400" : ""
              }`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-3 py-2 rounded-md bg-[#f6f8ff] text-black text-base border-none outline-none font-medium ${
                errors.password ? "ring-2 ring-red-400" : ""
              }`}
            />
            <button
              type="button"
              aria-label="Toggle Password"
              tabIndex={-1}
              className="absolute cursor-pointer top-[71%] right-2 -translate-y-1/2 text-gray-500 hover:text-[#6a8cff] focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            className="w-full cursor-pointer rounded-md text-white font-bold py-2 mt-1 mb-1 transition disabled:opacity-60 bg-gradient-to-r from-[#a259ff] to-[#01cfff] text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? <span>Logging In...</span> : "Log In"}
          </button>
          {/* Checkbox for design only, NOT required */}
          <div className="flex items-center mt-1">
            <input
              type="checkbox"
              id="tick"
              {...register("agree")}
              className="accent-[#6a8cff] mr-2"
            />
            <label
              htmlFor="tick"
              className="text-white text-sm cursor-pointer select-none"
            >
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
