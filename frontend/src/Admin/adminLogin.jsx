import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AdminLogin() {
  useEffect(() => {
    document.title = "Admin Login || PANCHRATAN AYURVEDA";
  });

  const navigate = useNavigate();
  const [AdminData, setAdminData] = useState({
    mobilenumber: "",
    password: "",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setAdminData({
      ...AdminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${backendUrl}/user/admin`, AdminData)
      .then((response) => {
        if (response.data.token) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are logged in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("AdminAuthtoken", response.data.token); // Store token in localStorage
          navigate("/Admin/AdminPortal"); // Navigate to admin portal
        } else {
          Swal.fire({
            title: "Sorry",
            text: "Your mobile number or password is incorrect. Please try again.",
            icon: "error",
          });
        }
        setAdminData({
          mobilenumber: "",
          password: "",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Sorry",
          text: error.response?.data?.message || "An error occurred. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className="text-white text-3xl md:text-4xl font-semibold text-center pt-9">
        Welcome to the SHIPSHOP Admin Portal
      </div>
      <div className="flex justify-center items-center min-h-[75vh] p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md md:max-w-lg">
          <h3 className="font-bold text-2xl md:text-3xl text-center text-gray-700 mb-5">
            Admin Login
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="mobilenumber"
                value={AdminData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="password"
                name="password"
                value={AdminData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
            </div>
            <div>
              <button
                className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
                type="submit"
              >
                Admin Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
