
// not in used in new project combined in home page
import React, { useState, useEffect } from "react";
import axios from "axios";

import ShopproductCard from "../Components/shopproduct";
function products() {
    const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
 


  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${backendUrl}/products`);

      // Add cartValue: 1 to each product
      const productsWithCartValue = data.map(product => ({
        ...product,
        cartValue: 1
      }));

      setProducts(productsWithCartValue);
    };

    fetchProducts();
    
  }, []);

  const handleClick = (product) => {
    // Check if the product is already in the cart
    // console.log(products)
    const isPresent = cart.some((cartItem) => cartItem._id === product._id);

    if (isPresent) {
      console.log("Product is already in the cart");
      alert("Product is already in the cart");
      return;
    }

    // If the product is not in the cart, add it
    setCart([...cart, product]);
    console.log("Product added to cart");
  };
  return (
    <>
      {/* <Navbar size={cart.length} cart={cart} setCart={setCart} setProducts={setProducts} /> */}
      <div className="App text-white max-h-[80vh]   overflow-x-auto">
        {/* <h1 className="text-center text-5xl">Products</h1> */}
        <div className="flex gap-4 px-4 md:justify-center justify-normal ">
          {products.map((product) => (
            <ShopproductCard
              key={product._id}
              product={product}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default products