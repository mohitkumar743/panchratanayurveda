import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./userNavbar";
// import Shop from '../screen/shop'
import ShopproductCard from "../Components/shopproduct";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "./navbar";

import Advertisingbar from "../Components/advertisingbar";
import Slidebar from "../Components/slidebar";
import Product from "../Components/products";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";

function UserPortal() {
  // Environment variable (using Vite-specific syntax)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    document.title = "Portal || SHIPSHIP";
  });

  const navigate = useNavigate();
  const [Userdata, setUserdata] = useState("");
  const [Queries, setQueries] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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
    const isPresent = cart.some((cartItem) => cartItem._id === product._id);

    if (isPresent) {
      // console.log("Product is already in the cart");
      alert("Product is already in the cart");
      return;
    }

    // If the product is not in the cart, add it
    setCart([...cart, product]);
    console.log("Product added to cart");
  };

  useEffect(() => {
    const token = localStorage.getItem("Authtoken");

    if (!token) {
      Swal.fire({
        title: "Sorry",
        text: "You are not authorized to access this page. Please log in to your account.",
        icon: "error",
      }).then(() => {
        navigate("/");
      });
    } else {
      const fetchUserInfo = async () => {
        try {
          const res = await axios.get(`${backendUrl}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserdata(res.data);
          // console.log(Userdata);
        } catch (err) {
          console.error("Failed to fetch user info", err);
        }
      };

      fetchUserInfo();
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Home || SHIPSHIP";
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

  return (
    <>
      <Advertisingbar />
      <Navbar
        Userdata={Userdata}
        size={cart.length}
        cart={cart}
        setCart={setCart}
        setProducts={setProducts}
      />
      <Slidebar />
      <div className="h-[85vh] ">
        <h1 className="font-bold text-3xl mt-4 ml-2">Products In Demand</h1>
        {/* <Product /> */}
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
      </div>

      {/* imunity booster */}
      <div className="md:h-[55vh] h-[130vh] flex justify-center items-center flex-col">
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

      <div className="md:h-[55vh] h-[130vh] flex justify-center items-center flex-col">
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
      <div className="md:h-[55vh] h-[130vh] flex justify-center items-center flex-col">
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

      <div className="h-[45vh] bg-red-400 flex justify-center items-center flex-col">
        <h1 className="font-bold text-3xl mt-4 ml-2 text-center">
          SUBSCRIBE TO OUR EMAILS
        </h1>
        <h1 className=" text-xl mt-4 ml-2 text-center">
          Be the first to know about new collections and exclusive offers.
        </h1>
        <div className="h-[9vh] w-[80vw] sm:w-[35vw] mt-5  text-black flex items-center px-2 border-[3px] justify-between border-black">
          <p>Email</p>
          <FiArrowRight className="ml-2 text-black" /> {/* Right arrow */}{" "}
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
    </>
  );
}

export default UserPortal;
