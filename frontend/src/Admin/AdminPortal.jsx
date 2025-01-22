import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AllOrder from "./allorders";
import AllProduct from "./allproducts";

function AdminPortal() {
  useEffect(() => {
    document.title = "Admin Portal || PANCHRATAN AYURVEDA";
    document.body.style.overflow = "hidden"; // Disable scrolling on the whole page
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when leaving the component
    };
  }, []);

  const navigate = useNavigate();
  const [Product, setProduct] = useState(false);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("AdminAuthtoken");
    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have been logged out successfully.",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      navigate("/"); // Redirect to home page
    });
  };

  const handleproduct = () => {
    setProduct(true);
  };

  const handleorders = () => {
    setProduct(false);
  };

  return (
    <>
      <div>
        <div className="text-center text-black h-[10vh] flex flex-col md:flex-row items-center justify-between px-5 md:px-10">
          <div className="font-extrabold text-xl md:text-2xl">
            <Link to="/">PANCHRATAN AYURVEDA</Link>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button
              onClick={handleLogout}
              className="btn text-black btn-outline m-3 w-[100px]"
            >
              Logout
            </button>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="/user.png" alt="User Avatar" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-black text-center lg:mt-4 mt-11">
          <span className="navbar-user text-3xl">Welcome To Admin Panel</span>
        </div>
      </div>

      <div>
        <nav className="flex flex-col md:flex-row justify-evenly  h-13 items-center mt-5 text-black px-5 py-2 rounded-md">
          <div
            className={`cursor-pointer w-full md:w-[50%]  text-center py-2 md:py-0 ${
              Product ? "bg-red-200" : "bg-gray-400"
            }`} // Add conditional background color for "Total Products"
            onClick={handleproduct}
          >
            Total Products
          </div>
          <div
            className={`cursor-pointer w-full md:w-[50%]  text-center py-2 md:py-0 ${
              !Product ? "bg-green-100" : "bg-gray-400"
            }`} // Add conditional background color for "Orders"
            onClick={handleorders}
          >
            Orders
          </div>
        </nav>
      </div>

      <div
        className={`px-5 py-4 overflow-auto ${
          Product ? "bg-red-200" : "bg-green-200"
        }`} // Conditionally set background color
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {Product ? (
          <div className="text-black">
            <AllProduct />
          </div>
        ) : (
          <div className="text-black">
            <AllOrder />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPortal;
