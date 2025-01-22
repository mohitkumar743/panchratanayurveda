import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function OrderCard({ order, SetStatus }) {
  const statusColor = 
    order.status === "Canceled" ? "text-red-500" : 
    order.status === "delivered" ? "text-blue-800" : 
    "text-green-500";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("created");
  const [OrderId, setOrderId] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Update product handler
  const handleUpdateClick = (id) => {
    setOrderId(id);
    setIsModalOpen(true);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleeSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`${backendUrl}/order/updatestatus/${OrderId}`, { status: selectedStatus });
      setIsModalOpen(false);
      await Swal.fire({
        position: "center",
        icon: "success",
        text: `Product Status is Successfully Updated`,
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div className="m-2 text-black h-auto flex-col">
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col h-full">
          <div className="flex">
            <div className="flex gap-1">
              <div className="circle">
                <span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span>
              </div>
              <div className="ml-3 circle">
                <p><strong>Order Details</strong></p>
              </div>
            </div>
          </div>

          <div className="product-card flex flex-col flex-grow">
            <div className="flex flex-col gap-5 mb-4">
              <p><strong>Order Date:</strong> {order?.orderDate}</p> {/* Display raw date */}
              <p><strong>Order ID:</strong> {order?._id}</p>
              <p><strong>Total:</strong> Rs.{order?.total}</p>
            </div>

            {order?.userDetail && (
              <div className="flex flex-wrap gap-5 border-2 border-cyan-200 p-4 w-full sm:w-auto">
                <h3 className="w-full sm:w-auto">User Details:</h3>
                <p><strong>Name:</strong> {order.userDetail.name}</p>
                <p><strong>Email:</strong> {order.userDetail.email}</p>
                <p><strong>Mobile Number:</strong> {order.userDetail.MobileNumber}</p>
              </div>
            )}

            {order?.deliveryAddress && (
              <div className="flex flex-wrap gap-5 border-2 border-gray-200 p-4 w-full sm:w-auto">
                <h3 className="w-full sm:w-auto">Delivery Address:</h3>
                <p><strong>Name:</strong> {order.deliveryAddress.name}</p>
                <p><strong>Street Address:</strong> {order.deliveryAddress.streetAddress}</p>
                <p><strong>City:</strong> {order.deliveryAddress.city}</p>
                <p><strong>State:</strong> {order.deliveryAddress.state}</p>
                <p><strong>Postal Code:</strong> {order.deliveryAddress.postalCode}</p>
              </div>
            )}

            <div className="payment-method flex flex-wrap gap-5 items-center">
              <h3 className="w-full sm:w-auto">Payment Method: <strong>{order.paymentMethod}</strong></h3>
              <h3 className="w-full sm:w-auto">Order Status: <strong><span className={statusColor}>{order.status}</span></strong></h3>
            </div>

            <div>
              <h3>Order Items</h3>
              <div className="order-items flex flex-wrap justify-start gap-4">
                {order.items?.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-[48%] lg:w-[30%]">
                    <img src={item.image} alt={item.name} className="item-image h-20 w-20 object-cover rounded" />
                    <div className="flex flex-col gap-2 item-info w-full">
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Brand:</strong> {item.brand}</p>
                      <p><strong>Rating:</strong> {item.rating}</p>
                      <p><strong>Price:</strong> Rs.{item.price}</p>
                      <p><strong>Quantity:</strong> {item.cartValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button at the bottom */}
            <div className="mt-auto">
              <button onClick={() => handleUpdateClick(order._id)} className="btn text-white btn-outline bg-green-500 w-full mt-4">
                Update Product Status
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 text-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[300px]">
            <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
            <form onSubmit={handleeSubmit}>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="created">Created</option>
                <option value="processed">Processed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <button type="submit" className="bg-green-500 text-white p-2 rounded w-full mb-2">
                Update Status
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 p-2 border rounded text-gray-600 w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderCard;
