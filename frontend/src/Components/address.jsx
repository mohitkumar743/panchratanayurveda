import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddressPage() {
  const [btnaction, setbtnaction] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // Retrieve order details from location state

  const [form, setForm] = useState({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setbtnaction(true);

    // Merge form data with order details
    const fullOrder = {
      ...order,
      deliveryAddress: form,
    };
    setbtnaction(false);
    alert("Address submitted successfully!");

    // Navigate to the payment page with full order data
    navigate("/payment", { state: { fullOrder } });
  };

  // Check for missing order or order data
  if (!order) {
    return <p className="text-center mt-10 text-lg">No order details available.</p>;
  }

  return (
    <div className="address-page flex flex-col lg:flex-row text-black min-h-screen bg-gray-100">
      {/* Left Section: Order Details */}
      <div className="lg:w-1/2 w-full p-5 bg-white shadow-md">
        <h1 className="font-bold text-2xl mb-5 text-gray-800">Order Details</h1>
        <div className="mb-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700">Order Date:</td>
                <td className="border px-4 py-2 text-gray-600">{order.orderDate || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1 className="font-bold text-2xl mb-5 text-gray-800">User Details</h1>
        <div className="mb-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700">User Name:</td>
                <td className="border px-4 py-2 text-gray-600">{order.userDetail?.name || "N/A"}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold text-gray-700">Mobile Number:</td>
                <td className="border px-4 py-2 text-gray-600">{order.userDetail?.MobileNumber || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-lg mb-3 text-gray-800">Items:</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.name || "N/A"}</td>
                  <td className="border px-4 py-2">Rs. {item.price || 0}</td>
                  <td className="border px-4 py-2">{item.cartValue || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="font-bold text-right mt-5 text-xl text-gray-800">
          Total Price: Rs. {order.total || 0}
        </h1>
      </div>

      {/* Right Section: Address Form */}
      <div className="lg:w-1/2 w-full bg-gray-200 p-10 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Delivery Address</h2>
          <form onSubmit={handleSubmit}>
            {["name", "streetAddress", "city", "state", "postalCode"].map((field) => (
              <div key={field} className="mb-5">
                <label
                  htmlFor={field}
                  className="block text-gray-700 text-sm font-semibold mb-2 capitalize"
                >
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="text"
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  required
                />
              </div>
            ))}
            <button disabled={btnaction}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="submit"
            > {btnaction?"Please Wait":"Submit Address"}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddressPage;
