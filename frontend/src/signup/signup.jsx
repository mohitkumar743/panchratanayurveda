import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Signup() {
  // Environment variable (using Vite-specific syntax)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    document.title = "Signup || PANCHRATAN AYURVEDA";
  });

  const [btnaction, setbtnaction] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobilenumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnaction(true);

    axios
      .post(`${backendUrl}/user/new`, formData)
      .then((response) => {
        setbtnaction(false);
        if (!response.data.message) {
          Swal.fire({
            title: "Thank You ",
            text: "You are successfully registered!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Sorry",
            text: "User already has an account. Please log in.",
            icon: "error",
          });
        }
        setFormData({
          name: "",
          mobilenumber: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error.response.data);
        Swal.fire({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });
        setbtnaction(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h3 className="font-bold text-2xl text-center text-black">
            Registration Form
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col space-y-3 text-black">
              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Full Name"
              />

              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="text"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
              />

              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
              />

              <input
                className="w-full rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />

              <button
                disabled={btnaction}
                className={`w-full py-3 rounded-md text-white font-semibold transition duration-200 ${
                  btnaction ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
                type="submit"
              >
                {btnaction ? "Please Wait..." : "Signup"}
              </button>
            </div>

            <div className="text-center">
              <Link className="text-blue-500 hover:underline" to="/Login">
                Sign In Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
