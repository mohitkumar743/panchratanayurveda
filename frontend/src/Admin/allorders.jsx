
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminOrders from "../Admin/adminorders";
import Swal from "sweetalert2";

function allorders() {
 
  const [Orders, SetOrders] = useState([]);
  const [btnaction, setbtnaction] = useState(false);
  const [Status, SetStatus] = useState("created");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const [productData, setProductData] = useState({
  //   name: '',
  //   image: '',
  //   brand: '',
  //   category: '',
  //   description: '',
  //   rating: 3.5,
  //   numReviews:0,
  //   price: '',
  //   countInStock: '',
  //   reviews: [],
  // });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/order`);
        const data = response.data; // Assuming the API response has a 'data' property containing the array
        console.log(data);
        
        // Ensure 'data' is an array before setting state
        if (Array.isArray(data)) {
          // Sort orders by 'orderDate' in descending order (latest first)
          const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          SetOrders(sortedOrders);
        } else {
          console.error("API did not return an array of products:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);

  // const handleChange = (e) => {
  //   setProductData({
  //     ...productData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Logic to submit the form data to the server
  //   console.log(productData)
  //   const token = localStorage.getItem('AdminAuthtoken');
  //   setbtnaction(true);
  //   axios
  //     .post("http://localhost:5000/products/new", productData,{
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(async(response) => {
  //       setbtnaction(false);
  //       if(!response.data.message){
  //       Swal.fire({
  //         title: "Thank You ",
  //         text: "Product is Sucessfully Saved !",
  //         icon: "success",
  //       });
  //       setbtnaction(false);
  //     }else{
  //               Swal.fire({
  //                 title: "sorrry ",
  //                 text: " There was an error while saving the product please try later",
  //                 icon: "error",
  //               });

  //       };
  //             setProductData({
  //               name: '',
  //               imageUrl: '',
  //               brand: '',
  //               category: '',
  //               description: '',
  //               rating: 3.5,
  //               numReviews:0,
  //               price: '',
  //               countInStock: '',
  //               reviews: [],
  //             });
  //   console.log(productData);
  //   setIsModalOpen(false);
  // })};


  return (
    <>

<div className="App text-white max-h-[74vh] overflow-y-auto">
        {/* <div className="flex flex-row-reverse pr-5">
          <button
            // onClick={() => setIsModalOpen(true)}
            className="btn text-white btn-outline bg-emerald-500 mt-2 w-[150px]"
          >
            Add new Product
          </button>
        </div>  */}
         <div className="p-[5vh] pt-2">
          {Orders.map((Order) => (
            <AdminOrders
              key={Order._id}
              order={Order}
              SetStatus={SetStatus}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                placeholder="Count in Stock"
                className="w-full p-2 mb-2 border rounded"
              />
              {/* Reviews array can be handled separately or with a text area */}
              <button
                type="submit"
                className="bg-emerald-500 text-white p-2 rounded"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 p-2 border rounded text-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    
    
    </>
  )
}

export default allorders