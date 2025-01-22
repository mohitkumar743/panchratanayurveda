import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./userNavbar";
import axios from "axios";
import UserOrders from "./userorders";

function MyOrders({ Userdata }) {
  const location = useLocation();
  const UserData = location.state?.Userdata; // Access the Userdata from state
  const [Orders, SetOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      console.log(UserData);
      try {
        const response = await axios.get(
          `${backendUrl}/order/myorder/${UserData._id}`
        );
        const data = response.data;

        if (Array.isArray(data)) {
          SetOrders(data); // Store data in state
        } else {
          console.error("API did not return an array of orders:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [UserData]);

  // Sort orders before rendering
  const sortedOrders = [...Orders].sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  return (
    <>
      <Navbar />
      <div className="text-black text-center text-2xl">My Orders</div>

      <div className="p-[5vh] pt-2 h-[80vh] overflow-y-scroll">
        {sortedOrders.map((Order) => (
          <UserOrders
            key={Order._id}
            order={Order}
            formattedDate={formatDate(Order.orderDate)}
          />
        ))}
      </div>
    </>
  );
}

export default MyOrders;
