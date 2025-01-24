import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./home.css";
import Advertisingbar from "../Components/advertisingbar";
import Slidebar from "../Components/slidebar";
import Product from "../Components/products";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import ShopproductCard from "./shopproduct";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    document.title = "Home || PANCHRATAN AYURVEDA";
  });
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${backendUrl}/products`);

      // Add cartValue: 1 to each product
      const productsWithCartValue = data.map((product) => ({
        ...product,
        cartValue: 1,
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
      <Advertisingbar />
      <Navbar
        size={cart.length}
        cart={cart}
        setCart={setCart}
        setProducts={setProducts}
      />
      <Slidebar />
      <div className="h-[90vh]  ">
        <h1 className="font-bold text-3xl my-5 pl-11">Products In Demand</h1>
        {/* <Product /> */}
        <div className="App text-black max-h-fit">
          {/* <h1 className="text-center text-5xl">Products</h1> */}
          <div className="flex gap-x-4 overflow-x-auto scrollbar scrollbar-none scrollbar-track-gray-200">
            {products.map((product) => (
              <ShopproductCard
                key={product._id}
                product={product}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* imunity booster */}
      <div className="h-fit  flex justify-center items-center flex-col">
        <div className="flex w-full h-full flex-col md:flex-row">
          {" "}
          {/* Flex direction changes on medium screens and above */}
          {/* 40% width div */}
          <div className="w-[100%] md:w-[40%] p-10 flex justify-center items-center">
            <img
              src="/categery/booster.png" // Image path from the public folder
              alt="Booster"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* 60% width div */}
          <div className="w-full md:w-[60%] flex justify-center  items-center">
            <div className="text-black text-center">
              <h2 className="text-2xl md:w-[90%] px-5 md:px-1   font-bold mb-4">
                Immunity Booster
              </h2>
              <p className="text-sm md:w-[90%] px-5 md:px-1  text-center mb-2">
                Improve your health and boost your immune system with our
                immunity care products. Our collection includes: Aloe Vera
                Juice, Tulsi Juice, and Giloy Juice. These natural blends are
                carefully crafted to strengthen your body's defenses and enhance
                your overall well-being using high-quality natural ingredients.
              </p>
              <p className="text-sm md:w-[90%] px-5 md:px-1  text-center mb-2">
                We prioritize your well-being and ensure that our products are
                free from artificial additives. With our Aloe Vera Juice, Tulsi
                Juice, and Giloy Juice, you can conveniently enhance your immune
                system and support your overall health. Experience the power of
                nature and give your body the care it deserves.
              </p>
              <div className="flex md:w-[90%]  px-5 md:px-1 justify-center mt-4">
                <button
                  // onClick={() => handleClick(product)}
                  className="btn text-black btn-outline mb-2"
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* imunity booster ends here */}

      {/* bueaty product starts */}

      <div className="h-fit flex justify-center items-center flex-col">
        <div className="flex w-full h-full flex-col md:flex-row">
          {/* Image div */}
          <div className="w-full md:w-[40%] p-10 flex justify-center items-center order-first md:order-last">
            <img
              src="/categery/bueitycare.png" // Image path from the public folder
              alt="Booster"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Text div */}
          <div className="w-full md:w-[60%] flex justify-center items-center order-last md:order-first ">
            <div className="text-black text-center">
              <h2 className="text-2xl md:w-[90%] px-5 md:px-1 font-bold mb-4">
                Personal & Beauty Care
              </h2>
              <p className="text-sm md:w-[90%] px-5 md:px-1 text-center mb-2">
                Pair text with an image to focus on your chosen product,
                collection, or blog post. Add details on availability, style, or
                even provide a review.
              </p>

              <div className="flex md:w-[90%] px-5 md:px-1 justify-center mt-4">
                <button
                  // onClick={() => handleClick(product)}
                  className="btn text-black btn-outline mb-2"
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile shown only starts */}
      {/* for mobile shown only ends */}
      {/* bueaty product starts */}

      {/* healthcare started */}
      <div className="h-fit flex justify-center items-center flex-col">
        <div className="flex w-full h-full flex-col md:flex-row">
          {" "}
          {/* Flex direction changes on medium screens and above */}
          {/* 40% width div */}
          <div className="w-[100%] md:w-[40%] p-10 flex justify-center items-center">
            <img
              src="/categery/healthcare.png" // Image path from the public folder
              alt="Booster"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* 60% width div */}
          <div className="w-full md:w-[60%] flex justify-center  items-center">
            <div className="text-black text-center">
              <h2 className="text-2xl md:w-[90%] px-5 md:px-1   font-bold mb-4">
                Health Care
              </h2>
              <p className="text-sm md:w-[90%] px-5 md:px-1  text-center mb-2">
                Sumuglobal Health Care products help in relieving physical
                ailments like joint pains, piles problems, cadio control as well
                as provide a safe and healthy means of weight management and
                nutrition supplementation
              </p>

              <div className="flex md:w-[90%]  px-5 md:px-1 justify-center mt-4">
                <button
                  // onClick={() => handleClick(product)}
                  className="btn text-black btn-outline mb-2"
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* healthcare ended */}

      <div className="h-fit pb-10 bg-red-400 flex flex-col sm:flex-row justify-center items-center px-4 sm:px-10">
        {/* Left Part: Logo */}
        <div className="w-full sm:w-1/2 flex justify-center items-center mb-6 sm:mb-0">
          <img
            src="/icon.png" // Replace with your logo URL
            alt="Logo"
            className="h-40 w-40 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain "
          />
        </div>

        {/* Right Part: Subscription Content */}
        <div className="w-full sm:w-1/2 flex flex-col items-center">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-4 text-center">
            SUBSCRIBE TO OUR EMAILS
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl mt-4 text-center">
            Be the first to know about new collections and exclusive offers.
          </h2>
          <div className="h-[8vh] w-full max-w-md mt-5 text-black flex items-center px-4 border-2 border-black rounded-lg bg-white shadow-lg">
            <p className="text-sm sm:text-base flex-grow">Email</p>
            <button className="text-black">
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[30vh] bg-black relative">
        <h1 className="text-2xl text-white pt-10 text-center font-thin ml-2">
          QUICK LINKS
        </h1>
        <div className="flex flex-row justify-center gap-3 ">
          <a
            href="#about-us"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            About Us
          </a>
          <a
            href="#privacy-policy"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#refund-policy"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            Refund Policy
          </a>
          <a
            href="#shipping-policy"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            Shipping Policy
          </a>
          <a
            href="#terms-of-service"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#contact-us"
            className="text-[8px] sm:text-base md:text-lg lg:text-xl text-white pt-5 font-thin ml-2 hover:underline hover:text-[#2ee91080] transition duration-300"
          >
            Contact Us
          </a>
        </div>
        <div className="absolute bottom-0 w-full">
          {/* Divider Line */}
          <hr className="border-t border-gray-500 w-[90%] mx-auto my-4" />

          {/* Copyright Section */}
          <div className="text-center text-gray-400 text- sm:text-base md:text-lg lg:text-xl pb-3">
            © 2025, panchratan Copyright ©PANCHRATAN AYURVEDA PRIVATE LIMITED.
            All rights reserved.
          </div>
        </div>
      </div>
      {/* <div className='text-white flex justify-center h-[70vh] '> 
        <div className=' font-extrabold flex flex-col  justify-center items-center '>
        <h1 className='text-9xl text-amber-600 jersey-10-regular'>SHIPSHOP</h1>
        <h3 className='text-5xl font-light mb-3'>Your One-Stop Online Shopping Destination </h3>
        <p className=' w-[30vw] text-center font-light '>Discover a world of convenience at ShipShop, where your favorite products are just a click away. From fashion to electronics,<br></br> home essentials to unique finds,<br></br>shop ShipShop, <br></br> Shop smart !</p>

        <div className='flex flex-row '>
        <Link to="/shop"><button className='btn m-3 hover:bg-amber-600 hover:text-black text-white bg-slate-600 shadow-md'>Shop Now</button></Link>
        <Link to="http://querysolution.vercel.app/"target="_blank" ><button className='btn m-3 hover:bg-amber-600 hover:text-black text-white bg-slate-600 shadow-md'>Connect to Customer Care</button></Link>
        </div></div>
    </div> */}
    </>
  );
}

export default Home;
