import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function OrderCard({ order }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cancelbtn, setCancelBtn] = useState(false);

  useEffect(() => {
    document.title = "Orders || SHIPSHIP";
  });

  useEffect(() => {
    if (order.status === "delivered" || order.status === "Canceled") {
      setCancelBtn(false);
    } else {
      setCancelBtn(true);
    }
  }, [order.status]);

  const statusColor =
    order.status === "Canceled" ? "text-red-500" : "text-green-500";

  const handleCancelClick = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to cancel this product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        await axios.put(`${backendUrl}/order/cancel/${orderId}`, {
          status: "Canceled",
        });

        await Swal.fire({
          title: "Canceled!",
          text: "Your product has been canceled successfully.",
          icon: "success",
        });

        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      await Swal.fire({
        title: "Error",
        text: "There was an issue canceling your order. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="m-2 text-black h-auto flex flex-col">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
            <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
            <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
          </div>
          <p className="text-lg font-semibold">Order Details</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm md:text-base">
          <p>
            <strong>Order Date:</strong> {order.orderDate}
          </p>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Total:</strong> Rs.{order.total}
          </p>
        </div>

        <div className="border-2 border-cyan-200 p-3 rounded-lg mt-4">
          <h3 className="font-medium">User Details:</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 text-sm md:text-base">
            <p>
              <strong>Name:</strong> {order.userDetail.name}
            </p>
            <p>
              <strong>Email:</strong> {order.userDetail.email}
            </p>
            <p>
              <strong>Mobile:</strong> {order.userDetail.MobileNumber}
            </p>
          </div>
        </div>

        <div className="border-2 border-gray-200 p-3 rounded-lg mt-4">
          <h3 className="font-medium">Delivery Address:</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 text-sm md:text-base">
            <p>
              <strong>Name:</strong> {order.deliveryAddress.name}
            </p>
            <p>
              <strong>Street:</strong> {order.deliveryAddress.streetAddress}
            </p>
            <p>
              <strong>City:</strong> {order.deliveryAddress.city}
            </p>
            <p>
              <strong>State:</strong> {order.deliveryAddress.state}
            </p>
            <p>
              <strong>Postal Code:</strong> {order.deliveryAddress.postalCode}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
          <h3 className="font-medium">
            Payment Method: <strong>{order.paymentMethod}</strong>
          </h3>
          <h3 className="font-medium">
            Order Status: <span className={statusColor}>{order.status}</span>
          </h3>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Order Items:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded"
                />
                <div className="flex flex-col gap-1 text-sm md:text-base">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Brand:</strong> {item.brand}
                  </p>
                  <p>
                    <strong>Price:</strong> Rs.{item.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.cartValue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {cancelbtn && (
          <button
            onClick={() => handleCancelClick(order._id)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
