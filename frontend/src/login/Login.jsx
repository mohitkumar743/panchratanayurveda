import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [btnaction, setbtnaction] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  const token = localStorage.getItem("Authtoken");
  useEffect(() => {
    if (token) {
      navigate("/user/userPortal");
    }
  }, [navigate]);

  // Environment variable (using Vite-specific syntax)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State for login form
  const [signinData, setsigninData] = useState({
    mobilenumber: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setsigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnaction(true);

    axios
      .post(`${backendUrl}/user/login`, signinData)
      .then((response) => {
        const { token } = response.data;
        if (token) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have logged in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Save token and navigate
          localStorage.setItem("Authtoken", token);
          navigate("/user/userPortal");
        } else {
          Swal.fire({
            title: "Error",
            text: "Incorrect mobile number or password. Please try again.",
            icon: "error",
          });
        }

        // Reset form fields
        setsigninData({
          mobilenumber: "",
          password: "",
        });
        setbtnaction(false);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred. Please try again.";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h3 className="font-bold text-2xl text-center text-black">Login</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col space-y-3 text-black">
              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="mobilenumber"
                value={signinData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
              />

              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="password"
                name="password"
                value={signinData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />

              <button disabled={btnaction}
                className="w-full py-3 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200"
                type="submit"
              > {btnaction?"Please Wait":"Login"}
                
              </button>
            </div>
            <div className="text-center">
              <Link className="text-blue-500 hover:underline" to="/signup">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
