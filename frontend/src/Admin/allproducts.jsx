import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPorduct from "../Admin/Adminshopproduct";
import Swal from "sweetalert2";

function AllProducts() {
  const [Products, SetProducts] = useState([]);
  const [btnaction, setbtnaction] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [productData, setProductData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    rating: 3.5,
    numReviews: 0,
    price: '',
    countInStock: '',
    reviews: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        const data = response.data;
        if (Array.isArray(data)) {
          SetProducts(data);
        } else {
          console.error("API did not return an array of products:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('AdminAuthtoken');
    setbtnaction(true);
    axios
      .post(`${backendUrl}/products/new`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(async (response) => {
        setbtnaction(false);
        if (!response.data.message) {
          Swal.fire({
            title: "Thank You ",
            text: "Product is Successfully Saved!",
            icon: "success",
          });
          setbtnaction(false);
          window.location.reload();
        } else {
          Swal.fire({
            title: "Sorry ",
            text: "There was an error while saving the product. Please try again later.",
            icon: "error",
          });
        }
        setProductData({
          name: '',
          imageUrl: '',
          brand: '',
          category: '',
          description: '',
          rating: 3.5,
          numReviews: 0,
          price: '',
          countInStock: '',
          reviews: [],
        });
        setIsModalOpen(false);
      });
  };

  // Delete Product function
  const handleDelete = async (id) => {
    const token = localStorage.getItem('AdminAuthtoken');
    try {
      const response = await axios.delete(`${backendUrl}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        Swal.fire({
          title: "Deleted",
          text: "Product has been deleted.",
          icon: "success",
        });
        SetProducts(Products.filter(product => product._id !== id));
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error deleting the product. Please try again later.",
        icon: "error",
      });
    }
  };

  // Update Product function
  const handleUpdate = (product) => {
    setProductData(product);
    setIsModalOpen(true); // Open modal to edit product
  };

  return (
    <>
      <div className="App text-black max-h-[74vh] overflow-y-auto">
        <div className="flex flex-row-reverse pr-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn text-black btn-outline bg-emerald-500 mt-2 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px]"
          >
            Add New Product
          </button>
        </div>
        <div className="p-[5vh] pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center justify-between">
              <div className="w-full flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded-md mb-4"
                />
                <h3 className="text-xl text-center mb-2">{product.name}</h3>
                <p className="text-sm text-center mb-4">{product.description}</p>
                <p className="font-bold mb-4">Rs. {product.price}</p>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <button
                  onClick={() => handleUpdate(product)}
                  className="bg-blue-500 text-black p-2 rounded-md w-full"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-black p-2 rounded-md w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <input
                type="number"
                name="countInStock"
                value={productData.countInStock}
                onChange={handleChange}
                placeholder="Count in Stock"
                className="w-full p-2 mb-2 border rounded text-sm sm:text-base md:text-lg"
              />
              <button
                type="submit"
                className="bg-emerald-500 text-black p-2 rounded w-full text-sm sm:text-base md:text-lg"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 p-2 border rounded text-gray-600 w-full mt-2 text-sm sm:text-base md:text-lg"
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

export default AllProducts;
