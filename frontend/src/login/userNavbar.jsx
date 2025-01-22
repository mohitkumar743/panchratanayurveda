import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiShoppingCart } from "react-icons/ci";
import '../Components/style/cart.css';

function Navbar({ size, cart, setCart,Userdata}) {
  const navigate = useNavigate();
  const [shopcartPopup, setShopcartPopup] = useState(false); // State to control popup visibility
  const [price, setPrice] = useState(0);
  const [isLogin, setisLogin] = useState(false);
  // const[preorder,setpreorder]=useState([])

  const token = localStorage.getItem("Authtoken");
  useEffect(()=>{
    // const token = localStorage.getItem("Authtoken");

    if (!token) {
      setisLogin(false)
    } else {
      setisLogin(true)
}})


//navigate to my orders
const handleNavigateToMyOrders = () => {
  // console.log(Userdata);
  navigate('/myorders',{ state: { Userdata } });
};

  // Toggle the popup visibility
  const toggleCartPopup = () => {
  //  console.log(Userdata)
    setShopcartPopup(!shopcartPopup);
  };
  // for increment and decrement
  const handleChange = (product, delta) => {
    // console.log(product,delta)
    let ind = -1;
		cart.forEach((data, index)=>{
			if (data._id === product._id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].cartValue += delta;
		
		if (tempArr[ind].cartValue === 0)
			tempArr[ind].cartValue = 1;
		setCart([...tempArr])
	}
  

  const handlePrice = () => {
    let ans = 0;
    
    if (Array.isArray(cart)) {
      cart.map((item) => {
        ans += item.price * item.cartValue;
      });
    }
  
    setPrice(ans);
  }

  useEffect(()=>{
    handlePrice();
  })

 
  // Handle product removal
  const handleRemove = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
  };
//logout handle
  const handleLogout = () => {
    localStorage.removeItem("Authtoken");

    Swal.fire({
      position: "center",
      icon: "success",
      text: "You have been logged out successfully.",
      showConfirmButton: true,
      timer: 1500,
    }).then(() => {
      setisLogin(true)
      navigate("/");
    });
  };

  const handleCheckout = () => {
    const order = {
      items: cart,
      total: price,
      orderDate: new Date().toLocaleString(),
      userDetail : Userdata,
    };

    console.log("Order Details:", order);
    
    // Here you would typically send the order object to your backend server
    // e.g., axios.post("http://localhost:5000/orders", order);

    // alert("Checkout successful! Check the console for order details.");
    
    // Optionally, clear the cart after checkout
    setCart([]);
    setShopcartPopup(false);
    navigate('/address', { state: { order } });
  };



  return (
    <>
      <div className="text-center text-black h-[10vh] flex flex-row items-center justify-around">
        <div className="font-extrabold">
          <Link to="/usershop">PANCHRATAN AYURVEDA</Link>
        </div>
        <div className="flex items-center relative">
          {isLogin? <><button 
               onClick={handleNavigateToMyOrders}
              className="btn text-black btn-outline m-3 sm:w-[100px] w-[70px]"
            >
              my orders
            </button>
          <button
              onClick={handleLogout}
              className="btn text-black btn-outline m-3 sm:w-[100px] w-[70px]"
            >
              Logout
            </button>
             {/* <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="/user.png" alt="User Avatar" />
              </div>
              </div>*/}</> 
           :
        <Link to={{ pathname: '/Login', state: {setisLogin} }} > <button className="btn text-blackbtn-outline m-3 w-[100px]">
            Login
          </button></Link>}
          <div className="cursor-pointer" onClick={toggleCartPopup}>
            <CiShoppingCart className="text-5xl" />
            <span className="text-blackz-10 bg-red-600 rounded-full w-7 text-xl absolute top-0 right-0">
              {size}
            </span>
          </div>
        </div>
      </div>

      {shopcartPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[70vw] lg:w-[50vw] max-h-[90vh] overflow-y-auto text-black">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CiShoppingCart className="text-3xl md:text-5xl" />
                <h2 className="text-lg md:text-xl font-bold">Shopping Cart</h2>
              </div>
              <button
                onClick={toggleCartPopup}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
      
            {/* Cart Items */}
            <article>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                cart.map((product) => (
                  <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100 p-4 mb-3 rounded shadow"
                    key={product._id}
                  >
                    {/* Product Image */}
                    <div className="flex items-center gap-3 w-full md:w-2/3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-black">{product.name}</p>
                        <p className="text-gray-700">Rs. {product.price}</p>
                      </div>
                    </div>
      
                    {/* Quantity Controls */}
                    <div className="flex items-center m-3">
                          <button
                            className="px-2 py-1 border border-gray-300 rounded"
                            onClick={() => handleChange(product, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{product.cartValue}</span>
                          <button
                            className="px-2 py-1 border border-gray-300 rounded"
                            onClick={() => handleChange(product, +1)}
                          >
                            +
                          </button>
      
                          {/* Remove Button */}
                        <button
                          className="px-3 py-1 mx-5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                          onClick={() => handleRemove(product._id)}
                        >
                          Remove
                        </button>
                        </div>
      
                        
                  </div>
                ))
              )}
              {/* Total Price */}
              {cart.length > 0 && (
                <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-lg font-bold">Rs. {price}</span>
                </div>
              )}
            </article>
      
            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="flex justify-end mt-5">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 transition"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
