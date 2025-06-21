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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] relative overflow-hidden px-4 py-10">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0B213A] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#234E52] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0A3D62] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-7 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-6 sm:mb-8 font-sans tracking-wide">
          Admin <span className="text-[#A7A890]">Login</span>
        </h2>
        {error && (
          <div className="bg-red-900 bg-opacity-40 text-red-300 text-sm text-center p-3 rounded-lg mb-5 border border-red-800">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^\S+@\S+$/i,

                  message: "Invalid email address",
                },
              })}
              className={`w-full px-5 py-3 rounded-lg bg-white/10 text-gray-100 text-base border border-white/20 outline-none focus:border-[#4B8B9B] transition-all duration-300 placeholder:text-gray-400 ${
                errors.email ? "ring-2 ring-red-500 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-sm text-red-400 mt-2 block">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-200 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-5 py-3 rounded-lg bg-white/10 text-gray-100 text-base border border-white/20 outline-none focus:border-[#4B8B9B] transition-all duration-300 placeholder:text-gray-400 ${
                errors.password ? "ring-2 ring-red-500 border-red-500" : ""
              }`}
            />
            <button
              type="button"
              aria-label="Toggle Password Visibility"
              tabIndex={-1}
              className="absolute cursor-pointer top-[67%] right-4 -translate-y-1/2 text-gray-400 hover:text-[#7EB5C2] focus:outline-none transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            {errors.password && (
              <span className="text-sm text-red-400 mt-2 block">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* Login Button */}
          <button
            className="w-full cursor-pointer rounded-lg text-white font-bold py-3 mt-4 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#216A7A] to-[#4B8B9B] hover:from-[#4B8B9B] hover:to-[#216A7A] focus:outline-none focus:ring-2 focus:ring-[#7EB5C2] focus:ring-offset-2 focus:ring-offset-[#0D1B2A] text-lg shadow-md hover:shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging In...
              </span>
            ) : (
              "Secure Login"
            )}
          </button>
          {/* Agree Checkbox */}
          <div className="flex items-center mt-1 justify-center">
            <input
              type="checkbox"
              id="agree"
              {...register("agree")}
              className="form-checkbox h-5 w-5 text-[#4B8B9B] border-white/20 rounded focus:ring-[#7EB5C2] bg-white/10 cursor-pointer"
            />
            <label
              htmlFor="agree"
              className="ml-3 text-gray-300 text-sm cursor-pointer select-none"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[#7EB5C2] hover:underline focus:outline-none focus:ring-1 focus:ring-[#7EB5C2] rounded"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
