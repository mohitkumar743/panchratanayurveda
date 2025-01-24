// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// function Payment() {
//   const location = useLocation();
//   const { fullOrder } = location.state || {};
//   const navigate = useNavigate();
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   const handleCardDetailChange = (e) => {
//     const { name, value } = e.target;
//     setCardDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedOrder = {
//       ...fullOrder,
//       paymentMethod: selectedPaymentMethod,
//       cardDetails: selectedPaymentMethod === "Card" ? cardDetails : null,
//     };

//     try {
//       const response = await axios.post(`${backendUrl}/order/new`, updatedOrder);
//       console.log("Order saved:", response.data);
//       await Swal.fire({
//         icon: "success",
//         title: "Successful!",
//         text: `Your order is placed successfully and your order ID is ${response.data._id}`,
//       });
//       navigate("/login");
//     } catch (error) {
//       console.error("Error saving order:", error);
//     }
//   };

//   const codhandleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedOrder = {
//       ...fullOrder,
//       paymentMethod: selectedPaymentMethod,
//     };

//     try {
//       const response = await axios.post(`${backendUrl}/order/new`, updatedOrder);
//       console.log("Order saved:", response.data);
//       await Swal.fire({
//         icon: "success",
//         title: "Successful!",
//         text: `Your order is placed successfully and your order ID is ${response.data._id}`,
//       });
//       navigate("/login");
//     } catch (error) {
//       console.error("Error saving order:", error);
//     }
//   };

//   return (
//     <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-800">
//       <h2 className="font-bold text-2xl text-white mb-6 text-center">
//         Payment Method
//       </h2>

//       <div className="flex flex-wrap gap-4 justify-center mb-8">
//         <button
//           onClick={() => setSelectedPaymentMethod("Card")}
//           className={`py-2 px-6 rounded-lg text-center w-40 ${
//             selectedPaymentMethod === "Card"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-black"
//           }`}
//         >
//           Card
//         </button>
//         <button
//           onClick={() => setSelectedPaymentMethod("COD")}
//           className={`py-2 px-6 rounded-lg text-center w-40 ${
//             selectedPaymentMethod === "COD"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-black"
//           }`}
//         >
//           Cash on Delivery (COD)
//         </button>
//       </div>

//       {selectedPaymentMethod === "COD" && (
//         <div className="flex justify-center">
//           <button
//             onClick={codhandleSubmit}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Pay Now
//           </button>
//         </div>
//       )}

//       {selectedPaymentMethod === "Card" && (
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md"
//         >
//           <div className="mb-4">
//             <label className="block text-white text-sm font-bold mb-2">
//               Card Number:
//             </label>
//             <input
//               type="text"
//               name="cardNumber"
//               value={cardDetails.cardNumber}
//               onChange={handleCardDetailChange}
//               placeholder="Enter your card number"
//               className="w-full p-3 rounded-lg shadow-inner border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <div className="flex-1 mb-4">
//               <label className="block text-white text-sm font-bold mb-2">
//                 Expiry Date:
//               </label>
//               <input
//                 type="text"
//                 name="expiryDate"
//                 value={cardDetails.expiryDate}
//                 onChange={handleCardDetailChange}
//                 placeholder="MM/YY"
//                 className="w-full p-3 rounded-lg shadow-inner border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex-1 mb-4">
//               <label className="block text-white text-sm font-bold mb-2">
//                 CVV:
//               </label>
//               <input
//                 type="text"
//                 name="cvv"
//                 value={cardDetails.cvv}
//                 onChange={handleCardDetailChange}
//                 placeholder="Enter CVV"
//                 className="w-full p-3 rounded-lg shadow-inner border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Pay Now
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Payment;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Payment() {
  const [btnaction, setbtnaction] = useState(false);
  const location = useLocation();
  const { fullOrder } = location.state || {};
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...fullOrder,
      paymentMethod: selectedPaymentMethod,
      cardDetails: null, // Card method temporarily unavailable
    };

    try {
      const response = await axios.post(`${backendUrl}/order/new`, updatedOrder);
      console.log("Order saved:", response.data);
      await Swal.fire({
        icon: "success",
        title: "Successful!",
        text: `Your order is placed successfully and your order ID is ${response.data._id}`,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const codhandleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...fullOrder,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const response = await axios.post(`${backendUrl}/order/new`, updatedOrder);
      console.log("Order saved:", response.data);
      await Swal.fire({
        icon: "success",
        title: "Successful!",
        text: `Your order is placed successfully and your order ID is ${response.data._id}`,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h2 className="font-bold text-2xl text-white mb-6 text-center">
        Payment Method
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button disabled={btnaction}
          onClick={() => setSelectedPaymentMethod("Card")}
          className={`py-2 px-6 rounded-lg text-center w-40 ${
            selectedPaymentMethod === "Card"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Card
        </button>
        <button disabled={btnaction}
          onClick={() => setSelectedPaymentMethod("COD")}
          className={`py-2 px-6 rounded-lg text-center w-40 ${
            selectedPaymentMethod === "COD"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        > {btnaction?"Please Wait":"Login"}
          Cash on Delivery (COD)
        </button>
      </div>

      {selectedPaymentMethod === "COD" && (
        <div className="flex justify-center">
          <button disabled={btnaction}
            onClick={codhandleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          > {btnaction?"Please Wait":"Place Order"}
            
          </button>
        </div>
      )}

      {selectedPaymentMethod === "Card" && (
        <div className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md">
          <p className="text-white text-center font-bold text-lg mb-4">
            The card payment option is temporarily unavailable. Please use the
            Cash on Delivery (COD) method.
          </p>
        </div>
      )}
    </div>
  );
}

export default Payment;
